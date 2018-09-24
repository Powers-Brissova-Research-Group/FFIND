import React from 'react';
import {
  Container,
  Row,
  Col
} from 'reactstrap'

import Header from './Header'

export default class About extends React.Component {
  render() {
    return (
      <div className="about">
        <Header heading="About" />
        <Container className='v-padded'>
          <Row>
            <Col md="6">
              <h5><span>stuff stuff stuff</span></h5>
              <h1>About</h1>
              <p> Human and rodent islets differ substantially in architecture, cell composition, proliferative capacity, etc. While much of our current knowledge is based on decades of rodent studies, new efforts are needed to study human pancreas and isolated islets, such as CHIPS and the NIDDK-supported Human Islet Research Network (HIRN). </p>
            </Col>
            <Col md="6">
              <img alt='Human Islets' className='img-responsive' src="https://dev8-labnodes.app.vanderbilt.edu/assets/handelp/media/projects/human-islets-healthy.jpg" />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}