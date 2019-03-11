import React from 'react'
import {
  Card,
  CardImg,
  CardBody,
  Button,
  Row,
  Col
} from 'reactstrap'

import {
  FontAwesomeIcon
} from '@fortawesome/react-fontawesome'

import Error from './Error'
import MarkerTag from './MarkerTag'

export default class ImageCard extends React.Component {
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

  componentDidMount () {
    // Load information about the image
    window.fetch(`${process.env.REACT_APP_API_URL}/images/${this.props.iid}`, {
      headers: {
        'Authorization': process.env.REACT_APP_API_AUTH
      }
    })
      .then(res => res.json())
      .then(result => {
        let kvals = result.kvals
        if (Object.keys(kvals).length > 0) {
          let markerRe = /(^Stain info)(\s+-\s+)([a-zA-Z0-9]+$)/i
          let donorRe = /(^Donor info)(\s+-\s+)(.+$)/i
          let regionRe = /(^Image info)(\s+-\s+)(Section Plane$|Pancreas Region$)/
          let markerColors = result.channel_info

          let markerColorRe = /^.+\((.+)\)$/
          Object.keys(markerColors).forEach(function (key) {
            var newKey = markerColorRe.test(key) ? markerColorRe.exec(key)[1] : key
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
            kvals[key].val.split(',').filter(val => val !== '').map(val => (markers[val.trim()] = markerRe.exec(key)[3]))
          }
          for (let key of donorKeys) {
            if (kvals[key].val !== '' && kvals[key].val !== undefined) {
              let valKey = donorRe.exec(key)[3]
              if (valKey !== 'UNOS ID' && valKey !== 'LIMS ID' && kvals[key] !== '') {
                if (valKey === 'Age') {
                  let ageRe = /^(G?)(\d+)(.\d)?(d|w|mo|y)(\+\dd)?$/
                  donor[donorRe.exec(key)[3]] = result.tags.filter(tag => ageRe.test(tag))[0]
                } else {
                  donor[donorRe.exec(key)[3]] = kvals[key].val
                }
              }
            }
          }

          this.setState({
            loaded: true,
            imgUrl: '/' + result.iname, // https://omero.app.vumc.org/webgateway/render_image_region/' + this.props.iid + '/0/0/?c=1|0:65535$0000FF,2|0:65535$00FF00,3|0:65535$FF0000,4|0:65535$FFFF00&m=c&format=jpeg&region=0,0,300,300',
            imgName: result.iname,
            omeroId: result.iid,
            imgTags: result.tags.filter(tag => markers[tag] === undefined && Object.values(donor).indexOf(tag) === -1 && Object.values(region).indexOf(tag) === -1),
            markers: markers,
            donor: donor,
            region: region,
            markerColors: (markerColors !== undefined) ? markerColors : {}
          })
        } else {
          this.setState({
            loaded: true,
            imgUrl: '/' + result.iname, // https://omero.app.vumc.org/webgateway/render_image_region/' + this.props.iid + '/0/0/?c=1|0:65535$0000FF,2|0:65535$00FF00,3|0:65535$FF0000,4|0:65535$FFFF00&m=c&format=jpeg&region=0,0,300,300',
            imgName: result.iname,
            omeroId: result.iid,
            imgTags: [],
            markers: { 'DEFAULT VAL': 'DEFAULT VAL' },
            donor: { 'Donor': 'DEFAULT VAL' },
            region: { 'Region': 'DEFAULT VAL' }
          })
        }
      }).catch(err => {
        this.setState({
          loaded: false,
          error: err
        })
      })
  }

  toggleTooltip () {
    this.setState({
      ttOpen: !this.state.ttOpen
    })
  }

  render () {
    if (this.state.loaded) {
      let lastMarker = Object.keys(this.state.markers)[Object.keys(this.state.markers).length - 1]
      return (
        <Card className='image-card h-100'>
          <div className='card-img-wrapper' onClick={() => this.props.callback(this.props.iid)}>
            <CardImg className='image-card-thumb' top width='100%' src={require(`../assets/pancreatlas/thumbs/${this.props.iid}.jpg`)} alt={this.state.imgName} />
            <FontAwesomeIcon icon='search-plus' size='3x' className='card-search-plus' />
          </div>
          <CardBody className='d-flex flex-column'>
            {/* <CardTitle>{this.state.imgName}</CardTitle>
            <CardSubtitle>{this.state.omeroId}</CardSubtitle> */}
            {Object.keys(this.state.donor).map(key => (
              <div key={this.props.iid + key}><strong>{key}: </strong>{this.state.donor[key]}</div>
            ))}
            {/* onClick={() => this.props.filterCallback(marker)} */}
            <div><strong>Markers:</strong></div>
            <div className='marker-list'>
              {Object.keys(this.state.markers).slice(0, Object.keys(this.state.markers).length - 1).map(marker => (
                <MarkerTag filterCallback={this.props.filterCallback} marker={marker} iid={this.props.iid} color={this.state.markerColors[this.state.markers[marker].toUpperCase()]} />
                // <span className='tag' key={this.props.iid + marker}> <span id={`${marker}-${this.props.iid}`} onClick={() => this.props.filterCallback(marker)} className='tag marker' style={{color: (tinycolor(this.state.markerColors[this.state.markers[marker].toUpperCase()]).isLight()) ? '#000000' : '#FFFFFF', backgroundColor: `#${this.state.markerColors[this.state.markers[marker].toUpperCase()]}`}}>{marker}</span><Tooltip placement="right" isOpen={this.state.ttOpen} target={`${marker}-${this.props.iid}`} toggle={this.toggle}>The filters work as an AND function between groups and an OR within them. Example: (Childhood) AND (F OR M)</Tooltip></span>
              ))}
              {(Object.keys(this.state.markers).length > 0 && Object.keys(this.state.markers)[0] !== 'DEFAULT VAL') ? (
                <MarkerTag filterCallback={this.props.filterCallback} marker={lastMarker} iid={this.props.iid} color={this.state.markerColors[this.state.markers[lastMarker].toUpperCase()]} />
              ) : null}
              {/* // <span className={'tag'} key={this.props.iid + last_marker}> <span onClick={() => this.props.filterCallback(last_marker)} title="Filter result by this marker" className={'marker'} style={{color: (tinycolor(this.state.markerColors[this.state.markers[last_marker].toUpperCase()]).isLight()) ? '#000000' : '#FFFFFF', backgroundColor: `#${this.state.markerColors[this.state.markers[last_marker].toUpperCase()]}`}}> {last_marker}</span></span>) : null} */}
            </div>
            <div className='region-info'>
              <strong>Region: </strong>{Object.values(this.state.region).join(', ')}
            </div>
            <div><strong>Other Tags: </strong>

              {this.state.imgTags.slice(0, this.state.imgTags.length - 1).map(item => (
                <span className='tag' key={this.props.iid + item}><span>{' ' + item}</span><span>, </span></span>
              ))}
              <span className='tag' key={this.props.iid + this.state.imgTags[this.state.imgTags.length - 1]}> {this.state.imgTags[this.state.imgTags.length - 1]}</span>
            </div>
            <Row>
              <Col md='6'>
                <Button color='primary' className='mt-auto' onClick={() => this.props.callback(this.props.iid)}>Preview</Button>
              </Col>
              <Col md='6'>
                {this.props.isFavorite && <Button color='success' className='favorite' onClick={() => this.props.favoriteCallback(this.props.iid)}>Save</Button>}
                {!this.props.isFavorite && <Button color='danger' className='favorite' onClick={() => this.props.favoriteCallback(this.props.iid)}>Remove</Button>}
              </Col>
            </Row>
            {/* <a href={this.props.path_path} target="_blank"><Button color="link" className="mt-auto">View More Info</Button></a> */}
          </CardBody>
        </Card>
      )
    } else if (this.state.error !== undefined) {
      return <Error error_desc={this.state.error.message} />
    } else {
      return null
    }
  }
}

ImageCard.defaultProps = {
  imgUrl: 'http://www.placehold.it/350x350',
  imgName: 'Placeholder name'
}
