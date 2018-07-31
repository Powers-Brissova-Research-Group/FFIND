import React from 'react'
import {
  Row,
  Col,
  Button
} from 'reactstrap'

export default class CollectionRow extends React.Component {
  render() {
    return (
      <div className="collection-row">
        <Row>
          <Col md="3">
            <img src={this.props.img} alt="" />
          </Col>
          <Col md="9">
          <h3>{this.props.title}</h3>
            <p>{this.props.description}</p>
            <Button color="link">View this Collection</Button>
          </Col>
        </Row>
      </div>
    )
  }
}

CollectionRow.defaultProps = {
  img: 'http://www.placehold.it/200x200',
  title: "Collection Title",
  description: " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque laoreet elit nisl, vel fringilla nunc dapibus at. Integer nec metus nisi. Integer eu iaculis nibh. Maecenas condimentum, urna vitae iaculis fringilla, nibh leo vehicula lacus, eu posuere mi lacus quis nulla."
}