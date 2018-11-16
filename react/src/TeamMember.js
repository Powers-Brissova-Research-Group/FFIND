import React from 'react'
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Col,
  Row
} from 'reactstrap'

import FontAwesome from 'react-fontawesome'

export default class TeamMember extends React.Component {
  render () {
    return (
      <Card className='h-100'>
        <CardImg top width='100%' src={this.props.imgSrc} />
        <CardBody className='d-flex flex-column'>
          <CardSubtitle className='center-row'>{this.props.institution}</CardSubtitle>
          <CardTitle className='center-row'>{this.props.name}</CardTitle>
          <CardText>{this.props.desc}</CardText>
          <Row className='center-row'>
            <Col md='4'>
              <a href={this.props.site}><FontAwesome size='2x' name='link' /></a>
            </Col>
            <Col md='4'>
              <a href={this.props.email}><FontAwesome size='2x' name='envelope' /></a>
            </Col>
            <Col md='4'>
              <a href={this.props.phone}><FontAwesome size='2x' name='phone' /></a>
            </Col>
          </Row>
        </CardBody>
      </Card>
    )
  }
}

TeamMember.defaultProps = {
  imgSrc: '//placehold.it/350x237'
}
