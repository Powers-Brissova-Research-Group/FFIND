import React from 'react'
import {
  Container,
  Row,
  Col,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from 'reactstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { ImageModal } from '../grid-view'
import { Error, LoadingBar } from '../utils'

import { FilterTree, compareAges, extractFilters, isArray } from '../../tools/utilities'


import MatrixModalListComponent from './MatrixModalListComponent'

import axios from 'axios'

export default class ImageMatrix extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      tagA: null,
      tagB: null,
      matrix: null,
      modal: false,
      modalOpen: false,
      selectedSet: []
    }

    this.toggle = this.toggle.bind(this)
    this.toggleDetail = this.toggleDetail.bind(this)
    this.flip = this.flip.bind(this)
    this.setModal = this.setModal.bind(this)
  }

  componentDidMount() {
    var imageJson = require(`../../assets/txt/ffind-defaults/${this.props.did}.json`)

    let tree = new FilterTree

    let images = imageJson.images
    let tags = imageJson.filters
    let sortableFields = []

    for (let tagset of tags) {
      let tagsetName = tagset.set_name
      for (let tag of Object.keys(tagset.tags)) {
        var sliderRe = /LENGTH|CREW|HYPERDRIVE/i
        var defaultHiddenRe = /NAME*/i
        var filterMethod = sliderRe.test(tagsetName) ? 'slider' : 'checkbox'
        var hidden = defaultHiddenRe.test(tagsetName) ? true : false
        var sortMethod = (sliderRe.test(tagsetName)) ? ((a, b) => (parseFloat(a.name) > parseFloat(b.name)) ? 1 : -1) : ((a, b) => (a.name > b.name) ? 1 : -1)
        tree.addNode(tag, tagsetName, sortMethod, filterMethod, hidden)
      }
    }
    let setNodes = tree.generateAllNodes()
    for (let img of Object.keys(images)) {
      for (let tagset of images[img]) {
        tree.addImg(tagset.tag, img)
      }
    }

    let m = tree.generateMatrix(this.props.tag_1, this.props.tag_2)['matrix']

    let newMatrix = {}
    let newMatrixT = {}
    let tags1 = Object.keys(m)
    let tags2 = Object.keys(m[tags1[0]])


    for (let tag1 of tags1) {
      newMatrix[tag1] = {}
      for (let tag2 of tags2) {
        if (newMatrixT[tag2] === undefined) {
          newMatrixT[tag2] = {}
        }
        newMatrixT[tag2][tag1] = []
        newMatrix[tag1][tag2] = []
        if (tag2 in m[tag1]) {
          for (let imgId of m[tag1][tag2]) {
            newMatrix[tag1][tag2].push(imgId)
            newMatrixT[tag2][tag1].push(imgId)
          }
        } else {
          newMatrix[tag1][tag2] = []
          newMatrixT[tag2][tag1] = []
        }
      }
    }
    this.setState({
      loaded: true,
      matrix: newMatrix,
      matrix_t: newMatrixT,
      view_transpose: ((Object.keys(newMatrix).length <= Object.keys(newMatrixT).length)),
      tagA: this.props.tag_1,
      tagB: this.props.tag_2
      // matrix: result['matrix']
    })


  }

  toggle(new_set = []) {
    this.setState({
      modal: !this.state.modal,
      selectedSet: new_set
    })
  }

  toggleDetail() {
    this.setState({
      modalOpen: !this.state.modalOpen
    })
  }

  flip() {
    this.setState({
      view_transpose: !this.state.view_transpose
    })
  }

  setModal(imgInfo) {
    var mockImages = require(`../../assets/txt/ffind-defaults/all-images.json`)

    let result = mockImages[imgInfo]
    let kvals = result.kvals
    let tagVals = result.tags.map(tag => tag.tag)
    this.setState({
      modalData: {
        img_id: imgInfo,
        img_data: kvals
      }
    })
    this.toggleDetail()  }

  render() {
    if (this.state.loaded) {
      let headings = null
      let chosenMatrix = null
      if (!this.state.view_transpose) {
        headings = Object.keys(this.state.matrix[Object.keys(this.state.matrix)[0]])
        chosenMatrix = this.state.matrix
      } else {
        headings = Object.keys(this.state.matrix_t[Object.keys(this.state.matrix_t)[0]])
        chosenMatrix = this.state.matrix_t
      }

      return (
        <div className='image-matrix'>
          <Container>
            <Row>
              <Col md='12'>
                <h1>Matrix View</h1>
              </Col>
            </Row>
            <Row>
              <Col md='12'>
                <h3>{`Viewing ${this.props.tag_1} vs ${this.props.tag_2}`}</h3>
              </Col>
            </Row>
          </Container>
          <Container fluid className='image-matrix'>
            <Row>
              <Col md='12'>
                <div className='image-matrix-content table table-responsive'>
                  <Table hover className='image-matrix mx-auto'>
                    <thead>
                      <tr>
                        <th className='matrix-cell sticky-top'><Button color='primary' onClick={this.flip}><FontAwesomeIcon size='1x' icon={'redo'} /></Button></th>
                        {headings.map(item => (
                          <th key={item} className='matrix-cell matrix-head sticky-top'><strong>{item}</strong></th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(chosenMatrix).map(row => (
                        <tr key={row}><td className='matrix-cell border-right'><strong>{row}</strong></td>{Object.keys(chosenMatrix[row]).map(col => (
                          <td key={row + ', ' + col} className='matrix-cell'>
                            {chosenMatrix[row][col][0] !== undefined && <div className='matrix-cell-img' onClick={() => this.toggle(chosenMatrix[row][col])}><img className='matrix-thumb' src={`https://dev7-pancreatlas.app.vumc.org/images/${chosenMatrix[row][col][0]}.jpg`} alt='' /><div className='matrix-cell-count'><p>{`${chosenMatrix[row][col].length}`}</p></div></div>}
                            {chosenMatrix[row][col][0] === undefined && <p>&mdash;</p>}
                          </td>
                        ))}</tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Col>
            </Row>
            <Modal isOpen={this.state.modal} toggle={() => this.toggle([])} className='matrix-modal'>
              <ModalHeader toggle={() => this.toggle([])}>Image List</ModalHeader>
              <ModalBody>
                <Table>
                  <thead>
                    <tr>
                      <td>Thumbnail</td>
                      <td>Name</td>
                      <td>Action</td>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.selectedSet.map(img => (
                      <MatrixModalListComponent iid={img} modalCallback={this.setModal} />
                    ))}
                  </tbody>
                </Table>
              </ModalBody>
              <ModalFooter>
                <Button color='danger' onClick={() => this.toggle([])}>Dismiss</Button>
              </ModalFooter>
            </Modal>
            <ImageModal toggle={this.toggleDetail} isOpen={this.state.modalOpen} modalData={this.state.modalData} />
          </Container>
        </div>
      )
    } else if (this.state.error !== undefined) {
      return <Container><Error error_desc={this.state.error.message} /></Container>
    } else {
      return (
        <LoadingBar loadingInfo={`${this.props.tag_1} vs ${this.props.tag_2}`} />
      )
    }
  }
}

ImageMatrix.defaultProps = {
  tag_1: 'age',
  tag_2: 'pancreas%20region'
}
