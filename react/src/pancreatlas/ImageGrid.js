import React from 'react'
import {
  Container,
  Row,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Alert,
  Badge,
  Button,
  ButtonGroup
} from 'reactstrap'

import MetaTags from 'react-meta-tags'

import ImageCard from './ImageCard'
import FilterList from './FilterList'
import Error from './Error'
import ImageModal from './ImageModal'
import LoadingBar from './LoadingBar'

export default class ImageGrid extends React.Component {
  constructor (props) {
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
      imgsPerRow: 3,
      imgsColSplit: 4,
      rowsPerPage: 5,
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

  componentDidMount () {
    window.fetch(`${process.env.REACT_APP_API_URL}/datasets/${this.props.did}`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Authorization': process.env.REACT_APP_API_AUTH
      }
    })
      .then(res => res.json())
      .then(result => {
        this.setState({
          datasetName: result.dsname
        })
      })
    window.fetch(`${process.env.REACT_APP_API_URL}/tagsets/`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Authorization': process.env.REACT_APP_API_AUTH
      }
    })
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
          window.fetch(`${process.env.REACT_APP_API_URL}/datasets/${this.props.did}/get-images`, {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Authorization': process.env.REACT_APP_API_AUTH
            }
          })
            .then(res => res.json())
            .then(
              (result) => {
                this.setState({
                  loaded: true,
                  ids: result,
                  matches: Object.keys(result),
                  page: 0
                })
                this.updateTags(true)
                // this.filter(this.props.filters)
              })
            .catch(err => {
              console.log(err)
              this.setState({
                loaded: false,
                error: err
              })
            })
        }
      )
  }

  componentDidUpdate (prevProps, prevState) {
    if (JSON.stringify(prevState.filters) !== JSON.stringify(this.state.filters)) {
      this.updateTags(false)
    }
  }

  updateTags (shouldDelete) {
    let appTags = JSON.parse(JSON.stringify(this.raw_tags))
    for (let key of this.state.matches) {
      for (let tag of Object.keys(this.tag_dict)) {
        let intersection = this.state.ids[key].filter(val => this.tag_dict[tag].indexOf(val) !== -1)
        if (intersection.length > 0) {
          for (let tval of intersection) {
            appTags[this.tag_idx[tag]].tags[tval]++
          }
        }
      }
    }
    if (shouldDelete) {
      for (let tagset of Object.keys(appTags)) {
        for (let tag of Object.keys(appTags[tagset].tags)) {
          if (appTags[tagset].tags[tag] === 0) {
            delete appTags[tagset].tags[tag]
            delete this.raw_tags[tagset].tags[tag]
          }
        }
      }
    }
    this.setState({
      tags: appTags
    })
  }

  choosePage (newPage) {
    this.setState({
      page: newPage
    })
  }

  nextPage () {
    if (this.state.page >= Math.ceil(this.state.images.length / 12)) { return false }
    let newPage = this.state.page + 1
    this.setState({
      page: newPage
    })
  }

  prevPage () {
    if (this.state.page <= 0) { return false }
    let newPage = this.state.page - 1
    this.setState({
      page: newPage
    })
  }

  filter (tagList, prevFilters) {
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
            let intersection = tagList[keyset].filter(tag => allIds[id].indexOf(tag) !== -1)
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

  markerFilter (marker) {
    let currentFilters = this.state.filters
    if (Object.keys(currentFilters).indexOf('MARKER') === -1) {
      currentFilters['MARKER'] = []
    }
    if (currentFilters['MARKER'].indexOf(marker) === -1) {
      currentFilters['MARKER'].push(marker)
    }
    this.filter(currentFilters, this.state.prevFilters)
  }

  callback (iid, tags) {
    this.image_tags[iid] = tags
  }

  toggle () {
    this.setState({
      modalOpen: !this.state.modalOpen
    })
  }

  setModal (imgInfo) {
    window.fetch(`${process.env.REACT_APP_API_URL}/images/${imgInfo}`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Authorization': process.env.REACT_APP_API_AUTH
      }
    })
      .then(res => res.json())
      .then(
        (result) => {
          if (Object.keys(result.kvals).length > 0) {
            let path = result.kvals['File path'].val
            let re = /([0-9]+-[0-9]+-[0-9]+)?(\/[^/]+\.[a-z]+)$/
            let ageRe = /^(G?)(\d+)(.\d)?(d|w|mo|y)(\+\dd)?$/

            let markerColors = result.channel_info
            let markerColorRe = /^.+\((.+)\)$/
            Object.keys(markerColors).forEach(function (key) {
              var newKey = markerColorRe.test(key) ? markerColorRe.exec(key)[1] : key
              if (newKey !== key) {
                markerColors[newKey] = markerColors[key]
                delete markerColors[key]
              }
            })

            let matches = re.exec(path)
            result.kvals['File path'].val = matches[0]
            result.kvals['Donor info - Age'].val = result.tags.filter(val => ageRe.test(val))[0]
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
                img_data: { 'Warning': 'No information for this image' },
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
      })
  }

  setDensity (density) {
    switch (density.toLowerCase()) {
      case 'sparse':
        this.setState({
          imgsPerRow: 2,
          imgsColSplit: 6,
          rowsPerPage: 6,
          density: 'sparse'
        })
        break
      case 'dense':
        this.setState({
          imgsPerRow: 4,
          imgsColSplit: 3,
          rowsPerPage: 4,
          density: 'dense'
        })
        break
      default:
      case 'normal':
        this.setState({
          imgsPerRow: 3,
          imgsColSplit: 4,
          rowsPerPage: 5,
          density: 'normal'
        })
        break
    }
  }

  render () {
    if (this.state.loaded) {
      if (this.state.matches.length === 0) {
        return (
          <div className='no-results'>
            <MetaTags>
              <title>Browse &amp; Filter Dataset -- Pancreatlas / HANDEL-P</title>
              <meta name='description' content='View an entire dataset in the pancreatlas' />
            </MetaTags>
            <Container>
              <Alert color='info'>
                <Row>
                  <Col m='6'>
                    You are currently viewing <Badge color='info'>{this.state.matches.length}</Badge> out of a possible <Badge color='secondary'>{Object.keys(this.state.ids).length}</Badge> images
                  </Col>
                  <Col m='6'>
                    <span className='float-right'>Dataset: <strong>{this.state.datasetName}</strong> (ID: {this.props.did})</span>
                  </Col>
                </Row>
              </Alert>
            </Container>

            <Container>
              <Row className='pancreatlas-row'>
                <Col md='3'>
                  <FilterList ageGroup={this.props.groupName} tags={this.state.tags} filters={this.state.filters} callback={this.filter} />
                </Col>
                <Col md='9'>
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
      // var rowsPerPage = 5 // 15 or 16
      var imagesPerPage = this.state.imgsPerRow * this.state.rowsPerPage

      let pages = []
      for (let i = 0; i < Math.ceil(this.state.matches.length / imagesPerPage); i++) {
        if (i === this.state.page) {
          pages.push(<PaginationItem key={i} active><PaginationLink onClick={(e) => this.choosePage(i)}>{i + 1}</PaginationLink></PaginationItem>)
        } else {
          pages.push(<PaginationItem key={i}><PaginationLink onClick={(e) => this.choosePage(i)}>{i + 1}</PaginationLink></PaginationItem>)
        }
      }

      let imgGrid = []
      let start = imagesPerPage * this.state.page
      let end = start + imagesPerPage
      let slice = this.state.matches.slice(start, end)
      while (slice.length) {
        imgGrid.push(slice.splice(0, this.state.imgsPerRow))
      }

      // C:\Users\messmej\Documents\Projects\pancreatlas\react\src\assets\pancreatlas\thumbs\55.jpg

      return (
        <div className='image-grid'>
          <MetaTags>
            <title>Browse &amp; Filter Dataset -- Pancreatlas / HANDEL-P</title>
            <meta name='description' content='View an entire dataset in the pancreatlas' />
          </MetaTags>

          <Container>
            <Alert color='info'>
              <Row>
                <Col m='6'>
                  You are currently viewing <Badge color='info'>{this.state.matches.length}</Badge> out of a possible <Badge color='secondary'>{Object.keys(this.state.ids).length}</Badge> images
                </Col>
                <Col m='6'>
                  <span className='float-right'>Dataset: <strong>{this.state.datasetName}</strong> (ID: {this.props.did})</span>
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
            <Row className='pancreatlas-row'>
              <Col md='3'>
                <FilterList ageGroup={this.props.groupName} tags={this.state.tags} filters={this.state.filters} callback={this.filter} />
              </Col>
              <Col md='9'>
                {imgGrid.map((item, idx) => (
                  <Row key={idx} className='image-row pancreatlas-row'>
                    {item.map((image, idx) =>
                      <Col key={idx} md={this.state.imgsColSplit}>
                        <ImageCard isFavorite={this.props.favorites.indexOf(image) === -1} favoriteCallback={this.props.favoriteCallback} key={image} iid={image} callback={this.setModal} filterCallback={this.markerFilter} />
                      </Col>
                    )}
                  </Row>
                ))}
                <Row className='pancreatlas-row'>
                  <Col md='12'>
                    <Pagination>
                      <PaginationItem>
                        <PaginationLink previous href='#' onClick={this.prevPage} />
                      </PaginationItem>
                      {pages}
                      <PaginationItem>
                        <PaginationLink next href='#' onClick={this.nextPage} />
                      </PaginationItem>
                    </Pagination>
                  </Col>
                </Row>
              </Col>
            </Row>
            <ImageModal toggle={this.toggle} isOpen={this.state.modalOpen} modalData={this.state.modalData} favorites={this.props.favorites} favoriteCallback={this.props.favoriteCallback} />
          </Container>
        </div>
      )
    } else if (this.state.error !== undefined) {
      return <Error error_desc={this.state.error.message} />
    } else {
      return (
        <LoadingBar loadingInfo={`dataset ${this.state.datasetName} (ID: ${this.props.did}) ...`} />
      )
    }
  }
}
