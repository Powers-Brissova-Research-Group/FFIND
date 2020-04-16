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
    let labelRe = /^(?!Hex code)([a-zA-Z]+\s+info)?(\s+-\s+)?(.+)$/
    var markers = []
    if (this.props.modalData !== undefined) {
      let markerRe = /(^Stain info)(\s+-\s+)([a-zA-Z0-9 \t-]+)(?<!-Ab)$/i
      let matchingKeys = Object.keys(this.props.modalData.img_data).filter(key => markerRe.test(key))
      for (let key of matchingKeys) {
        var val = this.props.modalData.img_data[key].val
        var clr = this.props.modalData.markerColors[val] === undefined ? '#FFFFFF' : this.props.modalData.markerColors[val] 
        markers.push({
          'val': val,
          'color': clr
        })
      }
      this.relevantKeys = Object.keys(this.props.modalData.img_data).sort().filter(
        key => matchingKeys.concat(['Image info - Annotations', 'External id', '(DS notes)', 'Image info - Analysis', 'Image info - File Type', 'Donor info - UNOS ID', 'File path', 'Program ID link']).indexOf(key) === -1
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
                        <a href={this.props.modalData.path_path}><img src={`${process.env.REACT_APP_IMAGE_URL}/${this.props.modalData.img_id}.jpg`} alt={this.props.modalData.img_id} className='modal-image' /></a>
                      </Col>
                    </Row>
                    <Row>
                      <Col md='12'>
                        <div className='modal-markers'>
                          {Object.keys(this.props.modalData.markerColors).filter(key => key !== '').map(marker => (
                            <span
                              className='tag marker'
                              style={{
                                color: (tinycolor(this.props.modalData.markerColors[marker]).isLight()) ? '#000000' : '#FFFFFF',
                                backgroundColor: `#${this.props.modalData.markerColors[marker]}`
                              }}>
                              {marker}
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
                          {this.relevantKeys.filter(key => labelRe.test(key)).map(key => {
                            if (key === 'Donor info - Program ID' && this.props.modalData.img_data['Program ID link'] !== undefined) {
                              return <DetailRow data={this.props.modalData.img_data[key].val} link={this.props.modalData.img_data['Program ID link'].val} desc={this.defs['Image Tags'][key] === undefined ? '' : this.defs['Image Tags'][key]['Description']} heading={labelRe.exec(key)[3]} />
                            }
                            return <DetailRow data={this.props.modalData.img_data[key].val} desc={this.defs['Image Tags'][key] === undefined ? '' : this.defs['Image Tags'][key]['Description']} heading={labelRe.exec(key)[3]} />
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
