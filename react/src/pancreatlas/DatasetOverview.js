import React from 'react'
import {
  Container,
  Row,
  Col
} from 'reactstrap'

export default class DatasetOverview extends React.Component {
  render () {
    return (
      <Container>
        <Row>
          <Col md='12'>
            <h1>Explore Dataset</h1>
          </Col>
        </Row>
      </Container>
    )
  }
}
