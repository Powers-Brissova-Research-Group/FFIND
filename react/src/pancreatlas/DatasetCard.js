import React from 'react'
import {
  Card,
  CardImg,
  CardBody,
  CardText,
  Col,
  Button
} from 'reactstrap'

export default class DatasetCard extends React.Component {
  render () {
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
          {sponsors.map(item =>
            <Col md='6'>
              <img className='dataset-funder' src={item} alt={item} />
            </Col>
          )}
          <Button color='primary'>View Dataset</Button>
        </CardBody>
      </Card>
    )
  }
}
