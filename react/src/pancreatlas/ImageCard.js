import React from 'react'
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  Button
} from 'reactstrap'

import Error from './Error'

export default class ImageCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      img_url: null,
      img_name: null,
      omero_id: null,
      img_tags: null,
      match: true
    }
  }

  componentDidMount() {
    // Load information about the image
    fetch('http://dev7-api-pancreatlas.app.vumc.org:8447/api/images/' + this.props.iid)
      .then(res => res.json())
      .then(result => {
        let kvals = result.kvals;
        let re = /(^Stain info)(\s+-\s+)([a-zA-Z0-9]+$)/i
        let matchingKeys = Object.keys(kvals).filter(key => re.test(key))
        let markers = {}
        for (let key of matchingKeys) {
          if(kvals[key].val !== ''){
            kvals[key].val.split(',').map(val => markers[val.trim()] = re.exec(key)[3])
          }
        }
        this.setState({
          loaded: true,
          img_url: '/' + result.iname, // https://omero.app.vumc.org/webgateway/render_image_region/' + this.props.iid + '/0/0/?c=1|0:65535$0000FF,2|0:65535$00FF00,3|0:65535$FF0000,4|0:65535$FFFF00&m=c&format=jpeg&region=0,0,300,300',
          img_name: result.iname,
          omero_id: result.iid,
          img_tags: result.tags.filter(tag => markers[tag] === undefined),
          markers: markers

        })
          .catch(err => {
            this.setState({
              loaded: false,
              error: err
            })
          })

        console.log(this.state.omero_id)
      });
  }

  render() {
    if (this.state.loaded) {
      let last_marker = Object.keys(this.state.markers)[Object.keys(this.state.markers).length - 1]
      return (
        <Card className="image-card h-100">
          <CardImg className='image-card-thumb' top width="100%" src={require(`../assets/pancreatlas/thumbs/${this.props.iid}.jpg`)} alt={this.state.img_name} onClick={() => this.props.callback(this.props.iid)} />
          <CardBody className="d-flex flex-column">
            {/* <CardTitle>{this.state.img_name}</CardTitle>
            <CardSubtitle>{this.state.omero_id}</CardSubtitle> */}
            <CardText>
              <div><strong>Markers:</strong></div>
              <div className='marker-list'>
                {Object.keys(this.state.markers).slice(0, Object.keys(this.state.markers).length - 1).map(marker => (
                  <span className='tag' key={marker}> <span className={`${this.state.markers[marker]} marker`}>{' ' + marker}</span><span> &bull;</span></span>
                ))}
                <span className={'tag'} key={last_marker}> <span className={`${this.state.markers[last_marker]} marker`}> {last_marker}</span></span>
              </div>
              <div><strong>Tags:</strong></div>
              {this.state.img_tags.slice(0, this.state.img_tags.length - 1).map(item => (
                <span className='tag' key={item}><span>{' ' + item}</span><span> &bull;</span></span>
              ))}
              <span className='tag' key={this.state.img_tags[this.state.img_tags.length - 1]}> {this.state.img_tags[this.state.img_tags.length - 1]}</span>
              <Button color="link" className="mt-auto" onClick={() => this.props.callback(this.props.iid)}>Preview</Button>
              {/* <a href={this.props.path_path} target="_blank"><Button color="link" className="mt-auto">View More Info</Button></a> */}
            </CardText>
          </CardBody>
        </Card>
      );

    } else if (this.state.error !== undefined) {
      return <Error error_desc={this.state.error.message} />
    } else {
      return null
    }

  }
}

ImageCard.defaultProps = {
  img_url: "http://www.placehold.it/350x350",
  img_name: "Placeholder name"
}