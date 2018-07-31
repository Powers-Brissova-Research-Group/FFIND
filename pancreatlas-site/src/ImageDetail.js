import React from 'react'

import {
  Container,
  Row,
  Col,
  Table
} from 'reactstrap'

export default class ImageDetail extends React.Component {
  render() {
    return (
      <div className='image-detail'>
        <Container>
          <Row>
            <Col md="8">
              <img src={this.props.img_url} alt="" />
            </Col>
            <Col md="4">
              <h3>Image Details</h3>
              <Table>
                <tbody>
                  {Object.keys(this.props.img_data).map(key => (
                    <tr><td>{key}</td><td>{this.props.img_data[key]}</td></tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

ImageDetail.defaultProps = {
  img_url: 'http://www.placehold.it/700x1000',
  img_data: {
    a: 'one',
    b: 'two',
    c: 'three'
  }
}