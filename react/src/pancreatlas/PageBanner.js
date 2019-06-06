import React from 'react'
import {
  Container,
  Row,
  Col
} from 'reactstrap'

export default class PageBanner extends React.Component {
  render () {
    if (this.props.image) {
      return (
        <Container fluid style={{ backgroundImage: `url(${this.props.bgImg})` }} className='banner-background'>
          <Container>
            <div className='parallax-filler' style={{ height: this.props.height }}>
              <Row className='h-100'>
                <Col md='12' className='d-flex align-items-center'>
                  <div className='dataset-title align-middle'>
                    {/* <h1>Explore the pancreatlas</h1> */}
                    {this.props.children}
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
        </Container>
      )
    } else {
      return (
        <Container fluid style={{ background: this.props.bgColor }} className='banner-background'>
          <Container>
            <div className='parallax-filler' style={{ height: this.props.height }}>
              <Row className='h-100'>
                <Col md='12' className='d-flex align-items-center'>
                  <div className='dataset-title align-middle'>
                    {/* <h1>Explore the pancreatlas</h1> */}
                    {this.props.children}
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
        </Container>
      )
    }
  }
}

PageBanner.defaultProps = {
  height: '45vh',
  bgColor: '#000000',
  bgImg: '../assets/header1.jpg'
}
