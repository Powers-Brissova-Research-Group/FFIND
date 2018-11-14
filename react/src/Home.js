import React from 'react';
import Banner from './Banner';
import {
  Row,
  Col,
  Container,
  Button
} from 'reactstrap';
import Feature from './Feature';

import MapPicture from './assets/map-collaborations6.png';
import Helmsley from './assets/helmsley.jpg';
import VA from './assets/VA.png';
import HIRN from './assets/hirn.jpg';
import IIAM from './assets/IIAM.png';
import IIDP from './assets/IIDP.png';
import VUMC from './assets/VUMC.png';
import NIDDK from './assets/NIDDK.png';


export default class Home extends React.Component {
render() {
    return (
      <div className="home">
        <Banner />
        <Container>
          <Row>
            <div className="head-description v-padded">
              <Row>
                <Col md="12">
                  <h2 className="section-heading">Our Approach</h2>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <h5 className="section-desc">Our investigators are studying how the human pancreas and islets change in the first decade of life. This website, an atlas of our results, seeks to make this new information available to scientists to accelerate research throughout the world with the goal of understanding of the events in the pancreas and islet that trigger type 1 diabetes.</h5>
                </Col>
              </Row>
            </div>
            <Row>
              <Col md="4">
                <Feature icon="gem" heading="Cutting-Edge Techonologies" description="Our team of investigators are applying their cutting-edge technologies to the study of human pancreas and isolated islets." />
              </Col>
              <Col md="4">
                <Feature icon="medkit" heading="Organ Procurement" description="We have established an infrastructure to collect normal and diseased pancreata in such a way that multiple analytical technologies can be utilized to study the same pancreas" />
              </Col>
              <Col md="4">
                <Feature icon="users" heading="New Insight" description="By sharing information with other scientists, we hope to stimulate new collaborations and interactions." />
              </Col>
            </Row>
          </Row>
        </Container>
        <Container fluid className="shaded">
          <Container>
            <Row className="v-padded">
              <Col md="6">
                <h3>Creating new</h3>
                <h1>Connections</h1>
                <p>We are cross-pollinating numerous activities and programs to develop new ideas and endeavors on diabetes research, education and clinical care.</p>
                <p>A major strategy of this effort is to branch out to those with novel ideas and approaches in order to and share knowledge, technologies and developments that can more rapidly help us understand the underpinnings of diabetes in people.</p>
                <Button color="secondary">Learn about our collaborators and their work</Button>
              </Col>
              <Col md="6">
                <img src={MapPicture} alt="Collaborators map" className="img-fill" />
              </Col>
            </Row>
          </Container>
        </Container>
        <Container fluid>
          <div className="support v-padded">
            <Row className="center-row">
              <Col sm="12">
                <h2>Support</h2>
                <p>This project is generously supported by:</p>
              </Col>
            </Row>
            <Row className="center-row">
              <Col sm="12">
                <img src={Helmsley} alt="The Leona M. and Harry B. Helmsley Charitable Trust" />
              </Col>
            </Row>
            <Row className="center-row">
              <Col sm="12">
                <p>We also thank the following</p>
              </Col>
            </Row>
            <Row>
              <Col sm="2">
                <img src={VA} alt="VA" className="img-fill" />
              </Col>
              <Col sm="2">
                <img src={HIRN} alt="HIRN" className="img-fill" />
              </Col>
              <Col sm="2">
                <img src={IIAM} alt="IIAM" className="img-fill" />
              </Col>
              <Col sm="2">
                <img src={IIDP} alt="IIDP" className="img-fill" />
              </Col>
              <Col sm="2">
                <img src={VUMC} alt="VUMC" className="img-fill" />
              </Col>
              <Col sm="2">
                <img src={NIDDK} alt="NIDDK" className="img-fill" />
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    );
  }
}