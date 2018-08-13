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
    fetch('http://127.0.0.1:8000/api/images/' + this.props.iid)
      .then(res => res.json())
      .then(result => {
        this.setState({
          loaded: true,
          img_url: 'http://127.0.0.1:8000/' + result.thumbpath,
          img_name: result.iname,
          omero_id: result.iid,
          img_tags: result.tags
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
          <CardImg top width="100%" src={this.state.img_url} alt={this.state.img_name} />
          <CardBody className="d-flex flex-column">
            <CardTitle>{this.state.img_name}</CardTitle>
            <CardSubtitle>{this.state.omero_id}</CardSubtitle>
            <CardText>
              <strong>Image Tags:</strong>
            </CardText>
            <ul>
              {this.state.img_tags.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <Link to={'/image/' + this.state.omero_id} target="_blank"><Button color="link" className="mt-auto">View More Info</Button></Link>
            {/* <a href={this.props.path_path} target="_blank"><Button color="link" className="mt-auto">View More Info</Button></a> */}
          </CardBody>
        </Card>
      );

    } else if(this.state.error !== null){
      return <Error error_desc={this.state.error} />
    } else {
      return null
    }

  }
}

ImageCard.defaultProps = {
  img_url: "http://www.placehold.it/350x350",
  img_name: "Placeholder name"
}