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
  ButtonGroup,
  Input,
  Form,
  FormGroup,
  Label
} from 'reactstrap'

import { Link } from 'react-router-dom'

import MetaTags from 'react-meta-tags'

import ImageCard from './ImageCard'
import ImageModal from './ImageModal'

import { FilterList } from '../filtering'

import { Error, LoadingBar } from '../utils'

import { FilterTree, compareAges, extractFilters, isArray } from '../../tools/utilities'

import axios from 'axios'
import mergeWith from 'lodash.mergewith'


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
      modalOpen: false,
      datasetName: '',
      imgsPerRow: 3,
      imgsColSplit: 4,
      rowsPerPage: 5,
      density: 'normal',
      filterTree: new FilterTree()
    }

    this.nextPage = this.nextPage.bind(this)
    this.prevPage = this.prevPage.bind(this)
    this.choosePage = this.choosePage.bind(this)
    this.filter = this.filter.bind(this)
    this.callback = this.callback.bind(this)
    this.updateTags = this.updateTags.bind(this)
    this.undo = this.undo.bind(this)
    this.clear = this.clear.bind(this)
    this.toggle = this.toggle.bind(this)
    this.setModal = this.setModal.bind(this)
    this.markerFilter = this.markerFilter.bind(this)
    this.setDensity = this.setDensity.bind(this)
    this.sortImgs = this.sortImgs.bind(this)

    this.image_tags = {}
    this.tag_dict = {}
    this.tag_idx = {}
    this.raw_tags = {}
    this.initialized = false
    this.defs = require('../../assets/txt/definitions.json')
  }

  componentDidMount() {
    var paramsString = window.location.search
    var searchParams = new URLSearchParams(paramsString)
    var activeFilters = []
    if (searchParams.has('filters')) {
      activeFilters = activeFilters.concat(JSON.parse(window.atob(searchParams.get('filters'))))
    }

    var imageJson = (this.props.did) ? require(`../../assets/txt/ffind-defaults/${this.props.did}.json`) : require(`../../assets/txt/ffind-defaults/all-images.json`)

    if (this.props.did) {
      this.setState({
        datasetName: 'Test dataset'
      })
    } else {
      this.setState({
        datasetName: 'All Images'
      })
    }

    let images = imageJson.images
    let tags = imageJson.filters

    for (let tagset of tags) {
      let tagsetName = tagset.set_name
      for (let tag of Object.keys(tagset.tags)) {
        var ageRe = /AGE|DISEASE DURATION*/i
        var defaultHiddenRe = /PROGRAM ID*/i
        var filterMethod = ageRe.test(tagsetName) ? 'slider' : 'checkbox'
        var hidden = defaultHiddenRe.test(tagsetName) ? true : false
        var sortMethod = ageRe.test(tagsetName) ? (a, b) => compareAges(a.name, b.name) : (a, b) => (a.name > b.name) ? 1 : -1
        this.state.filterTree.addNode(tag, tagsetName, sortMethod, filterMethod, hidden)
      }
    }
    let setNodes = this.state.filterTree.generateAllNodes()
    for (let key of searchParams.keys()) {
      if (setNodes.indexOf(key.toUpperCase()) >= 0) {
        try {
          let tmpObj = JSON.parse(window.atob(searchParams.get(key)))
          let filters = extractFilters(tmpObj)
          activeFilters = activeFilters.concat(filters)
        } catch (e) {
          console.error(e)
        }
      }
    }
    for (let filter of activeFilters) {
      this.state.filterTree.activateFilter(filter)
    }

    for (let img of Object.keys(images)) {
      for (let tagset of images[img]) {
        this.state.filterTree.addImg(tagset.tag, img)
      }
    }
    let activeImages = this.state.filterTree.generateActiveImages()
    this.setState({
      loaded: true,
      ids: imageJson,
      maxPages: Math.floor(Object.keys(imageJson).length / (this.state.imgsPerRow * this.state.rowsPerPage)),
      matches: activeImages,
      page: 0
    })
    if (this.props.iid > 0) {
      this.setModal(this.props.iid)
    }
    // this.updateTags(true)
    // this.filter(this.props.filters)
  }

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(prevState.filters) !== JSON.stringify(this.state.filters)) {
      this.updateTags(false)
    }
  }

  updateTags(shouldDelete) {
    let appTags = JSON.parse(JSON.stringify(this.raw_tags))
    let validFilterSets = appTags.map(appTag => appTag.set_name)
    for (let key of this.state.matches) {
      for (let t of this.state.ids[key]) {
        if (t.tagset !== undefined) {
          var tagset = t.tagset.toUpperCase()
          if (validFilterSets.includes(tagset)) {
            appTags[this.tag_idx[t.tagset.toUpperCase()]].tags[t.tag]++
          }
        }
      }
    }
    if (shouldDelete) {
      for (let idx = 0; idx < appTags.length; idx++) {
        for (let tag of Object.keys(appTags[idx].tags)) {
          if (appTags[idx].tags[tag] === 0) {
            delete appTags[idx].tags[tag]
            delete this.raw_tags[idx].tags[tag]
          }
        }
        if (Object.keys(appTags[idx].tags).length <= 0) {
          let toDelete = appTags[idx].set_name
          let listIdx = this.tag_idx[toDelete]
          for (let t of Object.keys(this.tag_idx)) {
            if (this.tag_idx[t] > listIdx) {
              let newIdx = parseInt(this.tag_idx[t]) - 1
              this.tag_idx[t] = newIdx.toString()
            }
          }
          delete this.tag_idx[toDelete]
          appTags.splice(idx, 1)
          this.raw_tags.splice(idx, 1)
          idx--
        }
      }
    }
    this.setState({
      tags: appTags
    })
  }

  undo() {
    this.state.filterTree.undo()
    this.setState({
      matches: this.state.filterTree.generateActiveImages()
    })
  }

  clear() {
    this.state.filterTree.resetTo(false)
    this.setState({
      matches: this.state.filterTree.generateActiveImages()
    })
  }

  choosePage(newPage) {
    this.setState({
      page: newPage
    })
  }

  nextPage() {
    if (this.state.page >= this.state.maxPages) { return false }
    let newPage = this.state.page + 1
    this.setState({
      page: newPage
    })
  }

  prevPage() {
    if (this.state.page <= 0) { return false }
    let newPage = this.state.page - 1
    this.setState({
      page: newPage
    })
  }

  filter(newTags, diff) {
    let urlParams = new URLSearchParams(window.location.search)
    for (let key of Object.keys(newTags)) {
      var toAdd = newTags[key]
      if (urlParams.has(key)) {
        let old = {}
        old[key] = JSON.parse(window.atob(urlParams.get(key)))
        let newObj = {}
        newObj[key] = newTags[key]
        mergeWith(old, newObj, (objValue, srcValue) => {
          if (isArray(objValue)) {
            let missingObjs = objValue.filter(val => srcValue.indexOf(val) < 0)
            for (let o of missingObjs) {
              srcValue.push(o)
            }
            return srcValue
          }
        })
        toAdd = old[key]
      }
      urlParams.set(key, window.btoa(JSON.stringify(toAdd)))
    }
    window.history.pushState({ 'pageTitle': 'Browse & Filter Dataset' }, '', `${window.location.protocol}//${window.location.host}${window.location.pathname}?${urlParams.toString()}`)

    for (let d of diff) {
      this.state.filterTree.activateFilter(d)
    }
    this.setState({
      matches: this.state.filterTree.generateActiveImages()
    })
    this.choosePage(0)
  }

  markerFilter(marker) {
    let search = this.state.filterTree.search(marker)
    if (search !== undefined && search.active !== true) {
      this.filter({ "MARKER": [marker] }, [marker])
    }
  }

  callback(iid, tags) {
    this.image_tags[iid] = tags
  }

  toggle() {
    if (this.state.modalOpen) {
      let pathParts = window.location.pathname.split('/')
      let newPath = pathParts.slice(0, pathParts.length - 1).join('/')
      window.history.pushState({ 'pageTitle': 'Browse & Filter Dataset' }, '', `${window.location.protocol}//${window.location.host}${newPath}`)
    }
    this.setState({
      modalOpen: !this.state.modalOpen
    })
  }

  setModal(imgInfo) {
    var mockImages = require('../../assets/txt/ffind-defaults/mock_images.json')

    let result = mockImages[imgInfo]
    let kvals = result.kvals
    let tagVals = result.tags.map(tag => tag.tag)
    this.setState({
      modalData: {
        imd_id: imgInfo,
        img_data: kvals
      }
    })
    let path = window.location.pathname
    if (path.charAt(path.length - 1) === '/') {
      path = path.slice(0, path.length - 1)
    }
    let pathParts = path.split('/')
    if (pathParts[pathParts.length - 1] !== imgInfo) {
      window.history.pushState({ 'pageTitle': 'Browse & Filter Dataset' }, '', `${window.location.protocol}//${window.location.host}${window.location.pathname}/${imgInfo}`)
    }
    this.toggle()
  }

  setDensity(density) {
    switch (density.toLowerCase()) {
      case 'sparse':
        this.setState({
          imgsPerRow: 2,
          imgsColSplit: 6,
          rowsPerPage: 6,
          maxPages: Math.floor((Object.keys(this.state.ids).length / (2 * 6))),
          density: 'sparse'
        })
        break
      case 'dense':
        this.setState({
          imgsPerRow: 4,
          imgsColSplit: 3,
          rowsPerPage: 4,
          maxPages: Math.floor((Object.keys(this.state.ids).length / (4 * 4))),
          density: 'dense'
        })
        break
      default:
      case 'normal':
        this.setState({
          imgsPerRow: 3,
          imgsColSplit: 4,
          rowsPerPage: 5,
          maxPages: Math.floor((Object.keys(this.state.ids).length / (3 * 5))),
          density: 'normal'
        })
        break
    }
  }

  sortImgs(event) {
    if (event.target.value === 'sel') {
      return
    }
    var sorted = []
    switch (event.target.value) {
      case 'duration-asc':
        sorted = this.state.filterTree.sortImages('DISEASE DURATION')
        break
      case 'duration-desc':
        sorted = this.state.filterTree.sortImages('DISEASE DURATION')
        break
      case 'age-desc':
        sorted = this.state.filterTree.sortImages('AGE', ((a, b) => -1 * compareAges(a.value, b.value)))
        break
      case 'age-asc':
      default:
        sorted = this.state.filterTree.sortImages('AGE', ((a, b) => compareAges(a.value, b.value)))
        break
    }

    var activeSorted = sorted.filter(img => this.state.matches.includes(img))

    this.setState({
      sortOrder: event.target.value,
      matches: activeSorted
    })
  }

  render() {
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
                    <span className='float-right'>Dataset: <strong>{this.state.datasetName}</strong></span>
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
                        The combination of filters you have used returns 0 images. <span className='undo' onClick={this.undo}>Undo your most recent change?</span>
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
                  <span className='float-right'>Dataset: <strong>{this.state.datasetName}</strong></span>
                </Col>
              </Row>
              <Row>
                <Col md='6'>
                  {this.props.did && <div className='float-left'>View more about this dataset <Link to={`/datasets/${this.props.did}/overview`}><strong><u>here</u></strong>.</Link> </div>}
                </Col>
                <Col md='6'>
                  <Row>
                    <Col xs='12'>
                      <div className='grid-options float-right'>
                        <Form inline>
                          <FormGroup>
                            <Label for='sort-select' className='pr-1'>Sort by: </Label>
                            <Input size='sm' type='select' name='sort-select' id='sort-select' value={this.state.sortOrder} onChange={this.sortImgs}>
                              <option value='sel'>Image ID</option>
                              <option value='age-asc'>Age Ascending</option>
                              <option value='age-desc'>Age Descending</option>
                            </Input>
                          </FormGroup>
                          <span className='pl-2'>
                            <span className='pr-1'>Grid Density: </span>
                            <ButtonGroup size='sm' className='pl-1'>
                              <Button color='info' onClick={() => this.setDensity('sparse')} active={this.state.density === 'sparse'}>Sparse</Button>
                              <Button color='info' onClick={() => this.setDensity('normal')} active={this.state.density === 'normal'}>Normal</Button>
                              <Button color='info' onClick={() => this.setDensity('dense')} active={this.state.density === 'dense'}>Dense</Button>
                            </ButtonGroup>
                          </span>
                        </Form>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Alert>
          </Container>

          <Container>
            <Row className='pancreatlas-row'>
              <Col md='3'>
                <FilterList ageGroup={this.props.groupName} filters={this.state.filterTree.generateJSON(this.state.filterTree.root)} callback={this.filter} clear={this.clear} />
              </Col>
              <Col md='9'>
                {imgGrid.map((item, idx) => (
                  <Row key={idx} className='image-row pancreatlas-row'>
                    {item.map((image, idx) =>
                      <Col key={idx} md={this.state.imgsColSplit}>
                        <ImageCard filterActive isFavorite={this.props.favorites.indexOf(image) === -1} favoriteCallback={this.props.favoriteCallback} key={image} iid={image} callback={this.setModal} filterCallback={this.markerFilter} />
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
