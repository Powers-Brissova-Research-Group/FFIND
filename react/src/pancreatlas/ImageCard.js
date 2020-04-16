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

import Error from './Error'
import MarkerTag from './MarkerTag'

import axios from 'axios'

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
    axios.get(`${process.env.REACT_APP_API_URL}/images/${this.props.iid}`, {
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Authorization': process.env.REACT_APP_API_AUTH
      }
    }).then(response => {
      let result = response.data
      let kvals = result.kvals
      if (Object.keys(kvals).length > 0) {
        let markerRe = /(^Stain info)(\s+-\s+)([a-zA-Z0-9 \t-]+)(?<!-Ab)$/i
        let donorRe = /(^Donor info)(\s+-\s+)(.+$)/i
        let regionRe = /(^Image info|Sample info)(\s+-\s+)(Section Plane$|Pancreas Region$)/
        let markerColors = result.channel_info

        let markerColorRe = /^(.+)\((.+)\)$/
        Object.keys(markerColors).forEach(function (key) {
          var newKey = markerColorRe.test(key) ? markerColorRe.exec(key)[1].trim() : key
          if (newKey !== key) {
            markerColors[newKey] = markerColors[key]
            delete markerColors[key]
          }
        })
        let markerKeys = Object.keys(kvals).filter(key => markerRe.test(key))
        let donorKeys = Object.keys(kvals).filter(key => donorRe.test(key))
        let regionKeys = Object.keys(kvals).filter(key => regionRe.test(key))

        donorKeys.sort()
        regionKeys.sort()
        let markers = {}
        let donor = {}
        let region = {
          [regionKeys[1]]: kvals[regionKeys[1]].val,
          [regionKeys[0]]: kvals[regionKeys[0]].val
        }
        for (let key of markerKeys) {
          let m = kvals[key].val.trim()
          if (m !== '') {
            markers[m] = markerRe.exec(key)[3]
          }
          // kvals[key].val.split(',').filter(val => val !== '').map(val => (markers[val.trim()] = markerRe.exec(key)[3]))
        }

        let hasLink = Object.keys(kvals).includes('Program ID link')
        for (let key of donorKeys) {
          if (kvals[key].val !== '' && kvals[key].val !== undefined) {
            let valKey = donorRe.exec(key)[3]
            if (valKey !== 'UNOS ID' && valKey !== 'LIMS ID' && kvals[key] !== '') {
              donor[valKey] = kvals[key].val
            }
          }
        }
        let tagVals = result.tags.map(tag => tag.tag)
        this.setState({

          loaded: true,
          imgUrl: '/' + result.iname, // https://omero.app.vumc.org/webgateway/render_image_region/' + this.props.iid + '/0/0/?c=1|0:65535$0000FF,2|0:65535$00FF00,3|0:65535$FF0000,4|0:65535$FFFF00&m=c&format=jpeg&region=0,0,300,300',
          imgName: result.iname,
          omeroId: result.iid,
          imgTags: tagVals.filter(tag => markers[tag] === undefined && Object.values(donor).indexOf(tag) === -1 && Object.values(region).indexOf(tag) === -1),
          markers: markers,
          donor: donor,
          idLink: hasLink ? kvals['Program ID link'].val : undefined,
          region: region,
          markerColors: (markerColors !== undefined) ? markerColors : {}
        })
      }
    }).catch(err => {
      this.setState({
        loaded: false,
        error: err
      })
    })
  }

  toggleTooltip() {
    this.setState({
      ttOpen: !this.state.ttOpen
    })
  }

  render() {
    if (this.state.loaded) {
      let lastMarker = Object.keys(this.state.markers)[Object.keys(this.state.markers).length - 1]
      return (
        <Card className='image-card h-100'>
          <div className='card-img-wrapper' onClick={() => this.props.callback(this.props.iid)}>
            <CardImg className='image-card-thumb' top width='100%' src={`${process.env.REACT_APP_IMAGE_URL}/${this.props.iid}.jpg`} alt={this.state.imgName} />
            <FontAwesomeIcon icon='search-plus' size='3x' className='card-search-plus' />
          </div>
          <CardBody className='d-flex flex-column'>
            {/* <CardTitle>{this.state.imgName}</CardTitle>
            <CardSubtitle>{this.state.omeroId}</CardSubtitle> */}
            {Object.keys(this.state.donor).map(key => {
              if (key === 'Program ID' && this.state.idLink !== undefined) {
                return <div key={`${this.props.iid}-${key.replace(' ', '_')}`}><strong>{key}: </strong><a href={this.state.idLink}><u>{this.state.donor[key]}</u></a></div>
              } else {
                return <div key={`${this.props.iid}-${key.replace(' ', '_')}`}><strong>{key}: </strong>{this.state.donor[key]}</div>
              }
            })}
            {/* onClick={() => this.props.filterCallback(marker)} */}
            <div><strong>Markers:</strong></div>
            <div className='marker-list'>
              {Object.keys(this.state.markers).slice(0, Object.keys(this.state.markers).length - 1).map(marker => (
                <MarkerTag filterActive={this.props.filterActive} key={`${marker.replace(' ', '_').replace(/[^0-9a-zA-Z\-_]/gi, '')}`} filterCallback={this.props.filterCallback} marker={marker} iid={this.props.iid} color={this.state.markerColors[marker.toUpperCase()]} />
                // <span className='tag' key={this.props.iid + marker}> <span id={`${marker}-${this.props.iid}`} onClick={() => this.props.filterCallback(marker)} className='tag marker' style={{color: (tinycolor(this.state.markerColors[this.state.markers[marker].toUpperCase()]).isLight()) ? '#000000' : '#FFFFFF', backgroundColor: `#${this.state.markerColors[this.state.markers[marker].toUpperCase()]}`}}>{marker}</span><Tooltip placement="right" isOpen={this.state.ttOpen} target={`${marker}-${this.props.iid}`} toggle={this.toggle}>The filters work as an AND function between groups and an OR within them. Example: (Childhood) AND (F OR M)</Tooltip></span>
              ))}
              {(Object.keys(this.state.markers).length > 0 && Object.keys(this.state.markers)[0] !== 'DEFAULT VAL') ? (
                <MarkerTag filterActive={this.props.filterActive} key={`${this.state.markers[lastMarker].replace(' ', '_').replace(/[^0-9a-zA-Z\-_]/gi, '')}`} filterCallback={this.props.filterCallback} marker={lastMarker} iid={this.props.iid} color={this.state.markerColors[lastMarker.toUpperCase()]} />
              ) : null}
              {/* // <span className={'tag'} key={this.props.iid + last_marker}> <span onClick={() => this.props.filterCallback(last_marker)} title="Filter result by this marker" className={'marker'} style={{color: (tinycolor(this.state.markerColors[this.state.markers[last_marker].toUpperCase()]).isLight()) ? '#000000' : '#FFFFFF', backgroundColor: `#${this.state.markerColors[this.state.markers[last_marker].toUpperCase()]}`}}> {last_marker}</span></span>) : null} */}
            </div>
            <div className='region-info'>
              <strong>Region: </strong>{Object.values(this.state.region).join(', ')}
            </div>
            <div><strong>Other Tags: </strong>

              {this.state.imgTags.slice(0, this.state.imgTags.length - 1).map(item => (
                <span className='tag' key={`${this.props.iid}-${item.replace(' ', '_')}`}><span>{' ' + item}</span><span>, </span></span>
              ))}
              <span className='tag' key={this.props.iid + this.state.imgTags[this.state.imgTags.length - 1]}> {this.state.imgTags[this.state.imgTags.length - 1]}</span>
            </div>
            {/* <a href={this.props.path_path} target="_blank"><Button color="link" className="mt-auto">View More Info</Button></a> */}
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
        <CardBody className='d-flex flex-column'>
          <List animate/>
        </CardBody>
      </Card>)
    }
  }
}

ImageCard.defaultProps = {
  imgUrl: 'http://www.placehold.it/350x350',
  imgName: 'Placeholder name'
}
