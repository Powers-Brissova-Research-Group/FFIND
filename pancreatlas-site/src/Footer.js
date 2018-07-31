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
          <Row>
            <Col md="6">
              <h3>Get in touch</h3>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}