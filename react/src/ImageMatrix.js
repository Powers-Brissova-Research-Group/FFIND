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
  }

  componentDidMount() {
    fetch('http://dev-7-api-pancreatlas.app.vumc.org:8447/api/matrix/' + this.props.tag_1 + ',' + this.props.tag_2 + ',' + this.props.dsid)
      .then(res => res.json())
      .then((result) => {
        let m = result['matrix']
        let new_matrix = {}
        for (let tag_1 of Object.keys(m)) {
          new_matrix[tag_1] = {}
          for (let tag_2 of Object.keys(m[tag_1])) {
            new_matrix[tag_1][tag_2] = []
            for (let img_id of m[tag_1][tag_2]) {
              let url = 'http://dev-7-api-pancreatlas.app.vumc.org:8447/api/images/' + img_id
              console.log(url)
              fetch(url)
                .then(res => res.json())
                .then(result => {
                  new_matrix[tag_1][tag_2].push(result)
                  this.setState({
                    matrix: new_matrix
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
          loaded: true,
          tag_a: result['tag_a'],
          tag_b: result['tag_b'],
          matrix: result['matrix']
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

  render() {
    if (this.state.loaded) {
      let headings = Object.keys(this.state.matrix[Object.keys(this.state.matrix)[0]])
      return (
        <Container fluid>
          <div className='image-matrix'>
            <Table hover>
              <thead>
                <tr>
                  <td></td>
                  {headings.map(item => (
                    <td key={item}><strong>{item}</strong></td>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.keys(this.state.matrix).map(row => (
                  <tr key={row}><td><strong>{row}</strong></td>{Object.keys(this.state.matrix[row]).map(col => (
                    <td key={row + ', ' + col}>
                      {this.state.matrix[row][col][0] !== undefined && <img onClick={() => this.toggle(this.state.matrix[row][col])} className='matrix-thumb' src={'http://127.0.0.1:8000/' + this.state.matrix[row][col][0].thumbpath} alt="" />}
                      {this.state.matrix[row][col][0] === undefined && <p>No matching images</p>}
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
                      <td><img className='modal-thumb' src={'http://127.0.0.1:8000/' + img.thumbpath} alt="" /></td>
                      <td><p>{img.iname}</p></td>
                      <td><Link to={'/image/' + img.iid} target='_blank'><Button color="primary">View</Button></Link></td>
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

