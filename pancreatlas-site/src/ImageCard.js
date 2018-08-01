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

export default class ImageCard extends React.Component {
  render() {
    return (
      <Card className="image-card h-100">
        <CardImg top width="100%" src={this.props.img_url} alt={this.props.img_name} />
        <CardBody className="d-flex flex-column">
          <CardTitle>{this.props.img_name}</CardTitle>
          <CardSubtitle>{this.props.omero_id}</CardSubtitle>
          <CardText>
            <strong>Image Tags:</strong>
            <ul>
              {this.props.img_tags.map(item => (
                <li>{item}</li>
              ))}
            </ul>
          </CardText>
          <Link to={'/image/' + this.props.omero_id}><Button color="link" className="mt-auto">View More Info</Button></Link>
          {/* <a href={this.props.path_path} target="_blank"><Button color="link" className="mt-auto">View More Info</Button></a> */}
        </CardBody>
      </Card>
    );
  }
}

ImageCard.defaultProps = {
  img_url: "http://www.placehold.it/350x350",
  img_name: "Placeholder name"
}