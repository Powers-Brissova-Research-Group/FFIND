import React from 'react'
import Banner from './Banner'
import {
  Row,
  Col,
  Container
} from 'reactstrap'
import Feature from './Feature'

import MapPicture from './assets/map-collaborations6.png'
import Helmsley from './assets/helmsley.jpg'
import VA from './assets/VA.png'
import HIRN from './assets/hirn.jpg'
import IIAM from './assets/IIAM.png'
import IIDP from './assets/IIDP.png'
import VUMC from './assets/VUMC.png'
import NIDDK from './assets/NIDDK.png'

export default class Home extends React.Component {
  render () {
    return (
      <div className='home'>
        <Banner />
        <Container>
          <Row>
            <div className='head-description v-padded'>
              <Row>
                <Col md='12'>
                  <h2 className='section-heading'>Our Approach</h2>
                </Col>
              </Row>
              <Row>
                <Col md='12'>
                  <h5 className='section-desc'>Our investigators are studying how the human pancreas and islets change in the first decade of life. This website, an atlas of our results, seeks to make this new information available to scientists to accelerate research throughout the world with the goal of understanding of the events in the pancreas and islet that trigger type 1 diabetes.</h5>
                </Col>
              </Row>
            </div>

            <Row>
              <Col md='4'>
                <Feature icon='users' heading='Team Approach' description='Researchers at the University of Florida and Vanderbilt University, in collaboration with organizations around the country' />
              </Col>
              <Col md='4'>
                <Feature icon='vial' heading='Organ Procurement' description='Cross-sectional immunohistochemical analysis of islet cell composition, mass, proliferation, innervation, and function' />
              </Col>
              <Col md='4'>
                <Feature icon='flask' heading='Discoveries' description='Enhance our knowledge of juvenile pancreatic development in an effort to understand the onset and progression of type 1 diabetes' />
              </Col>
            </Row>
          </Row>
        </Container>
        <Container fluid className='shaded'>
          <Container>
            <Row className='v-padded'>
              <Col md='6'>
                <h3>Creating new</h3>
                <h1>Connections</h1>
                <p>We are cross-pollinating numerous activities and programs to develop new ideas and endeavors on diabetes research, education and clinical care.</p>
                <p>A major strategy of this effort is to branch out to those with novel ideas and approaches in order to and share knowledge, technologies and developments that can more rapidly help us understand the underpinnings of diabetes in people.</p>
                <a className='btn btn-dark' href='/collaborators'>Learn about our collaborators and their work</a>
              </Col>
              <Col md='6'>
                <img src={MapPicture} alt='Collaborators map' className='img-fluid' />
              </Col>
            </Row>
          </Container>
        </Container>
        <Container fluid>
          <div className='support v-padded'>
            <Row className='center-row'>
              <Col sm='12'>
                <h2>This project is generously supported by:</h2>
              </Col>
            </Row>
            <Row className='center-row'>
              <Col sm='12'>
                <img className='img-fluid' src={Helmsley} alt='The Leona M. and Harry B. Helmsley Charitable Trust' />
              </Col>
            </Row>
            <Row className='center-row'>
              <Col sm='12'>
                <p>We also thank the following:</p>
              </Col>
            </Row>
            <Row>
              <Col sm='2'>
                <img src={VA} alt='VA' className='img-fluid' />
              </Col>
              <Col sm='2'>
                <img src={HIRN} alt='HIRN' className='img-fluid' />
              </Col>
              <Col sm='2'>
                <img src={IIAM} alt='IIAM' className='img-fluid' />
              </Col>
              <Col sm='2'>
                <img src={IIDP} alt='IIDP' className='img-fluid' />
              </Col>
              <Col sm='2'>
                <img src={VUMC} alt='VUMC' className='img-fluid' />
              </Col>
              <Col sm='2'>
                <img src={NIDDK} alt='NIDDK' className='img-fluid' />
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    )
  }
}
