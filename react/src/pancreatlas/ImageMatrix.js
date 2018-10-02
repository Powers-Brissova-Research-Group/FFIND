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

import {
  Link
} from 'react-router-dom'

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
      selected_set: []
    }

    this.toggle = this.toggle.bind(this);
    this.flip = this.flip.bind(this);
  }

  componentDidMount() {
    fetch('http://dev7-api-pancreatlas.app.vumc.org:8447/api/matrix/' + this.props.tag_1 + ',' + this.props.tag_2 + ',' + this.props.dsid)
      .then(res => res.json())
      .then((result) => {
        let m = result['matrix']
        let new_matrix = {}
        let new_matrix_t = {}
        for (let tag_1 of Object.keys(m)) {
          new_matrix[tag_1] = {}
          for (let tag_2 of Object.keys(m[tag_1])) {
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
    this.setState({
      modal: !this.state.modal,
      selected_set: new_set
    })
  }

  flip() {
    this.setState({
      view_transpose: !this.state.view_transpose
    });
  }

  render() {
    if (this.state.loaded) {
      let headings = null;
      let chosen_matrix = null;
      if(!this.state.view_transpose){
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
                    <td>Image Name</td>
                    <td>Action</td>
                  </tr>
                </thead>
                <tbody>
                  {this.state.selected_set.map(img => (
                    <tr>
                      <td><img className='modal-thumb' src={require(`./../assets/pancreatlas/thumbs/${img.iid}.jpg`)} alt="" /></td>
                      <td><p>{img.iname}</p></td>
                      <td><Link to={'/pancreatlas/image/' + img.iid} target='_blank'><Button color="primary">View</Button></Link></td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={() => this.toggle([])}>Dismiss</Button>
            </ModalFooter>
          </Modal>
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

