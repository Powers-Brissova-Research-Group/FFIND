import React from 'react'
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from 'reactstrap'

import {
  Link
} from 'react-router-dom'

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
        if (result.iid === 16783){
          console.log('match')
        }
        for (let key of matchingKeys){
          kvals[key].val.split(',').map(val => markers[val.trim()] = re.exec(key)[3])
        }
        this.setState({
          loaded: true,
          img_url: '/' + result.iname, // https://omero.app.vumc.org/webgateway/render_image_region/' + this.props.iid + '/0/0/?c=1|0:65535$0000FF,2|0:65535$00FF00,3|0:65535$FF0000,4|0:65535$FFFF00&m=c&format=jpeg&region=0,0,300,300',
          img_name: result.iname,
          omero_id: result.iid,
          img_tags: result.tags,
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
      return (
        <Card className="image-card h-100">
          <Link to={'/image/' + this.state.omero_id} target="_blank"><CardImg top width="100%" src={require(`${this.props.tpath}`)} alt={this.state.img_name} /></Link>
          <CardBody className="d-flex flex-column">
            <CardTitle>{this.state.img_name}</CardTitle>
            <CardSubtitle>{this.state.omero_id}</CardSubtitle>
            <CardText>
              <strong>Image Tags:</strong>
              &bull;
              {this.state.img_tags.map(item => (
                  <span className='tag' key={item}><span className={this.state.markers[item]}>{' ' + item + ' '}</span><span>&bull;</span></span>
                ))}
              <Link to={'/image/' + this.state.omero_id} target="_blank"><Button color="link" className="mt-auto">View More Info</Button></Link>
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