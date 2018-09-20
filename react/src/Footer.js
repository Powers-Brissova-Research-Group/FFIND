import React from 'react'
import {
  Container,
  Row,
  Col
} from 'reactstrap'

import { Link } from 'react-router-dom'

import HelmsleyLogo from './assets/logos/helmsley-logo.jpg'

export default class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <Container fluid>
          <Container>
            <Row>
              <Col md="6">
                <p>For more information on our data, please visit our <Link to={'/nomenclature'}>nomenclature page</Link></p>
                <p>This project is made possible through the generous support of the Leona M. and Harry B. Helmsley Charitable Trust</p>
                <img className="img-fluid footer-img" src={HelmsleyLogo} alt="Helmsley Logo" />
                <p>Made with &hearts; in the Vanderbilt University Medical Center</p>
              </Col>
              <Col md="6">
                <h3>Get in touch</h3>
                  <p>Email us <a href="mailto:powers.research@vanderbilt.edu">here</a></p>
                  <p>Call us at 615.936.7678</p>
                  <p>Vanderbilt Unviersity Medical Center<br></br>2213 Garland Avenue<br></br>8425 Medical Research Building IV<br></br>Nashville, TN<br></br>37232-0475</p>
              </Col>
            </Row>
          </Container>
        </Container>
      </div>
    )
  }
}