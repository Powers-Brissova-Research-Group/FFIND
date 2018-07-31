import React from 'react';
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button
} from 'reactstrap';

export default class CollectionCard extends React.Component{
  render(){
    return (
      <div className="collection-card h-100">
        <Card className="h-100">
          <CardImg top width="100%" src={this.props.img} />
          <CardBody className="d-flex flex-column">
            <CardTitle>{this.props.name} </CardTitle>
            <CardText>{this.props.desc}</CardText>
            <Button className="mt-auto">View Collection</Button>
          </CardBody>
        </Card>
      </div>
    )
  }
}

CollectionCard.defaultProps = {
  img: 'http://www.placehold.it/350x200',
  name: 'Collection Name',
  desc: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consequat tincidunt ante, et faucibus nisi rutrum eget. Vestibulum bibendum justo mi, vel aliquet orci rhoncus vitae.'
}