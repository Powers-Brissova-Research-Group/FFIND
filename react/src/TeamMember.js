import React from 'react'
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardFooter
} from 'reactstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class TeamMember extends React.Component {
  render () {
    return (
      <Card className='h-100'>
        <a href={this.props.site}><CardImg top width='100%' src={this.props.imgSrc} /></a>
        <CardBody className='d-flex flex-column'>
          <CardTitle className='center-row'>{this.props.name}</CardTitle>
          <CardSubtitle className='center-row'>{this.props.institution}</CardSubtitle>
          <CardText className='mt-2'>{this.props.desc}</CardText>
        </CardBody>
        <CardFooter className='d-flex justify-content-around'>
          <a href={this.props.site}><FontAwesomeIcon size='2x' icon='link' /></a>
          <a href={this.props.email}><FontAwesomeIcon size='2x' icon='envelope' /></a>
          <a href={this.props.phone}><FontAwesomeIcon size='2x' icon='phone' /></a>
        </CardFooter>
      </Card>
    )
  }
}

TeamMember.defaultProps = {
  imgSrc: '//placehold.it/350x237'
}
