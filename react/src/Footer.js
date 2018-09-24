import React from 'react';
import {
  Container,
  Row,
  Col
} from 'reactstrap';

export default class Footer extends React.Component {
  render() {
    return (
      <div className='footer'>
        <Container fluid className='footer-container'>
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
                    <h2>Useful Links</h2>
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
                <h2>Contact</h2>
                <p>Office: Division of Diabetes, Endocrinology, and Metabolism<br />
                  Vanderbilt University School of Medicine<br />
                  8435F Medical Research Bldg IV<br />
                  2215 Garland Avenue<br />
                  Nashville, TN 37232-0475<br />
                  Phone: (615) 936-7678<br />
                  Fax: (615) 936-0063<br />
                  E-Mail: contact-chips@vanderbilt.edu<br />
                  Web: www.TBD.org</p>
              </Col>
            </Row>
          </Container>
        </Container>
      </div>
    );
  }
}