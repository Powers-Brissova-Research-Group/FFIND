import React from 'react'
import {
  Container,
  Row,
  Col
} from 'reactstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class PancreatlasFooter extends React.Component {
  constructor (props) {
    super(props)

    this.scrollToTop = this.scrollToTop.bind(this)
  }

  scrollToTop () {
    window.scrollTo(0, 0)
  }

  render () {
    return (
      <footer className='footer'>
        {/* Upper area */}
        <Container fluid>
          <Container>
            <Row className='v-padded'>
              <Col md='6'>
                <h3>About Us</h3>
                <p>Our investigators are studying dynamic changes in the human pancreas and islets from birth to adulthood, in health and disease. Through detailed analysis of donor tissue, we hope to better understand events that trigger type 1 and type 2 diabetes. This website&mdash;an “atlas” of our findings&mdash;is designed to engage scientists worldwide and accelerate the discoveries in diabetes research.</p>
                <p>Supported by <b><a href='http://www.helmsleytrust.org'>The Leona M. and Harry B. Helmsley Charitable Trust</a></b>, <a href='https://www.jdrfnpod.org'>nPOD</a>, <a href='http://www.hirnetwork.org'>HIRN</a>, <a href='http://www.jdrf.org'>JDRF</a>, <a href='http://www.iiam.org'>IIAM</a>, <a href='http://www.ndri.org'>NDRI</a>, <a href='https://iidp.coh.org'>IIDP</a>, <a href='https://www.nih.gov'>NIH</a>, <a href='http://www.research.va.gov'>VA</a>, and <a href='https://www.mc.vanderbilt.edu'>VUMC</a>.</p>
              </Col>

              <Col className='float-right' md='6'>
                <div className='float-right'>
                  <h2 className='get-in-touch'>Get in touch</h2>
                  <p>
                  Vanderbilt University Medical Center<br />
                  8435F Medical Research Bldg IV<br />
                  2215 Garland Avenue<br />
                  Nashville, TN 37232-0475<br />
                  Phone: (615) 936-7678<br />
                  E-mail: <a href='mailto:powers.research@vanderbilt.edu'>powers-research@vanderbilt.edu</a></p>
                </div>
              </Col>
            </Row>
          </Container>
        </Container>

        {/* Lower area */}

        <footer className='footer footer-lower'>
          <Container fluid>
            <Container>
              <Row className='v-padded'>
                <Col md='8'>
                  <p>Developed and managed by Jimmy Messmer (<a href='https://www.powersresearch.org'>Powers Laboratory</a>) and JP Cartailler (<a href='https://labnodes.vanderbilt.edu/cds'>Creative Data Solutions</a>)</p>
                  <p>&copy; 2016-2018 Vanderbilt University Medical Center <span> | </span> All Rights Reserved</p>
                </Col>

                <Col md='4'>
                  <span className='float-right scroll-button'><FontAwesomeIcon icon='hand-pointer' size='2x' id='x' onClick={this.scrollToTop} /></span>
                </Col>

              </Row>
              <Row>
                <Col md='12'>
                  <p className='version-info'>pancreatlas v{`${process.env.REACT_APP_VERSION}`} | rev. {process.env.REACT_APP_GIT_SHA}</p>
                </Col>
              </Row>
            </Container>
          </Container>
        </footer>

      </footer>
    )
  }
}
