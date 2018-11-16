import React from 'react'
import {
  Card,
  CardImg,
  CardBody,
  Button
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
      img_url: null,
      img_name: null,
      omero_id: null,
      img_tags: null,
      match: true
    }
  }

  componentDidMount () {
    // Load information about the image
    fetch(`${process.env.REACT_APP_API_URL}/images/${this.props.iid}`)
      .then(res => res.json())
      .then(result => {
        let kvals = result.kvals
        if (Object.keys(kvals).length > 0) {
          let marker_re = /(^Stain info)(\s+-\s+)([a-zA-Z0-9]+$)/i
          let donor_re = /(^Donor info)(\s+-\s+)(.+$)/i
          let region_re = /(^Image info)(\s+-\s+)(Section Plane$|Pancreas Region$)/
          let markerColors = result.channel_info

          let markerColor_re = /^.+\((.+)\)$/
          Object.keys(markerColors).forEach(function (key) {
            var newKey = markerColor_re.test(key) ? markerColor_re.exec(key)[1] : key
            if (newKey !== key) {
              markerColors[newKey] = markerColors[key]
              delete markerColors[key]
            }
          })
          let marker_keys = Object.keys(kvals).filter(key => marker_re.test(key))
          let donor_keys = Object.keys(kvals).filter(key => donor_re.test(key))
          let region_keys = Object.keys(kvals).filter(key => region_re.test(key))

          donor_keys.sort()
          region_keys.sort()
          let markers = {}
          let donor = {}
          let region = {
            [region_keys[1]]: kvals[region_keys[1]].val,
            [region_keys[0]]: kvals[region_keys[0]].val

          }
          for (let key of marker_keys) {
            kvals[key].val.split(',').filter(val => val !== '').map(val => markers[val.trim()] = marker_re.exec(key)[3])
          }
          for (let key of donor_keys) {
            if (kvals[key].val !== '' && kvals[key].val !== undefined) {
              let val_key = donor_re.exec(key)[3]
              if (val_key !== 'UNOS ID' && val_key !== 'LIMS ID' && kvals[key] !== '') {
                if (val_key === 'Age') {
                  let age_re = /^(G?)(\d+)(.\d)?(d|w|mo|y)(\+\dd)?$/
                  donor[donor_re.exec(key)[3]] = result.tags.filter(tag => age_re.test(tag))[0]
                } else {
                  donor[donor_re.exec(key)[3]] = kvals[key].val
                }
              }
            }
          }

          this.setState({
            loaded: true,
            img_url: '/' + result.iname, // https://omero.app.vumc.org/webgateway/render_image_region/' + this.props.iid + '/0/0/?c=1|0:65535$0000FF,2|0:65535$00FF00,3|0:65535$FF0000,4|0:65535$FFFF00&m=c&format=jpeg&region=0,0,300,300',
            img_name: result.iname,
            omero_id: result.iid,
            img_tags: result.tags.filter(tag => markers[tag] === undefined && Object.values(donor).indexOf(tag) === -1 && Object.values(region).indexOf(tag) === -1),
            markers: markers,
            donor: donor,
            region: region,
            markerColors: (markerColors !== undefined) ? markerColors : {}
          })
        } else {
          this.setState({
            loaded: true,
            img_url: '/' + result.iname, // https://omero.app.vumc.org/webgateway/render_image_region/' + this.props.iid + '/0/0/?c=1|0:65535$0000FF,2|0:65535$00FF00,3|0:65535$FF0000,4|0:65535$FFFF00&m=c&format=jpeg&region=0,0,300,300',
            img_name: result.iname,
            omero_id: result.iid,
            img_tags: [],
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
      let last_marker = Object.keys(this.state.markers)[Object.keys(this.state.markers).length - 1]
      return (
        <Card className='image-card h-100'>
          <div className='card-img-wrapper' onClick={() => this.props.callback(this.props.iid)}>
            <CardImg className='image-card-thumb' top width='100%' src={require(`../assets/pancreatlas/thumbs/${this.props.iid}.jpg`)} alt={this.state.img_name} />
            <FontAwesomeIcon icon='search-plus' size='2x' className='card-search-plus' />
          </div>
          <CardBody className='d-flex flex-column'>
            {/* <CardTitle>{this.state.img_name}</CardTitle>
            <CardSubtitle>{this.state.omero_id}</CardSubtitle> */}
            {Object.keys(this.state.donor).map(key => (
                <div key={this.props.iid + key}><strong>{key}: </strong>{this.state.donor[key]}</div>
            ))}
            <div><strong>Markers:</strong></div>
            <div className='marker-list'>
                {Object.keys(this.state.markers).slice(0, Object.keys(this.state.markers).length - 1).map(marker => (
                <MarkerTag filterCallback={this.props.filterCallback} marker={marker} iid={this.props.iid} color={this.state.markerColors[this.state.markers[marker].toUpperCase()]} />
                // <span className='tag' key={this.props.iid + marker}> <span id={`${marker}-${this.props.iid}`} onClick={() => this.props.filterCallback(marker)} className='tag marker' style={{color: (tinycolor(this.state.markerColors[this.state.markers[marker].toUpperCase()]).isLight()) ? '#000000' : '#FFFFFF', backgroundColor: `#${this.state.markerColors[this.state.markers[marker].toUpperCase()]}`}}>{marker}</span><Tooltip placement="right" isOpen={this.state.ttOpen} target={`${marker}-${this.props.iid}`} toggle={this.toggle}>The filters work as an AND function between groups and an OR within them. Example: (Childhood) AND (F OR M)</Tooltip></span>
              ))}
                {(Object.keys(this.state.markers).length > 0 && Object.keys(this.state.markers)[0] !== 'DEFAULT VAL') ? (
                <MarkerTag filterCallback={this.props.filterCallback} marker={last_marker} iid={this.props.iid} color={this.state.markerColors[this.state.markers[last_marker].toUpperCase()]} />
              ) : null}
                {/* // <span className={'tag'} key={this.props.iid + last_marker}> <span onClick={() => this.props.filterCallback(last_marker)} title="Filter result by this marker" className={'marker'} style={{color: (tinycolor(this.state.markerColors[this.state.markers[last_marker].toUpperCase()]).isLight()) ? '#000000' : '#FFFFFF', backgroundColor: `#${this.state.markerColors[this.state.markers[last_marker].toUpperCase()]}`}}> {last_marker}</span></span>) : null} */}
              </div>
            <div className='region-info'>
                <strong>Region: </strong>{Object.values(this.state.region).join(', ')}
              </div>
            <div><strong>Other Tags: </strong>

                {this.state.img_tags.slice(0, this.state.img_tags.length - 1).map(item => (
                <span className='tag' key={this.props.iid + item}><span>{' ' + item}</span><span>, </span></span>
              ))}
                <span className='tag' key={this.props.iid + this.state.img_tags[this.state.img_tags.length - 1]}> {this.state.img_tags[this.state.img_tags.length - 1]}</span>
              </div>
            <Button color='link' className='mt-auto' onClick={() => this.props.callback(this.props.iid)}>Preview</Button>
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
  img_url: 'http://www.placehold.it/350x350',
  img_name: 'Placeholder name'
}
