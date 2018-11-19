import React from 'react'
import {
  Container,
  Row,
  Col
} from 'reactstrap'

export default class Releases extends React.Component {
  render () {
    return (
      <Container>
        <Row>
          <Col md='12'>
            <h1>pancreatlas Release History</h1>
          </Col>
        </Row>
        <Row>
          <Col md='12'>
            <h3>Version 1.0 <span className='secondary'>2018-12-10</span></h3>
          </Col>
        </Row>
        <Row>
          <Col md='12'>
            <h3>Dataset Name <span className='secondary'>Human Pancreas Development</span></h3>
          </Col>
        </Row>
        <Row>
          <Col md='12'>
            <h5>New Features</h5>
          </Col>
        </Row>
        <Row>
          <Col md='12'>
            <ol>
              <li>Created intuitive interface for finding pancreas images</li>
              <li>Built sorting capability to refine images</li>
              <li>Added a pairwise comparison of pancreas images</li>
            </ol>
          </Col>
        </Row>
        <Row>
          <Col md='12'>
            <h5>Improvements</h5>
          </Col>
        </Row>
        <Row>
          <Col md='12'>
            <p className='secondary'>No Improvements</p>
          </Col>
        </Row>
        <Row>
          <Col md='12'>
            <h5>Bug Fixes</h5>
          </Col>
        </Row>
        <Row>
          <Col md='12'>
            <p className='secondary'>No Bug Fixes</p>
          </Col>
        </Row>
      </Container >
    )
  }
}
