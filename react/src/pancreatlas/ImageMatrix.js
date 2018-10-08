import React from 'react'
import {
  Container,
  Table,
  Progress,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from 'reactstrap'

import ImageModal from './ImageModal'

import Error from './Error'

export default class ImageMatrix extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      tag_a: null,
      tag_b: null,
      matrix: null,
      modal: false,
      modalOpen: false,
      selected_set: []
    }

    this.toggle = this.toggle.bind(this);
    this.toggleDetail = this.toggleDetail.bind(this)
    this.flip = this.flip.bind(this);
    this.compareAges = this.compareAges.bind(this)
    this.setModal = this.setModal.bind(this)
  }

  compareAges(age1, age2) {
    let ageRe = /^(G)?(\d+\.?\d*)(d|w|mo|y)(\+\d+d|w|mo|y)?$/;
    let a = ageRe.exec(age1)
    let b = ageRe.exec(age2)
    switch (a[3]) {
      case 'd':
        a[3] = 0;
        break;
      case 'w':
        a[3] = 1;
        break;
      case 'mo':
        a[3] = 2;
        break;
      case 'y':
        a[3] = 3
        break;
      default:
        a[3] = -1
    }

    switch (b[3]) {
      case 'd':
        b[3] = 0;
        break;
      case 'w':
        b[3] = 1;
        break;
      case 'mo':
        b[3] = 2;
        break;
      case 'y':
        b[3] = 3
        break;
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

  componentDidMount() {
    fetch('http://dev7-api-pancreatlas.app.vumc.org:8447/api/matrix/' + this.props.tag_1 + ',' + this.props.tag_2 + ',' + this.props.dsid)
      .then(res => res.json())
      .then((result) => {
        let m = result['matrix']
        let new_matrix = {}
        let new_matrix_t = {}
        let tags_1 = Object.keys(m)
        let tags_2 = Object.keys(m[tags_1[0]])
        if (this.props.tag_1 === 'AGE') {
          tags_1.sort(this.compareAges)
        } else {
          tags_1.sort()
        }

        if (this.props.tag_2 === 'AGE') {
          tags_2.sort(this.compareAges)
        } else {
          tags_2.sort()
        }

        for (let tag_1 of tags_1) {
          new_matrix[tag_1] = {}
          for (let tag_2 of tags_2) {
            if (new_matrix_t[tag_2] === undefined) {
              new_matrix_t[tag_2] = {}
            }
            new_matrix_t[tag_2][tag_1] = []
            new_matrix[tag_1][tag_2] = []
            for (let img_id of m[tag_1][tag_2]) {
              let url = 'http://dev7-api-pancreatlas.app.vumc.org:8447/api/images/' + img_id
              fetch(url)
                .then(res => res.json())
                .then(result => {
                  new_matrix[tag_1][tag_2].push(result)
                  new_matrix_t[tag_2][tag_1].push(result)
                  this.setState({
                    matrix: new_matrix,
                    matrix_t: new_matrix_t,
                    view_transpose: ((Object.keys(new_matrix).length <= Object.keys(new_matrix_t).length) ? true : false),
                    loaded: true
                  })
                })
                .catch(err => {
                  this.setState({
                    loaded: false,
                    error: err
                  })
                });
            }
          }
        }
        this.setState({
          // loaded: true,
          tag_a: result['tag_a'],
          tag_b: result['tag_b'],
          // matrix: result['matrix']
        })
      })
      .catch(err => {
        this.setState({
          loaded: false,
          error: err
        })
      });

  }

  toggle(new_set = []) {
    for (let img of new_set) {
      let kvals = img.kvals;
      let marker_re = /(^Stain info)(\s+-\s+)([a-zA-Z0-9]+$)/i
      let donor_re = /(^Donor info)(\s+-\s+)(.+$)/i
      let region_re = /(^Image info)(\s+-\s+)(Section Plane$|Pancreas Region$)/
      let marker_keys = Object.keys(kvals).filter(key => marker_re.test(key))
      let donor_keys = Object.keys(kvals).filter(key => donor_re.test(key))
      let region_keys = Object.keys(kvals).filter(key => region_re.test(key))

      donor_keys.sort()
      region_keys.sort()
      let markers = {}
      let donor = {}
      let region = {
        [region_keys[1]]: kvals[region_keys[1]].val,
        [region_keys[0]]: kvals[region_keys[0]].val

      }
      for (let key of marker_keys) {
        kvals[key].val.split(',').map(val => markers[val.trim()] = marker_re.exec(key)[3])
      }
      for (let key of donor_keys) {
        if (kvals[key].val !== '' && kvals[key].val !== undefined){
          let val_key = donor_re.exec(key)[3]
          if (val_key !== 'UNOS ID' && val_key !== 'LIMS ID' && kvals[key] !== '') {
            if (val_key === 'Age'){
              let age_re = /^(G?)(\d+)(.\d)?(d|w|mo|y)(\+\dd)?$/
              donor[donor_re.exec(key)[3]] = img.tags.filter(tag => age_re.test(tag))[0]
            } else {
              donor[donor_re.exec(key)[3]] = kvals[key].val
            }
          }
        }
      }

      img.markers = markers
      img.donor = donor
      img.region = region
    }
    this.setState({
      modal: !this.state.modal,
      selected_set: new_set
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
    });
  }

  setModal(imgInfo) {
    fetch('http://dev7-api-pancreatlas.app.vumc.org:8447/api/images/' + imgInfo)
      .then(res => res.json())
      .then(
        (result) => {
          let path = result.kvals['File path'].val
          let re = /([0-9]+-[0-9]+-[0-9]+)?(\/[^/]+\.[a-z]+)$/
          let matches = re.exec(path)
          result.kvals['File path'].val = matches[0]
          this.setState({
            modalData: {
              img_id: imgInfo,
              img_data: result.kvals,
              path_path: result.pathpath
            }
          })
          this.toggleDetail()
        })
      .catch(err => {
        this.setState({
          loaded: false,
          error: err
        })
      });
  }


  render() {
    if (this.state.loaded) {
      let headings = null;
      let chosen_matrix = null;
      if (!this.state.view_transpose) {
        headings = Object.keys(this.state.matrix[Object.keys(this.state.matrix)[0]])
        chosen_matrix = this.state.matrix
      } else {
        headings = Object.keys(this.state.matrix_t[Object.keys(this.state.matrix_t)[0]])
        chosen_matrix = this.state.matrix_t
      }

      return (
        <Container fluid>
          <div className='image-matrix'>
            <Table hover className='image-matrix'>
              <thead>
                <tr>
                  <td className='matrix-cell'><Button color="primary" onClick={this.flip}>Flip Matrix</Button></td>
                  {headings.map(item => (
                    <td key={item} className='matrix-cell matrix-head'><strong>{item}</strong></td>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.keys(chosen_matrix).map(row => (
                  <tr key={row}><td className='matrix-cell matrix-head'><strong>{row}</strong></td>{Object.keys(chosen_matrix[row]).map(col => (
                    <td key={row + ', ' + col} className='matrix-cell'>
                      {chosen_matrix[row][col][0] !== undefined && <div onClick={() => this.toggle(chosen_matrix[row][col])} className='matrix-cell-img'><img className='matrix-thumb' src={require(`./../assets/pancreatlas/thumbs/${chosen_matrix[row][col][0].iid}.jpg`)} alt="" /><div className='matrix-cell-count'><p>{`${chosen_matrix[row][col].length} images`}</p></div></div>}
                      {chosen_matrix[row][col][0] === undefined && <p>&mdash;</p>}
                    </td>
                  ))}</tr>
                ))}
              </tbody>
            </Table>
          </div>
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
                  {this.state.selected_set.map(img => (
                    <tr>
                      <td><img className='modal-thumb' src={require(`./../assets/pancreatlas/thumbs/${img.iid}.jpg`)} alt="" /></td>
                      <td>
                        {Object.keys(img.donor).map(key =>
                          (<div>
                            <strong>{key}: </strong>{img.donor[key]}
                          </div>))}
                        <div><strong>Markers: </strong>{Object.keys(img.markers).join(', ')}</div>
                        <div><strong>Region: </strong>{Object.values(img.region).join(', ')}</div>
                        <div><strong>Other Tags: </strong>{img.tags.filter(tag => Object.keys(img.markers).indexOf(tag) === -1 && Object.values(img.donor).indexOf(tag) === -1 && Object.values(img.region).indexOf(tag) === -1).join(', ')}
                        </div>
                      </td>
                      <td><Button color="primary" onClick={() => this.setModal(img.iid)}>View</Button></td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={() => this.toggle([])}>Dismiss</Button>
            </ModalFooter>
          </Modal>
          <ImageModal toggle={this.toggleDetail} isOpen={this.state.modalOpen} modalData={this.state.modalData} />
        </Container>

      )
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

ImageMatrix.defaultProps = {
  tag_1: 'age',
  tag_2: 'pancreas%20region'
}

