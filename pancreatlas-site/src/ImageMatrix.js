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
    fetch('http://127.0.0.1:8000/api/matrix/' + this.props.tag_1 + ',' + this.props.tag_2)
      .then(res => res.json())
      .then((result) => {
        this.setState({
          loaded: true,
          tag_a: result['tag_a'],
          tag_b: result['tag_b'],
          matrix: result['matrix']
        })
        console.log(this.state.matrix)
      });
  }

  toggle(new_set = []) {
    this.setState({
      modal: !this.state.modal,
      selected_set: new_set
    })
  }

  render() {
    const { loaded, matrix } = this.state

    if (!loaded) {
      return (
        <div className="loading">
          <strong>Loading {this.props.dataset_name}...</strong>
          <Progress animated color="success" value="100" />
        </div>
      )
    }
    else {
      let headings = Object.keys(matrix[Object.keys(matrix)[0]])
      return (
        <Container fluid>
          <div className='image-matrix'>
            <Table hover>
              <thead>
                <td></td>
                {headings.map(item => (
                  <td><strong>{item}</strong></td>
                ))}
              </thead>
              <tbody>
                {Object.keys(matrix).map(row => (
                  <tr><td><strong>{row}</strong></td>{Object.keys(matrix[row]).map(col => (
                    <td>
                      {matrix[row][col][0] !== undefined && <img onClick={() => this.toggle(matrix[row][col])} className='matrix-thumb' src={'http://127.0.0.1:8000/' + matrix[row][col][0].thumbpath} alt="" />}
                      {matrix[row][col][0] === undefined && <p>No matching images</p>}
                    </td>
                  ))}</tr>
                ))}
              </tbody>
            </Table>
          </div>
          <Modal isOpen={this.state.modal} toggle={() => this.toggle([])} className='matrix-modal'>
            <ModalHeader toggle={this.toggle}>Image List</ModalHeader>
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
    }
  }
}

ImageMatrix.defaultProps={
  tag_1: 'age',
  tag_2: 'pancreas%20region'
}

