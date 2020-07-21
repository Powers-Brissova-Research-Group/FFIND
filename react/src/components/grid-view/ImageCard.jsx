import React from 'react'
import {
  Card,
  CardImg,
  CardBody,
  CardFooter,
  Button,
  Row,
} from 'reactstrap'

import {
  FontAwesomeIcon
} from '@fortawesome/react-fontawesome'

import {
  List
} from 'react-content-loader'

import { Error } from '../utils'

export default class ImageCard extends React.Component {
  constructor(props) {
    super(props)

    this.toggleTooltip = this.toggleTooltip.bind(this)

    this.state = {
      loaded: false,
      imgUrl: null,
      imgName: null,
      omeroId: null,
      imgTags: null,
      match: true
    }
  }

  componentDidMount() {
    // Load information about the image
    var mockImages = require('../../assets/txt/ffind-defaults/mock_images.json')
    let result = mockImages[this.props.iid]
    let kvals = result.kvals
    let tagVals = result.tags.map(tag => tag.tag)
    this.setState({
      loaded: true,
      imgUrl: '/' + result.iname, // https://omero.app.vumc.org/webgateway/render_image_region/' + this.props.iid + '/0/0/?c=1|0:65535$0000FF,2|0:65535$00FF00,3|0:65535$FF0000,4|0:65535$FFFF00&m=c&format=jpeg&region=0,0,300,300',
      imgName: result.iname,
      omeroId: result.iid,
      imgTags: tagVals,
      imgKvals: kvals
    })
  }

  toggleTooltip() {
    this.setState({
      ttOpen: !this.state.ttOpen
    })
  }

  render() {
    if (this.state.loaded) {
      return (
        <Card className='image-card h-100'>
          <div className='card-img-wrapper' onClick={() => this.props.callback(this.props.iid)}>
            <CardImg className='image-card-thumb' top width='100%' src={`http://www.placehold.it/350x350`} alt={this.state.imgName} />
            <FontAwesomeIcon icon='search-plus' size='3x' className='card-search-plus' />
          </div>
          <CardBody className='d-flex flex-column'>
            {Object.keys(this.state.imgKvals).sort().map(key => {
              return (<span><strong>{`${key}: `}</strong>{this.state.imgKvals[key]['val'].join(', ')}</span>)
            })}
          </CardBody>
          <CardFooter>
            <Row>
              <div className='w-100 card-footer-buttons'>
                <Button id='modal-button' outline color='secondary' className='mt-auto' onClick={() => this.props.callback(this.props.iid)}>Preview <FontAwesomeIcon icon='search-plus' size='1x' /></Button>
                {this.props.isFavorite && <Button id='save-button' outline color='info' className='favorite' onClick={() => this.props.favoriteCallback(this.props.iid)}>Save <FontAwesomeIcon icon={['far', 'bookmark']} size='1x' /></Button>}
                {!this.props.isFavorite && <Button id='unsave-button' outline color='danger' className='favorite' onClick={() => this.props.favoriteCallback(this.props.iid)}>Remove <FontAwesomeIcon icon={['fas', 'bookmark']} size='1x' /></Button>}
              </div>
            </Row>
          </CardFooter>
        </Card>
      )
    } else if (this.state.error !== undefined) {
      return <Error error_desc={this.state.error.message} />
    } else {
      return (
        <Card className='image-card h-100'>
          <CardBody className='d-flex flex-column' >
            <List animate />
          </CardBody>
        </Card >
      )
    }
  }
}

ImageCard.defaultProps = {
  imgUrl: 'http://www.placehold.it/350x350',
  imgName: 'Placeholder name'
}