import React from 'react'
import {
  Container,
  Row,
  Col
} from 'reactstrap'

import { Link } from 'react-router-dom'

import Feature from "../Feature";

export default class PancreatlasFooter extends React.Component {
  render() {
    return (
      <footer className="footer">
        {/* Upper area */}
        <Container fluid>
          <Container>
            <Row className='v-padded'>
              <Col md="6">
                <h3>About Us</h3>
                <p>Our investigators are studying how the human pancreas and islets change in the first decade of life. This website, an atlas of our results, seeks to make this new information available to scientists to accelerate research throughout the world with the goal of understanding of the events in the pancreas and islet that trigger type 1 diabetes.</p>
                <p>Supported by the <b><a href='http://www.helmsleytrust.org'>Helmsley Charitable Trust</a></b>, <a href='http://www.hirnetwork.org'>HIRN</a>, <a href='http://www.iiam.org'>IIAM</a>, <a href='https://iidp.coh.org'>IIDP</a>, <a href='http://www.jdrf.org'>JDRF</a>, <a href='http://www.ndri.org'>NDRI</a>, <a href='https://www.nih.gov'>NIH</a>, <a href='https://www.jdrfnpod.org'>nPOD</a>, <a href='http://www.research.va.gov'>VA research service</a>, and both institutional funds and space from <a href='https://www.mc.vanderbilt.edu'>VUMC</a></p>
              </Col>

                  <Col md="3">
                    <Row>
                      <Col md="12">
                        <h2>Labs &amp; Info</h2>
                        <p>For more information on our data, please visit our <Link to={'/pancreatlas/nomenclature'}>nomenclature page</Link>.</p>
                      </Col>
                      <Col md="6">
                        <p><a href='http://pathology.ufl.edu/faculty/experimental-pathology/mark-a-atkinson/'> Atkinson Lab</a></p>
                        <p><a href='https://labnodes.vanderbilt.edu/member/profile/id/10427'>Brissova Lab</a></p>
                        <p><a href='http://seungkimlab.stanford.edu/'>Kim Lab</a></p>
                        <p><a href='https://medschool.vanderbilt.edu/wright-lab/'>Wright Lab</a></p>
                      </Col>
                      <Col md="6">
                        <p><a href="https://www.ahn.org/research/our-research-institutes/cellular-therapeutics/our-team"> Bottino Lab</a></p>
                        <p><a href='https://faculty.mc.vanderbilt.edu/Faculty/Details/34956'>Dai Lab</a></p>
                        <p><a href='https://www.powersresearch.org/'>Powers Lab</a></p>
                      </Col>
                    </Row>
                  </Col>

              <Col md="3">
                <h3 className='get-in-touch'>Get in touch</h3>
                <p>
                  Vanderbilt University School of Medicine<br />
                  8435F Medical Research Bldg IV<br />
                  2215 Garland Avenue<br />
                  Nashville, TN 37232-0475<br />
                  Phone: (615) 936-7678<br />
                  E-Mail: <a href="mailto:powers.research@vanderbilt.edu">powers-research@vanderbilt.edu</a></p>
              </Col>
            </Row>
          </Container>
        </Container>

        {/* Lower area */}

        <footer className="footer footer-lower">
          <Container fluid>
            <Container>
              <Row className='v-padded'>
                <Col md="6">
                  <p>Developed and managed by Jimmy Messmer (<a href="https://www.powersresearch.org">Powers Laboratory</a>) and JP Cartailler (<a href="https://labnodes.vanderbilt.edu/cds">Creative Data Solutions</a>)</p>
                  <p>&copy; 2016-2018 Vanderbilt University Medical Center <span> | </span> All Rights Reserved</p>
                </Col>

                <Col md="6">
                  <a id="scroll-top-div" href="#" className="float-right"><Feature icon="hand-pointer" /></a>

                </Col>

              </Row>
            </Container>
          </Container>
        </footer>

      </footer>
    )
  }
}