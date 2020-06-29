import React from 'react'
import {
  Container,
  Row,
  Col,
  Jumbotron,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText
} from 'reactstrap'

import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class Banner extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalOpen: false
    }
  }

  render() {
    return (
      <div>
        <Container className='banner-container'>
          <Row>
            <Col xs={12}>
              <div className='ffind-banner'>
                <h1 className="display-3 ffind-banner">FFIND</h1>
                <p className='lead'>Flexible Framework for Integrating and Navigating Data</p>
                <hr className="my-2" />
                <p>Replace this dummy text with a description relevant for your own uses.</p>
              </div>
            </Col>
          </Row>
          <Row className='mt-3'>
            <Col md={4} sm={12}>
              <Card style={{minHeight: '300px'}}>
                <CardBody>
                  <CardTitle>Collection 1</CardTitle>
                  <CardSubtitle>Catchy catchphrase</CardSubtitle>
                  <CardText>Use this card to showcase the first featured collection in your data.</CardText>
                </CardBody>
              </Card>
            </Col>
            <Col md={4} sm={12}>
              <Card style={{minHeight: '300px'}}>
                <CardBody>
                  <CardTitle>Collection 2</CardTitle>
                  <CardSubtitle>Catchy catchphrase</CardSubtitle>
                  <CardText>Use this card to showcase the first featured collection in your data.</CardText>
                </CardBody>
              </Card>
            </Col>
            <Col md={4} sm={12}>
              <Card style={{minHeight: '300px'}}>
                <CardBody>
                  <CardTitle>Collection 3</CardTitle>
                  <CardSubtitle>Catchy catchphrase</CardSubtitle>
                  <CardText>Use this card to showcase the first featured collection in your data.</CardText>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}
