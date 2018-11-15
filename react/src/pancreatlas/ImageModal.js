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

import DetailRow from './DetailRow'

export default class ImageModal extends React.Component {

  constructor(props) {
    super(props)
    this.defs = require('../assets/pancreatlas/definitions.json')
    this.markers = {}
    this.relevantKeys = {}

  }


  render() {
    var tinycolor = require('tinycolor2')
    let label_re = /^([a-zA-Z]+\s+info)?(\s+-\s+)?(.+)$/
    if (this.props.modalData !== undefined) {
      let marker_re = /(^Stain info)(\s+-\s+)([a-zA-Z0-9]+$)/i
      let matchingKeys = Object.keys(this.props.modalData.img_data).filter(key => marker_re.test(key))
      for (let key of matchingKeys) {
        this.markers[marker_re.exec(key)[3]] = this.props.modalData.img_data[key].val
      }
      this.relevantKeys = Object.keys(this.props.modalData.img_data).sort().filter(
        key => ['Stain info - DAPI', 'Stain info - cy2', 'Stain info - cy3', 'Stain info - cy5', 'Image info - Annotations', 'External id', '(DS notes)', 'Image info - Analysis', 'Image info - Pancreas Region'].indexOf(key) === -1
      );
      
    }

    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} className='image-detail-modal'>
        <ModalHeader toggle={this.props.toggle}>Image Preview</ModalHeader>
        <ModalBody>
          {this.props.modalData !== undefined &&
            <div className='modal-data'>
              <Row>
                <Col md="6" sm="12">
                  <Row>
                    {Object.keys(this.markers).filter(key => this.markers[key] !== '').map(key => (
                      <Col md="6" sm="12">
                        <div className={'marker-cell'} style={{color: (tinycolor(this.props.modalData.markerColors[key.toUpperCase()]).isLight()) ? '#000000' : '#FFFFFF', backgroundColor: `#${this.props.modalData.markerColors[key.toUpperCase()]}`}}>
                          <p>{this.markers[key]}</p>
                        </div>
                      </Col>
                    ))}
                  </Row>

                  <Row>
                    <Col sm="12">
                      <a href={this.props.modalData.path_path}><img src={require(`../assets/pancreatlas/thumbs/${this.props.modalData.img_id}.jpg`)} alt={this.props.modalData.img_id} className='modal-image' /></a>

                      <div class="carousel-caption">
              <div className='pathviewer-buttons'>
                        <a href={this.props.modalData.path_path} className='pathviewer-button'><Button color="success">Open</Button></a>
                        <a href={this.props.modalData.path_path} target='_blank' className='pathviewer-button'><Button color="primary">Open in New Tab</Button></a>
                      </div>
            </div>

                    </Col>
                  </Row>

                </Col>
                <Col md="6" sm="12">
                  <Table>
                    <tbody>
                      {this.relevantKeys.map(key => {
                        return <DetailRow data={this.props.modalData.img_data[key].val} desc={this.defs[key].short_desc} heading={label_re.exec(key)[3]} />
                      })}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </div>
          }
        </ModalBody>
      </Modal>
    )
  }
}