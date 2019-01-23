import React from 'react'

import {
  Container,
  Row,
  Col
} from 'reactstrap'

import CreateAccountForm from './CreateAccountForm'
import LoginAccountFrom from './LoginAccountForm'

export default class LoginPage extends React.Component {
  render () {
    return (
      <Container>
        <Row>
          <h1>Access your pancreatlas account</h1>
          <Col md='6'>
            <CreateAccountForm />
          </Col>
          <Col md='6'>
            <LoginAccountFrom />
          </Col>
        </Row>
      </Container>
    )
  }
}
