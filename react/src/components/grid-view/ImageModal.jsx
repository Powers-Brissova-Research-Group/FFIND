import React from 'react'
import {
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  Table,
  Button
} from 'reactstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { DetailRow } from '../utils'

export default class ImageModal extends React.Component {
  constructor(props) {
    super(props)
    this.relevantKeys = {}
    this.state = {
      isFavorite: this.props.modalData !== undefined && this.props.favorites.indexOf(this.props.modalData.img_id) !== -1
    }
    this.favorite = this.favorite.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.favorites) !== JSON.stringify(this.props.favorites)) {
      this.setState({
        isFavorite: this.props.modalData !== undefined && this.props.favorites.indexOf(this.props.modalData.img_id) !== -1
      })
    }
  }

  favorite() {
    this.setState({
      isFavorite: !this.state.isFavorite
    })
    this.props.favoriteCallback(this.props.modalData.img_id)
  }

  render() {
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} className='image-detail-modal'>
        <ModalHeader toggle={this.props.toggle}>Image Preview</ModalHeader>
        <ModalBody>
          {this.props.modalData !== undefined &&
            <div className='modal-data'>
              <Row>
                <Col md='12'>
                  <Row>
                    <div className='w-100 modal-actions'>
                      {!this.state.isFavorite && <Button outline color='success' className='favorite' onClick={() => this.favorite()}>Save <FontAwesomeIcon icon={['far', 'bookmark']} size='1x' /></Button>}
                      {this.state.isFavorite && <Button outline color='danger' className='favorite' onClick={() => this.favorite()}>Remove <FontAwesomeIcon icon={['fas', 'bookmark']} size='1x' /></Button>}
                    </div>
                  </Row>
                  <Row>
                    <Col md='6'>
                      <img src='//placehold.it/400x400/000000/222222' alt='modal preview' />
                    </Col>
                    <Col md='6'>
                      <Table>
                        <tbody>
                          {Object.keys(this.props.modalData.img_data).map(key => {
                            return (
                              <DetailRow data={this.props.modalData.img_data[key].val} heading={key} />
                            )
                          })}
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          }
        </ModalBody>
      </Modal>
    )
  }
}
