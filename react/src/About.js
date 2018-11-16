import React from 'react'
import {
  Container,
  Row,
  Col
} from 'reactstrap'

import MetaTags from 'react-meta-tags'

export default class About extends React.Component {
  render () {
    return (
      <div className='about'>
        <MetaTags>
          <title>About the Project -- Pancreatlas / HANDEL-P</title>
          <meta name='description' content='What is the HANDEL-P project?' />
        </MetaTags>
        {/* <Header heading="About" /> */}
        <Container className='v-padded'>
          <Row>
            <Col md='6'>
              <h5><span>stuff stuff stuff</span></h5>
              <h1>About</h1>
              <p> Human and rodent islets differ substantially in architecture, cell composition, proliferative capacity, etc. While much of our current knowledge is based on decades of rodent studies, new efforts are needed to study human pancreas and isolated islets, such as CHIPS and the NIDDK-supported Human Islet Research Network (HIRN). </p>

              <h2>FAQ</h2>

              <h3>What browsers are supported on this website/app?</h3>
              <p>As of the time of writing, we support the following browsers and versions:</p>
              <ul>
                <li>Chrome >= 55</li>
                <li>Edge >= 14</li>
                <li>Firefox >= 50</li>
                <li>Opera >= 29</li>
                <li>Safari >= 10</li>
              </ul>
              <p>We do not support Internet Explorer. Please let it rest in peace.</p>


            </Col>
            <Col md='6'>
              <img alt='Human Islets' className='img-responsive' src='https://dev8-labnodes.app.vanderbilt.edu/assets/handelp/media/projects/human-islets-healthy.jpg' />
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}
