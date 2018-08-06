import React from 'react'
import {
  Container,
  Row,
  Col
} from 'reactstrap'

export default class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <Container fluid>
          <Container>
            <Row>
              <Col md="6">
                <h3>About Us</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consequat tincidunt ante, et faucibus nisi rutrum eget. Vestibulum bibendum justo mi, vel aliquet orci rhoncus vitae.</p>
                <p>Made with &hearts; in the Vanderbilt University Medical Center</p>
              </Col>
              <Col md="6">
                <h3>Get in touch</h3>
                  <p>Email us <a href="mailto:james.messmer@vumc.org">here</a></p>
                  <p>Call us at 123.456.7890</p>
                  <p>Vanderbilt Unviersity Medical Center<br></br>2213 Garland Avenue<br></br>8425 Medical Research Building IV<br></br>Nashville, TN<br></br>37232-0475</p>
              </Col>
            </Row>
          </Container>
        </Container>
      </div>
    )
  }
}