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
          <CardTitle className='center-row collaborator-title'><h4>{this.props.name}</h4></CardTitle>
          <CardSubtitle className='center-row'>{this.props.institution}</CardSubtitle>
          <CardText className='mt-2'>{this.props.children}</CardText>
        </CardBody>
        <CardFooter className='d-flex justify-content-end'>
          <a className='ml-4' href={this.props.site}><FontAwesomeIcon size='1x' icon='link' /></a>
          <a className='ml-4' href={this.props.email}><FontAwesomeIcon size='1x' icon='envelope' /></a>
          <a className='ml-4' href={this.props.phone}><FontAwesomeIcon size='1x' icon='phone' /></a>
        </CardFooter>
      </Card>
    )
  }
}

TeamMember.defaultProps = {
  imgSrc: '//placehold.it/350x237'
}
