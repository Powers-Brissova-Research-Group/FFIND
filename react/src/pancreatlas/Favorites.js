import React from 'react'

import {
  Container,
  Row,
  Col
} from 'reactstrap'

import ImageCard from './ImageCard'
import ImageModal from './ImageModal'

export default class Favorites extends React.Component {
  constructor(props) {
    super(props)
    console.log(this.props)
    this.setModal = this.setModal.bind(this)
    this.toggle = this.toggle.bind(this)

    this.state = {
      modalOpen: false,
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
          this.toggle()
        })
      .catch(err => {
        this.setState({
          loaded: false,
          error: err
        })
      });
  }

  toggle() {
    this.setState({
      modalOpen: !this.state.modalOpen
    })
  }

  render() {
    return (
      <Container>
        <h1>Favorite Images</h1>
        <h3>Here are some images that you saved from earlier</h3>
        <Row>
          {this.props.favorites.map(iid => 
            <Col md="3">
              <ImageCard favoriteCallback={this.props.favoriteCallback} key={iid} iid={iid} callback={this.setModal} />
            </Col>
          )}
        </Row>
        <ImageModal toggle={this.toggle} isOpen={this.state.modalOpen} modalData={this.state.modalData} />
      </Container>
    )
  }

}