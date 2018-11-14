import React from 'react'

import {
  Container,
  Row,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  Input,
  Button
} from 'reactstrap'

import ImageCard from './ImageCard'
import ImageModal from './ImageModal'

export default class Favorites extends React.Component {
  constructor(props) {
    super(props)
    this.setModal = this.setModal.bind(this)
    this.toggle = this.toggle.bind(this)
    
    let urlVars = new URLSearchParams(window.location.search)

    let favs = []
    if(urlVars.has('iids')){
      favs = JSON.parse(window.atob(urlVars.get('iids')))
    }

    this.state = {
      saveModalOpen: false,
      modalOpen: false,
      iids: favs
    }
  }

  setModal(imgInfo) {
    fetch(`${process.env.REACT_APP_API_URL}/images/${imgInfo}`)
      .then(res => res.json())
      .then(
        (result) => {
          if (Object.keys(result.kvals).length > 0){
            let path = result.kvals['File path'].val
            let re = /([0-9]+-[0-9]+-[0-9]+)?(\/[^/]+\.[a-z]+)$/
            let age_re = /^(G?)(\d+)(.\d)?(d|w|mo|y)(\+\dd)?$/

            let markerColors = result.channel_info
            let markerColor_re = /^.+\((.+)\)$/
            Object.keys(markerColors).forEach(function(key){
              var newKey = markerColor_re.test(key) ? markerColor_re.exec(key)[1] : key
              if (newKey !== key){
                markerColors[newKey] = markerColors[key]
                delete markerColors[key]
              }
            })
  

            let matches = re.exec(path)
            result.kvals['File path'].val = matches[0]
            result.kvals['Donor info - Age'].val = result.tags.filter(val => age_re.test(val))[0]      
            this.setState({
              modalData: {
                img_id: imgInfo,
                img_data: result.kvals,
                path_path: result.pathpath,
                markerColors: markerColors
              }
            })
          } else {
            this.setState({
              modalData: {
                img_id: imgInfo,
                img_data: {"Warning": "No information for this image"},
                path_path: result.pathpath  
              }
            })
          }
          this.toggle('image')
        })
      .catch(err => {
        this.setState({
          loaded: false,
          error: err
        })
      });
  }

  toggle(modalType) {
    switch(modalType){
      case 'image':
        this.setState({modalOpen: !this.state.modalOpen})
        break
      case 'save':
        this.setState({saveModalOpen: !this.state.saveModalOpen})
        break
      default:
        this.setState({modalOpen: !this.state.modalOpen})
    }
  }

  render() {
    return (
      <Container>
        <h1>Favorite Images</h1>
        <h3>Here are some images that you saved from earlier</h3>
        <Button onClick={() => this.toggle('save')}>Save for Later</Button>
        <Row>
          {this.state.iids.map(iid => 
            <Col md="3">
              <ImageCard favoriteCallback={this.props.favoriteCallback} key={iid} iid={iid} callback={this.setModal} />
            </Col>
          )}
        </Row>
        <Modal isOpen={this.state.saveModalOpen} toggle={() => this.toggle('save')}>
            <ModalHeader toggle={() => this.toggle('save')}>Save for Later</ModalHeader>
            <ModalBody>
              <Input type='text' disabled>{window.location}</Input>
            </ModalBody>
        </Modal>
        <ImageModal toggle={() => this.toggle('image')} isOpen={this.state.modalOpen} modalData={this.state.modalData} />
      </Container>
    )
  }

}