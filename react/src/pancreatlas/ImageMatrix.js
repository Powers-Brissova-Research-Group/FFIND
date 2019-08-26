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

import ImageModal from './ImageModal'
import MatrixModalListComponent from './MatrixModalListComponent'
import LoadingBar from './LoadingBar'

import Error from './Error'

import axios from 'axios'

export default class ImageMatrix extends React.Component {
  constructor (props) {
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
    this.compareAges = this.compareAges.bind(this)
    this.setModal = this.setModal.bind(this)
  }

  compareAges (age1, age2) {
    let ageRe = /^(G)?(\d+\.?\d*)(d|w|mo|y)(\+\d+d|w|mo|y)?$/
    let a = ageRe.exec(age1)
    let b = ageRe.exec(age2)
    switch (a[3]) {
      case 'd':
        a[3] = 0
        break
      case 'w':
        a[3] = 1
        break
      case 'mo':
        a[3] = 2
        break
      case 'y':
        a[3] = 3
        break
      default:
        a[3] = -1
    }

    switch (b[3]) {
      case 'd':
        b[3] = 0
        break
      case 'w':
        b[3] = 1
        break
      case 'mo':
        b[3] = 2
        break
      case 'y':
        b[3] = 3
        break
      default:
        b[3] = -1
    }

    if (a[1] === 'G' && b[1] !== 'G') {
      return -1
    } else if (a[1] !== 'G' && b[1] === 'G') {
      return 1
    } else {
      if (a[3] < b[3]) {
        return -1
      } else if (a[3] > b[3]) {
        return 1
      } else {
        if (Number(a[2]) < Number(b[2])) {
          return -1
        } else if (Number(a[2]) > Number(b[2])) {
          return 1
        } else {
          if (a[4] === undefined && b[4] !== undefined) {
            return -1
          } else if (a[4] !== undefined && b[4] === undefined) {
            return 1
          } else {
            return 0
          }
        }
      }
    }
  }

  componentDidMount () {
    axios.get(`${process.env.REACT_APP_API_URL}/matrix/${this.props.tag_1},${this.props.tag_2},${this.props.dsid}`, {
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Authorization': process.env.REACT_APP_API_AUTH
      }
    }).then(response => {
      let result = response.data

      let m = result['matrix']
      let newMatrix = {}
      let newMatrixT = {}
      let tags1 = Object.keys(m)
      let tags2 = Object.keys(m[tags1[0]])
      if (this.props.tag_1 === 'AGE') {
        tags1.sort(this.compareAges)
      } else {
        tags1.sort()
      }

      if (this.props.tag_2 === 'AGE') {
        tags2.sort(this.compareAges)
      } else {
        tags2.sort()
      }

      /* eslint-disable no-unused-vars */

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
      /* eslint-enable no-unused-vars */
      this.setState({
        loaded: true,
        matrix: newMatrix,
        matrix_t: newMatrixT,
        view_transpose: ((Object.keys(newMatrix).length <= Object.keys(newMatrixT).length)),
        tagA: result['tag_a'],
        tagB: result['tag_b']
        // matrix: result['matrix']
      })
    }).catch(err => {
      this.setState({
        loaded: false,
        error: err
      })
    })
  }

  toggle (new_set = []) {
    this.setState({
      modal: !this.state.modal,
      selectedSet: new_set
    })
  }

  toggleDetail () {
    this.setState({
      modalOpen: !this.state.modalOpen
    })
  }

  flip () {
    this.setState({
      view_transpose: !this.state.view_transpose
    })
  }

  setModal (imgInfo) {
    axios.get(`${process.env.REACT_APP_API_URL}/images/${imgInfo}`, {
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Authorization': process.env.REACT_APP_API_AUTH
      }
    }).then(response => {
      let result = response.data
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
      this.toggleDetail()
    })
      .catch(err => {
        this.setState({
          loaded: false,
          error: err
        })
      })
  }

  render () {
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
                      <td>Image Tags</td>
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
