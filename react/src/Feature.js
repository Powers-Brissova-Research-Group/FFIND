import React from 'react'
import {
  Container,
  Col,
  Row
} from 'reactstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class Feature extends React.Component {
  render () {
    return (
      <div className='feature'>
        <Container>
          <Row>
            <Col sm='2'>
              <FontAwesomeIcon size='2x' icon={this.props.icon} className='feature-icon' />
            </Col>
            <Col sm='10'>
              <Row className='feature-header-row'><h6>{this.props.heading}</h6></Row>
              <Row className='feature-body-row'><p className='text-larger'>{this.props.description}</p></Row>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

Feature.defaultProps = {
  icon: 'redo'
}
