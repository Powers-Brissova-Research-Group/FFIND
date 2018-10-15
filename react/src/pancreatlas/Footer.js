import React from 'react'
import {
  Container,
  Row,
  Col
} from 'reactstrap'

import { Link } from 'react-router-dom'

import HelmsleyLogo from '../assets/pancreatlas/logos/helmsley-logo.jpg'

export default class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <Container fluid>
          <Container>
            <Row>
              <Col md="6">
                <p>For more information on our data, please visit our <Link to={'/pancreatlas/nomenclature'}>nomenclature page</Link></p>
                <p>This project is made possible with the generous support of:</p>
                <img className="img-fluid footer-img" src={HelmsleyLogo} alt="Helmsley Logo" />
                <p>Site design: Vanderbilt University Medical Center</p>
              </Col>
              <Col md="6">
                <h3 className='get-in-touch'>Get in touch</h3>
                <p>Email us <a href="mailto:powers.research@vanderbilt.edu">here</a></p>
                <p>Vanderbilt University Medical Center<br></br>2213 Garland Avenue<br></br>8425 Medical Research Building IV<br></br>Nashville, TN 37232-0475</p>
                <p>Tel: 615.936.7678</p>
              </Col>
            </Row>
          </Container>
        </Container>
      </footer>
    )
  }
}