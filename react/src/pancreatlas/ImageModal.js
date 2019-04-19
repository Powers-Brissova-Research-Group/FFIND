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

import DetailRow from './DetailRow'

export default class ImageModal extends React.Component {
  constructor (props) {
    super(props)
    this.defs = require('../assets/pancreatlas/definitions.json')
    this.markers = {}
    this.relevantKeys = {}
    this.state = {
      isFavorite: this.props.modalData !== undefined && this.props.favorites.indexOf(this.props.modalData.img_id) !== -1
    }
    this.favorite = this.favorite.bind(this)
  }

  componentDidUpdate (prevProps) {
    if (JSON.stringify(prevProps.favorites) !== JSON.stringify(this.props.favorites)) {
      this.setState({
        isFavorite: this.props.modalData !== undefined && this.props.favorites.indexOf(this.props.modalData.img_id) !== -1
      })
    }
  }

  favorite () {
    this.setState({
      isFavorite: !this.state.isFavorite
    })
    this.props.favoriteCallback(this.props.modalData.img_id)
  }

  render () {
    var tinycolor = require('tinycolor2')
    let labelRe = /^([a-zA-Z]+\s+info)?(\s+-\s+)?(.+)$/
    if (this.props.modalData !== undefined) {
      let markerRe = /(^Stain info)(\s+-\s+)([a-zA-Z0-9]+$)/i
      let matchingKeys = Object.keys(this.props.modalData.img_data).filter(key => markerRe.test(key))
      for (let key of matchingKeys) {
        this.markers[markerRe.exec(key)[3]] = this.props.modalData.img_data[key].val
      }
      this.relevantKeys = Object.keys(this.props.modalData.img_data).sort().filter(
        key => ['Stain info - DAPI', 'Stain info - cy2', 'Stain info - cy3', 'Stain info - cy5', 'Image info - Annotations', 'External id', '(DS notes)', 'Image info - Analysis', 'Image info - Pancreas Region'].indexOf(key) === -1
      )
    }

    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} className='image-detail-modal'>
        <ModalHeader toggle={this.props.toggle}>Image Preview</ModalHeader>
        <ModalBody>
          {this.props.modalData !== undefined &&
            <div className='modal-data'>
              <Row>
                <Col md='6' sm='12'>
                  <div className='modal-image'>
                    <Row>
                      <Col sm='12'>
                        <a href={this.props.modalData.path_path}><img src={require(`../assets/pancreatlas/thumbs/${this.props.modalData.img_id}.jpg`)} alt={this.props.modalData.img_id} className='modal-image' /></a>
                      </Col>
                    </Row>
                    <Row>
                      <Col md='12'>
                        <div className='modal-markers'>
                          {Object.keys(this.markers).filter(key => this.markers[key] !== '').map(key => (
                            <span
                              className='tag marker'
                              style={{
                                color: (tinycolor(this.props.modalData.markerColors[key.toUpperCase()]).isLight()) ? '#000000' : '#FFFFFF',
                                backgroundColor: `#${this.props.modalData.markerColors[key.toUpperCase()]}`
                              }}>
                              {this.markers[key]}
                            </span>
                            // <div className={'marker-cell'} style={{ color: (tinycolor(this.props.modalData.markerColors[key.toUpperCase()]).isLight()) ? '#000000' : '#FFFFFF', backgroundColor: `#${this.props.modalData.markerColors[key.toUpperCase()]}` }}>
                            //   <p>{this.markers[key]}</p>
                            // </div>
                          ))}
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
                <Col md='6' sm='12'>
                  <Row>
                    <div className='w-100 modal-actions'>
                      <a href={this.props.modalData.path_path} target='_blank' rel='noopener noreferrer' className='pathviewer-button'>
                        <Button outline color='secondary'>Open <FontAwesomeIcon size='1x' icon='external-link-alt' /></Button>
                      </a>
                      {!this.state.isFavorite && <Button outline color='success' className='favorite' onClick={() => this.favorite()}>Save <FontAwesomeIcon icon={['far', 'bookmark']} size='1x' /></Button>}
                      {this.state.isFavorite && <Button outline color='danger' className='favorite' onClick={() => this.favorite()}>Remove <FontAwesomeIcon icon={['fas', 'bookmark']} size='1x' /></Button>}
                    </div>
                  </Row>
                  <Row>
                    <Col md='12'>
                      <Table>
                        <tbody>
                          {this.relevantKeys.map(key => {
                            return <DetailRow data={this.props.modalData.img_data[key].val} desc={this.defs[key].short_desc} heading={labelRe.exec(key)[3]} />
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
