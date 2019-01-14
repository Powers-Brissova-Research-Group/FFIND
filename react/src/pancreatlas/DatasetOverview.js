import React from 'react'
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button
} from 'reactstrap'

import { Parallax } from 'react-parallax'

export default class DatasetOverview extends React.Component {
  render () {
    return (
      <div className='datasetOverviewWrapper'>
        <Parallax
          blur={0}
          bgImage={require('../assets/parallax-bg.jpg')}
          bgImageAlt='Sample Image'
          strength={800}
          style={{ marginTop: '-1.5rem' }}
        >
          <div className='parallax-filler' style={{ height: '90vh' }}>
            <Container className='h-100'>
              <Row className='h-100'>
                <Col md='6' className='d-flex align-items-center'>
                  <span className='dataset-title'><h1>About &lt;dataset title&gt;</h1></span>
                </Col>
                <Col md='6' className='d-flex align-items-center'>
                  <span className='dataset-title'><h3>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris imperdiet mattis auctor. Morbi sagittis arcu erat, et hendrerit justo tempus iaculis. Nulla finibus erat in lacus congue dapibus ut sed tortor. Donec finibus blandit quam nec molestie. Nam id interdum arcu. Ut ultricies, dolor pharetra venenatis eleifend, sem lectus vestibulum libero, non feugiat sem lacus id eros. </h3></span>
                </Col>
              </Row>
            </Container>
          </div>
        </Parallax>
        <Container>
          <Row style={{ height: '50vh' }}>
            <Col md='12'>
              <Row>
                <Col md='12'>
                  <h1>Explore the Data</h1>
                  <h3>Here are some suggested projections of the data within this set</h3>
                </Col>
              </Row>
              <Row>
                <Col md='4'>
                  <Card>
                    <CardBody>
                      <h3>Browse by Age</h3>
                      <p>Choose a specific age range of donors within which to view samples</p>
                      <Button>Browse</Button>
                    </CardBody>
                  </Card>
                </Col>
                <Col md='4'>
                  <Card>
                    <CardBody>
                      <h3>Browse by Matrix</h3>
                      <p>Create a two-dimensional matrix comparing specified attribute sets to find data matching specific criteria</p>
                      <Button>Browse</Button>
                    </CardBody>
                  </Card>
                </Col>
                <Col md='4'>
                  <Card>
                    <CardBody>
                      <h3>View All Images</h3>
                      <p>Don't restrict the data by any filters and view the entire collection</p>
                      <Button>Browse</Button>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row style={{ height: '50vh' }}>
            <Col md='12'>
              <h1>We thank the following sponsors who made gathering these data possible:</h1>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}
