import React from 'react';
import {
  Container,
  Row,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Alert,
  Badge,
  Button,
  ButtonGroup
} from 'reactstrap';

import MetaTags from 'react-meta-tags'

import ImageCard from './ImageCard'
import FilterList from './FilterList'
import Error from './Error'
import ImageModal from './ImageModal'

export default class ImageGrid extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      tags: null,
      ids: [],
      matches: [],
      filters: {},
      prevFilters: {},
      start: 0,
      end: 12,
      modalOpen: false,
      datasetName: '',
      imgs_per_row: 3,
      imgs_col_split: 4,
      rows_per_page: 5,
      density: 'normal'
    }

    this.nextPage = this.nextPage.bind(this)
    this.prevPage = this.prevPage.bind(this)
    this.choosePage = this.choosePage.bind(this)
    this.filter = this.filter.bind(this)
    this.callback = this.callback.bind(this)
    this.updateTags = this.updateTags.bind(this)
    this.toggle = this.toggle.bind(this)
    this.setModal = this.setModal.bind(this)
    this.markerFilter = this.markerFilter.bind(this)
    this.setDensity = this.setDensity.bind(this)

    this.image_tags = {}
    this.tag_dict = {}
    this.tag_idx = {}
    this.raw_tags = {}
    this.initialized = false
    this.defs = require('../assets/pancreatlas/definitions.json')
  }

  componentDidMount() {
    fetch(`${process.env.REACT_APP_API_URL}/datasets/${this.props.did}`)
      .then(res => res.json())
      .then((result => {
        this.setState({
          datasetName: result.dsname
        })
      }))
    fetch(`${process.env.REACT_APP_API_URL}/tagsets/`)
      .then(res => res.json())
      .then(
        (tresult) => {
          this.raw_tags = tresult
          for (let o of Object.keys(tresult)) {
            if ('set_name' in tresult[o]) {
              this.tag_idx[tresult[o].set_name] = o
              this.tag_dict[tresult[o].set_name] = []
              let extras = ['depth 1', 'depth 2', 'depth 3']
              for (let t of Object.keys(tresult[o].tags)) {
                if (extras.indexOf(t) === -1) {
                  this.tag_dict[tresult[o].set_name].push(t)
                } else {
                  delete this.raw_tags[o].tags[t]
                }
              }
            }
          }
          fetch(`${process.env.REACT_APP_API_URL}/datasets/${this.props.did}/get-images`)
            .then(res => res.json())
            .then(
              (result) => {
                this.setState({
                  loaded: true,
                  ids: result,
                  matches: Object.keys(result),
                  page: 0
                });
                this.updateTags(true)
                // this.filter(this.props.filters)
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
    if (JSON.stringify(prevState.filters) !== JSON.stringify(this.state.filters)) {
      this.updateTags(false)
    }
  }

  updateTags(shouldDelete) {
    let app_tags = JSON.parse(JSON.stringify(this.raw_tags));
    for (let key of this.state.matches) {
      for (let tag of Object.keys(this.tag_dict)) {
        let intersection = this.state.ids[key].filter(val => -1 !== this.tag_dict[tag].indexOf(val))
        if (intersection.length > 0) {
          for (let tval of intersection) {
            app_tags[this.tag_idx[tag]].tags[tval]++
          }
        }
      }
    }
    if (shouldDelete) {
      for (let tagset of Object.keys(app_tags)) {
        for (let tag of Object.keys(app_tags[tagset].tags)) {
          if (app_tags[tagset].tags[tag] === 0) {
            delete app_tags[tagset].tags[tag]
            delete this.raw_tags[tagset].tags[tag]
          }
        }
      }
    }
    this.setState({
      tags: app_tags
    })
  }

  choosePage(new_page) {
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

  filter(tagList, prevFilters) {
    console.log(prevFilters)
    let empty = true
    for (let key of Object.keys(tagList)) {
      if (tagList[key].length > 0) {
        empty = false
        break
      }
    }

    if (empty) {
      this.setState({
        filters: { AGE: [] },
        prevFilters: { AGE: [] },
        matches: Object.keys(this.state.ids)
      })
    } else {
      let tmp = JSON.parse(JSON.stringify(Object.keys(this.state.ids)))
      let allIds = JSON.parse(JSON.stringify(this.state.ids))
      for (let id of Object.keys(allIds)) {
        let match = true
        for (let keyset of Object.keys(tagList)) {
          if (keyset !== 'AGE' || (keyset === 'AGE' && tagList[keyset].length > 0)) {
            let intersection = tagList[keyset].filter(tag => -1 !== allIds[id].indexOf(tag))
            if (intersection.length <= 0) {
              match = false
              break
            }
          }
        }
        if (!match) {
          tmp.splice(tmp.indexOf(id), 1)
        }
      }
      this.setState({
        prevFilters: prevFilters,
        filters: tagList,
        matches: tmp
      })
    }
  }

  markerFilter(marker) {
    let currentFilters = this.state.filters
    if (Object.keys(currentFilters).indexOf('MARKER') === -1) {
      currentFilters['MARKER'] = []
    }
    if (currentFilters['MARKER'].indexOf(marker) === -1) {
      currentFilters['MARKER'].push(marker)
    }
    this.filter(currentFilters, this.state.prevFilters)
  }

  callback(iid, tags) {
    this.image_tags[iid] = tags
  }

  toggle() {
    this.setState({
      modalOpen: !this.state.modalOpen
    })
  }

  setModal(imgInfo) {
    fetch(`${process.env.REACT_APP_API_URL}/images/${imgInfo}`)
      .then(res => res.json())
      .then(
        (result) => {
          if (Object.keys(result.kvals).length > 0) {
            let path = result.kvals['File path'].val
            let re = /([0-9]+-[0-9]+-[0-9]+)?(\/[^/]+\.[a-z]+)$/
            let age_re = /^(G?)(\d+)(.\d)?(d|w|mo|y)(\+\dd)?$/

            let markerColors = result.channel_info
            let markerColor_re = /^.+\((.+)\)$/
            Object.keys(markerColors).forEach(function (key) {
              var newKey = markerColor_re.test(key) ? markerColor_re.exec(key)[1] : key
              if (newKey !== key) {
                markerColors[newKey] = markerColors[key]
                delete markerColors[key]
              }
            })


            let matches = re.exec(path)
            result.kvals['File path'].val = matches[0]
            result.kvals['Donor info - Age'].val = result.tags.filter(val => age_re.test(val))[0]
            this.setState({
              modalData: {
                img_id: imgInfo,
                img_data: result.kvals,
                path_path: result.pathpath,
                markerColors: markerColors
              }
            })
          } else {
            this.setState({
              modalData: {
                img_id: imgInfo,
                img_data: { "Warning": "No information for this image" },
                path_path: result.pathpath
              }
            })
          }
          this.toggle()
        })
      .catch(err => {
        this.setState({
          loaded: false,
          error: err
        })
      });
  }

  setDensity(density) {
    switch (density.toLowerCase()) {
      case 'sparse':
        this.setState({
          imgs_per_row: 2,
          imgs_col_split: 6,
          rows_per_page: 6,
          density: 'sparse'
        })
        break
      case 'dense':
        this.setState({
          imgs_per_row: 4,
          imgs_col_split: 3,
          rows_per_page: 4,
          density: 'dense'
        })
        break
      default:
      case 'normal':
        this.setState({
          imgs_per_row: 3,
          imgs_col_split: 4,
          rows_per_page: 5,
          density: 'normal'
        })
        break
    }
  }

  render() {
    if (this.state.loaded) {
      if (this.state.matches.length === 0) {
        return (
          <div className='no-results'>
            <MetaTags>
              <title>Browse &amp; Filter Dataset -- Pancreatlas / HANDEL-P</title>
              <meta name="description" content="View an entire dataset in the pancreatlas" />
            </MetaTags>
            <Container>
              <Alert color="info">
                <Row>
                  <Col m="6">
                    You are currently viewing <Badge color="info">{this.state.matches.length}</Badge> out of a possible <Badge color="secondary">{Object.keys(this.state.ids).length}</Badge> images
                        </Col>
                  <Col m="6">
                    <span className="float-right">Dataset: <strong>{this.state.datasetName}</strong> (ID: {this.props.did})</span>
                  </Col>
                </Row>
              </Alert>
            </Container>

            <Container>
              <Row className="pancreatlas-row">
                <Col md="3">
                  <FilterList ageGroup={this.props.groupName} tags={this.state.tags} filters={this.state.filters} callback={this.filter} />
                </Col>
                <Col md="9">
                  <Alert color='danger'>
                    <Row>
                      <Col md='12'>
                        The combination of filters you have used returns 0 images. <span className='undo' onClick={() => this.filter(this.state.prevFilters, this.state.filters)}>Undo your most recent change?</span>
                      </Col>
                    </Row>
                  </Alert>
                </Col>
              </Row>
            </Container>
          </div>
        )
      }
      // images_per_row * images_col_split must equal 12
      // var images_per_row = 3
      // var images_col_split = 4
      // var rows_per_page = 5 // 15 or 16
      var images_per_page = this.state.imgs_per_row * this.state.rows_per_page

      let pages = []
      for (let i = 0; i < Math.ceil(this.state.matches.length / images_per_page); i++) {
        if (i === this.state.page) {
          pages.push(<PaginationItem key={i} active><PaginationLink onClick={(e) => this.choosePage(i)}>{i + 1}</PaginationLink></PaginationItem>)

        } else {
          pages.push(<PaginationItem key={i}><PaginationLink onClick={(e) => this.choosePage(i)}>{i + 1}</PaginationLink></PaginationItem>)
        }
      }

      let img_grid = []
      let start = images_per_page * this.state.page
      let end = start + images_per_page
      let slice = this.state.matches.slice(start, end);
      while (slice.length) {
        img_grid.push(slice.splice(0, this.state.imgs_per_row));
      }


      // C:\Users\messmej\Documents\Projects\pancreatlas\react\src\assets\pancreatlas\thumbs\55.jpg

      return (
        <div className="image-grid">
          <MetaTags>
            <title>Browse &amp; Filter Dataset -- Pancreatlas / HANDEL-P</title>
            <meta name="description" content="View an entire dataset in the pancreatlas" />
          </MetaTags>


          <Container>
            <Alert color="info">
              <Row>
                <Col m="6">
                  You are currently viewing <Badge color="info">{this.state.matches.length}</Badge> out of a possible <Badge color="secondary">{Object.keys(this.state.ids).length}</Badge> images
                        </Col>
                <Col m="6">
                  <span className="float-right">Dataset: <strong>{this.state.datasetName}</strong> (ID: {this.props.did})</span>
                </Col>
              </Row>
              <Row>
                <Col md='12'>
                  <div className='density-select float-right'>
                    <strong>Grid Density: </strong>
                    <ButtonGroup>
                      <Button color='info' onClick={() => this.setDensity('sparse')} active={this.state.density === 'sparse'}>Sparse</Button>
                      <Button color='info' onClick={() => this.setDensity('normal')} active={this.state.density === 'normal'}>Normal</Button>
                      <Button color='info' onClick={() => this.setDensity('dense')} active={this.state.density === 'dense'}>Dense</Button>
                    </ButtonGroup>
                  </div>
                </Col>
              </Row>
            </Alert>
          </Container>


          <Container>
            <Row className="pancreatlas-row">
              <Col md="3">
                <FilterList ageGroup={this.props.groupName} tags={this.state.tags} filters={this.state.filters} callback={this.filter} />
              </Col>
              <Col md="9">
                {img_grid.map((item, idx) => (
                  <Row key={idx} className="image-row pancreatlas-row">
                    {item.map((image, idx) =>
                      <Col key={idx} md={this.state.imgs_col_split}>
                        <ImageCard isFavorite={this.props.favorites.indexOf(image) === -1} favoriteCallback={this.props.favoriteCallback} key={image} iid={image} callback={this.setModal} filterCallback={this.markerFilter} />
                      </Col>
                    )}
                  </Row>
                ))}
                <Row className="pancreatlas-row">
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
            <ImageModal toggle={this.toggle} isOpen={this.state.modalOpen} modalData={this.state.modalData} />
          </Container>
        </div>
      );

    } else if (this.state.error !== undefined) {
      return <Error error_desc={this.state.error.message} />
    } else {
      return (

        <Container className='loading v-padded'>
          <Row>
            <Col md="12">
              <h1 className='section-heading'>Loading dataset {this.props.did} ...</h1>
              <Progress animated color="success" value="100" />
            </Col>
          </Row>
        </Container>

      )
    }
  }
}