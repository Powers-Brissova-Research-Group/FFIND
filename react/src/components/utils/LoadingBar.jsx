import React from 'react'
import {
  Container,
  Progress,
  Row,
  Col
} from 'reactstrap'

export default class LoadingBar extends React.Component {
  render () {
    return (
      <Container style={{ minHeight: '100vh' }} className='loading v-padded'>
        <Row>
          <Col md='12'>
            <h4>Loading {this.props.loadingInfo}</h4>
            <Progress animated color='success' value='100' />
          </Col>
        </Row>
      </Container>
    )
  }
}

LoadingBar.defaultProps = {
  loadingInfo: ''
}
