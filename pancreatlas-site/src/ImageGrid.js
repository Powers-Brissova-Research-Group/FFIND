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
      images: [],
      filtered: [],
      start: 0,
      end: 12
    }

    this.nextPage = this.nextPage.bind(this)
    this.prevPage = this.prevPage.bind(this)
    this.choosePage = this.choosePage.bind(this)
    this.filter = this.filter.bind(this)
  }

  componentDidMount() {
    fetch('http://127.0.0.1:8000/api/datasets/' + this.props.match.params.did + '/get-images/')
      .then(res => res.json())
      .then(
        (result) => {
          let imgs = result['imgs']
          let tag_set = new Set()
          for (let img of imgs) {
            for (let tag of img.tags) {
              tag_set.add(tag)
            }
          }
          let tag_list = [...tag_set]
          tag_list.sort()
          this.setState({
            loaded: true,
            images: imgs,
            filtered: imgs,
            tags: tag_list,
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
    if (tagList.length === 0){
      this.setState({
        filtered: this.state.images
      })
    } else {
      let matches = []
      for (let i of this.state.images){
        let found = i.tags.some(tag => tagList.indexOf(tag) >= 0)
        if (found){
          matches.push(i)
        }
      }
      this.setState({
        filtered: matches
      })
    }
  }

  render() {
    const { loaded, filtered, page } = this.state
    if (!loaded) {
      return (
        <div className="loading">
          <strong>Loading {this.props.dataset_name}...</strong>
          <Progress animated color="success" value="100" />
        </div>
      )
    } else {

      let pages = []
      for (let i = 0; i < Math.ceil(filtered.length / 12); i++) {
        if (i === page) {
          pages.push(<PaginationItem active><PaginationLink onClick={(e) => this.choosePage(i)}>{i}</PaginationLink></PaginationItem>)

        } else {
          pages.push(<PaginationItem><PaginationLink onClick={(e) => this.choosePage(i)}>{i}</PaginationLink></PaginationItem>)
        }
      }

      let img_grid = []
      let start = 12 * page
      let end = start + 12
      let slice = filtered.slice(start, end);
      while (slice.length) {
        img_grid.push(slice.splice(0, 3));
      }

      return (
        <div className="image-grid">
          <h1>{this.props.dataset_name}</h1>
          <Container>
            <Row>
              <Col md="2">
                <FilterList filters={this.state.tags} callback={this.filter} />
              </Col>
              <Col md="10">
                {img_grid.map(item => (
                  <Row className="image-row">
                    {item.map(image =>
                      <Col md="4">
                        <ImageCard img_url={'http://127.0.0.1:8000/' + image.thumbpath} img_name={image.iname} omero_id={image.iid} img_tags={image.tags} path_path={image.pathpath} />
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