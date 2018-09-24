import React from 'react';
import {
  Container,
  Row
} from 'reactstrap'

export default class Header extends React.Component {
  render() {
    if (this.props.subheading === undefined) {
      return (
        <Container fluid className='header-container'>
          <Container>
            <Row className='header-row'>
              <h1 className='header-heading'>{this.props.heading}</h1>
            </Row>
          </Container>
        </Container>
      );
    } else {
      return (
        <Container fluid className='header-container'>
          <Container>
            <Row className='header-row'>
              <h1 className='header-heading'>{this.props.heading}</h1>
              <h4 className='header-subheading'>{this.props.subheading}</h4>
            </Row>
          </Container>
        </Container>
      );
    }
  }
}