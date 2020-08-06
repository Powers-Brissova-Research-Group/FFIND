import React from 'react'
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText
} from 'reactstrap'

export default class Banner extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalOpen: false
    }
  }

  render() {
    return (
      <div>
        <Container className='banner-container'>
          <Row>
            <Col xs={12}>
              <div className='ffind-banner'>
                <h1 className="display-3 ffind-banner">{this.props.title}</h1>
                <p className='lead'>{this.props.subtitle}</p>
                <hr className="my-2" />
                <p>{this.props.description}</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}
