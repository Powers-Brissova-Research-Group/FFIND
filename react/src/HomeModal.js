import React from 'react'
import {
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  Button
} from 'reactstrap'

import {
  Link
} from 'react-router-dom'

import ModalPlate1 from './assets/modal-plate-1.png'
import ModalPlate2 from './assets/modal-plate-2.png'
import ModalPlate3 from './assets/modal-plate-3.png'

export default class HomeModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedImage: ModalPlate1,
      selected: 1
    }

    this.select = this.select.bind(this)
  }

  select (imgNum) {
    let imgPlate = ModalPlate1
    switch (imgNum) {
      case 2:
        imgPlate = ModalPlate2
        break
      case 3:
        imgPlate = ModalPlate3
        break
      default:
        imgPlate = ModalPlate1
    }
    this.setState({
      selectedImage: imgPlate,
      selected: imgNum
    })
  }
  render () {
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} className='home-modal'>
        <ModalHeader toggle={this.props.toggle}>Explore the Pancreas</ModalHeader>
        <ModalBody>
          <Row>
            <Col md='8' sm='12'>
              <Row>
                <Col sm='12'>
                  <h3>Step 1: Pick a Dimension</h3>
                </Col>
              </Row>
              <Row>
                <Col sm='12'>
                  <div className='controls'>
                    <span onClick={() => this.select(1)} className={`control-element ${(this.state.selected === 1) ? 'selected' : null}`}>Whole Body/Pancreas</span>
                    <span onClick={() => this.select(2)} className={`control-element ${(this.state.selected === 2) ? 'selected' : null}`}>Pancreatic Islets</span>
                    <span onClick={() => this.select(3)} className={`control-element ${(this.state.selected === 3) ? 'selected' : null}`}>Islet Cells</span>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col sm='12'>
                  <img className='modal-image' src={this.state.selectedImage} alt='Modal Plate' />
                </Col>
              </Row>
            </Col>
            <Col md='4' sm='12'>
              <Row>
                <Col sm='12'>
                  <h3>Step 2: Pick a project</h3>
                </Col>
              </Row>
              <Row>
                <Col sm='12'>
                  <h6>Options:</h6>
                </Col>
              </Row>
              <Link to='/datasets/384'><Button color='primary'>View in Pancreatlas</Button></Link>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    )
  }
}
