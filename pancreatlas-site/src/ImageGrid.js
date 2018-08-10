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

export default class ImageGrid extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
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

    this.image_tags = {}
  }

  componentDidMount() {
    fetch('http://127.0.0.1:8000/api/datasets/' + this.props.match.params.did + '/get-images')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            loaded: true,
            ids: result,
            matches: Object.keys(result),
            page: 0
          });
        });
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
    console.log('filter pressed')
    console.log(tagList)
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
        matches: this.state.ids
      })
    } else {
      let tmp = JSON.parse(JSON.stringify(Object.keys(this.state.ids)))
      for (let id of Object.keys(this.state.ids)){
        let match = true
        for (let keyset of Object.keys(tagList)){
          let intersection = tagList[keyset].filter(tag => -1 !== this.state.ids[id].indexOf(tag))
          if(intersection.length <= 0){
            match = false
            break
          }
        }
        if(!match){
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

    console.log(this.image_tags)
    // let new_matches = this.state.matches
    // // console.log(this.state.matches.indexOf(match))
    // new_matches.splice(new_matches.indexOf(match), 1)
    // this.setState({
    //   matches: new_matches
    // })
    // console.log('hit: ' + filtered.length)
  }

  render() {
    if (!this.state.loaded) {
      return (
        <div className="loading">
          <strong>Loading {this.props.dataset_name}...</strong>
          <Progress animated color="success" value="100" />
        </div>
      )
    } else {
      let pages = []
      // console.log('render')
      // console.log(this.state.filters)
      // console.log('Number of matches: ' + this.state.matches.length)
      for (let i = 0; i < Math.ceil(this.state.matches.length / 12); i++) {
        if (i === this.state.page) {
          pages.push(<PaginationItem key={i} active><PaginationLink onClick={(e) => this.choosePage(i)}>{i}</PaginationLink></PaginationItem>)

        } else {
          pages.push(<PaginationItem key={i}><PaginationLink onClick={(e) => this.choosePage(i)}>{i}</PaginationLink></PaginationItem>)
        }
      }

      // console.log(this.state.filters)

      let img_grid = []
      let start = 12 * this.state.page
      let end = start + 12
      let slice = this.state.matches.slice(start, end);
      while (slice.length) {
        img_grid.push(slice.splice(0, 3));
      }

      console.log(img_grid)

      return (
        <div className="image-grid">
          <h1>{this.props.dataset_name}</h1>
          <Container>
            <Row>
              <Col md="2">
                <FilterList filters={this.state.tags} callback={this.filter} />
              </Col>
              <Col md="10">
                {img_grid.map((item, idx) => (
                  <Row key={idx} className="image-row">
                    {item.map((image, idx) =>
                      <Col key={idx} md="4">
                        <ImageCard key={image} iid={image} />
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
    }
  }
}