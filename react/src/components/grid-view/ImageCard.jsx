import React from 'react'

import PropTypes from 'prop-types'

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

/**
 * A single card containing a thumbnail image and some basic metadata
 * @author Jimmy Messmer
 * @component
 */
class ImageCard extends React.Component {
  constructor (props) {
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
    var mockImages = require(`../../assets/txt/ffind-defaults/all-images.json`)
    let result = mockImages[this.props.iid]
    let kvals = result.kvals
    let tagVals = result.tags.map(tag => tag.tag)
    this.setState({
      loaded: true,
      imgUrl: '/' + result.iname,
      imgName: result.iname,
      omeroId: result.iid,
      imgTags: tagVals,
      imgKvals: kvals
    })
  }

  /**
   * Basic method to toggle whether or not tooltips are showing.
   */
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
            <CardImg className='image-card-thumb' top width='100%' src={`//www.placehold.it/350x350/000000/222222?Text=350x350`} alt={this.state.imgName} />
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
  imgUrl: '//www.placehold.it/350x350/000000/222222/?Text=350x350',
  imgName: 'Placeholder name'
}

export default ImageCard
