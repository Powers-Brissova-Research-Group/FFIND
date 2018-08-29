import React from 'react';
import {
  Container,
  Row,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress
} from 'reactstrap';

import ImageCard from './ImageCard'
import FilterList from './FilterList'
import Error from './Error'

export default class ImageGrid extends React.Component {

  constructor(props) {
    super(props)
    console.log(props)
    this.state = {
      loaded: false,
      tags: null,
      ids: [],
      matches: [],
      filters: {},
      start: 0,
      end: 12
    }

    this.nextPage = this.nextPage.bind(this)
    this.prevPage = this.prevPage.bind(this)
    this.choosePage = this.choosePage.bind(this)
    this.filter = this.filter.bind(this)
    this.callback = this.callback.bind(this)
    this.updateTags = this.updateTags.bind(this)

    this.image_tags = {}
    this.tag_dict = {}
    this.tag_idx = {}
    this.raw_tags = {}
  }

  componentDidMount() {
    fetch('http://pancreapi/api/tagsets/')
      .then(res => res.json())
      .then(
        (tresult) => {
          this.raw_tags = tresult
          for (let o of Object.keys(tresult)) {
            if ('set_name' in tresult[o]) {
              this.tag_idx[tresult[o].set_name] = o
              this.tag_dict[tresult[o].set_name] = []
              for (let t of Object.keys(tresult[o].tags)) {
                this.tag_dict[tresult[o].set_name].push(t)
              }
            }
          }
          fetch('http://pancreapi/api/datasets/' + this.props.did + '/get-images')
            .then(res => res.json())
            .then(
              (result) => {
                let app_tags = this.updateTags()
                this.setState({
                  loaded: true,
                  ids: result,
                  page: 0,
                  tags: app_tags
                });
                this.filter(this.props.filters)
              })
            .catch(err => {
              console.log(err)
              this.setState({
                loaded: false,
                error: err
              })
            });
        }
      )
  }

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(prevState) !== JSON.stringify(this.state)) {
      let app_tags = this.updateTags()
      this.setState({
        tags: app_tags
      });
    }
  }

  updateTags() {
    let app_tags = JSON.parse(JSON.stringify(this.raw_tags));
    for (let key of this.state.matches) {
      for (let tag of Object.keys(this.tag_dict)) {
        let intersection = this.state.ids[key].filter(val => -1 !== this.tag_dict[tag].indexOf(val))
        if (intersection.length > 0) {
          let tval = intersection[0]
          app_tags[this.tag_idx[tag]].tags[tval]++
        }
      }
      // console.log(result[key])
    }
    // console.log(app_tags)
    return app_tags

  }

  choosePage(new_page) {
    console.log(new_page)
    this.setState({
      page: new_page
    })
  }

  nextPage() {
    if (this.state.page >= Math.ceil(this.state.images.length / 12)) { return false; }
    let new_page = this.state.page + 1
    this.setState({
      page: new_page
    })
  }

  prevPage() {
    if (this.state.page <= 0) { return false; }
    let new_page = this.state.page - 1
    this.setState({
      page: new_page
    })
  }

  filter(tagList) {
    let empty = true
    for (let key of Object.keys(tagList)) {
      if (tagList[key].length > 0) {
        empty = false
        break
      }
    }

    if (empty) {
      console.log('empty')
      this.setState({
        filters: {},
        matches: Object.keys(this.state.ids)
      })
    } else {
      let tmp = JSON.parse(JSON.stringify(Object.keys(this.state.ids)))
      for (let id of Object.keys(this.state.ids)) {
        let match = true
        for (let keyset of Object.keys(tagList)) {
          let intersection = tagList[keyset].filter(tag => -1 !== this.state.ids[id].indexOf(tag))
          if (intersection.length <= 0) {
            match = false
            break
          }
        }
        if (!match) {
          tmp.splice(tmp.indexOf(id), 1)
        }
      }

      this.setState({
        filters: tagList,
        matches: tmp
      })
    }
  }

  callback(iid, tags) {
    this.image_tags[iid] = tags
  }

  render() {
    if (this.state.loaded) {
      let pages = []
      for (let i = 0; i < Math.ceil(this.state.matches.length / 16); i++) {
        if (i === this.state.page) {
          pages.push(<PaginationItem key={i} active><PaginationLink onClick={(e) => this.choosePage(i)}>{i}</PaginationLink></PaginationItem>)

        } else {
          pages.push(<PaginationItem key={i}><PaginationLink onClick={(e) => this.choosePage(i)}>{i}</PaginationLink></PaginationItem>)
        }
      }

      let img_grid = []
      let start = 16 * this.state.page
      let end = start + 16
      let slice = this.state.matches.slice(start, end);
      while (slice.length) {
        img_grid.push(slice.splice(0, 4));
      }

      // console.log(img_grid)

      return (
        <div className="image-grid">
          <h1>{this.props.dataset_name}</h1>
          <Container>
            <Row>
              <Col md="2">
                <FilterList tags={this.state.tags} filters={this.state.tags} callback={this.filter} />
              </Col>
              <Col md="10">
                {img_grid.map((item, idx) => (
                  <Row key={idx} className="image-row">
                    {item.map((image, idx) =>
                      <Col key={idx} md="3">
                        <ImageCard key={image} iid={image} tpath={'./assets/thumbs/' + image + '.jpg'} />
                      </Col>
                    )}
                  </Row>
                ))}
                <Row>
                  <Col md="12">
                    <Pagination>
                      <PaginationItem>
                        <PaginationLink previous href="#" onClick={this.prevPage} />
                      </PaginationItem>
                      {pages}
                      <PaginationItem>
                        <PaginationLink next href="#" onClick={this.nextPage} />
                      </PaginationItem>
                    </Pagination>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
      );

    } else if (this.state.error !== undefined) {
      return <Error error_desc={this.state.error.message} />
    } else {
      return (
        <div className="loading">
          <strong>Loading {this.props.dataset_name}...</strong>
          <Progress animated color="success" value="100" />
        </div>
      )
    }
  }
}