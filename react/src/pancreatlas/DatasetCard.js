import React from 'react'
import {
  Card,
  CardImg,
  CardBody,
  Row,
  Col,
  Button
} from 'reactstrap'

export default class DatasetCard extends React.Component {
  render () {
    const images = require.context('../assets/', true)
    console.log(this.props.funding)
    let sponsors = this.props.funding !== undefined ? this.props.funding.split(',').map(source => images(`./${source}.jpg`)) : []

    return (
      <Card className='h-100'>
        <CardImg src='http://placehold.it/100x50' alt='placeholder' />
        <CardBody>
          <Row>
            <Col md='12'>
              <strong>{this.props.title}</strong>
            </Col>
          </Row>
          <Row className='ds-alt'>
            <Col md='12' className='my-auto'>
              {this.props.description}
            </Col>
          </Row>
          <Row>
            {sponsors.map(item =>
              <Col md='6'>
                <img className='dataset-funder' src={item} alt={item} />
              </Col>
            )}
          </Row>
          <Row>
            <Button color='primary'>View Dataset</Button>
          </Row>
        </CardBody>
      </Card>
    )
  }
}
