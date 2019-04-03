import React from 'react'
import {
  Card,
  CardImg,
  CardBody,
  CardText,
  CardFooter,
  Row,
  Col,
  Button
} from 'reactstrap'

import {
  Link
} from 'react-router-dom'


export default class DatasetCard extends React.Component {
  render() {
    const images = require.context('../assets/', true)
    console.log(this.props.funding)
    let sponsors = this.props.funding !== undefined ? this.props.funding.split(',').map(source => images(`./${source}.jpg`)) : []
    let logo = 'http://www.placehold.it/326x116'
    try {
      logo = images(`./pancreatlas/logos/${this.props.title.toLowerCase().replace(/ /g, '-')}.png`)
    } catch (e) {
      console.log('Cannot find logo')
    }
    return (
      <Card className='h-100'>
        <CardImg className='ds-logo' src={logo} alt='placeholder' />
        <CardBody className='text-left'>
          <CardText><strong>{this.props.title}</strong></CardText>
          <div className='ds-alt'><CardText>{this.props.description}</CardText></div>
          <div className='dataset-card-sponsors'>
            {sponsors.map(item =>
              <Col md='6'>
                <img className='dataset-funder' src={item} alt={item} />
              </Col>
            )}
          </div>
        </CardBody>
        <CardFooter>
          <Row>
            <Col md='6'>
              <Link to={`/pancreatlas/dataset/${this.props.did}/overview`}>
                <Button color='primary'>View Dataset</Button>
              </Link>
            </Col>
          </Row>
        </CardFooter>
      </Card>
    )
  }
}
