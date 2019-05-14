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
              <h1>About</h1>
              <p> The text for this section is still in progress and will be updated soon. </p>

              <h1 className='mt-4'>FAQ</h1>
              <p>Coming Soon</p>
              <h1 className='mt-4'>What browsers are supported on this website/app?</h1>
              <p>As of the time of writing, we support the following browsers and versions:</p>
              <ul>
                <li>Chrome &ge; 55</li>
                <li>Edge &ge; 14</li>
                <li>Firefox &ge; 50</li>
                <li>Opera &ge; 29</li>
                <li>Safari &ge; 10</li>
              </ul>
              <p>We do not support Internet Explorer. Please let it rest in peace.</p>

            </Col>
            <Col md='6'>
              <img alt='Human Islets' className='img-fluid' src='https://dev8-labnodes.app.vanderbilt.edu/assets/handelp/media/projects/human-islets-healthy.jpg' />
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}
