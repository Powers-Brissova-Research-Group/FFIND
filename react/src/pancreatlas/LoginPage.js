import React from 'react'

import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  FormFeedback,
  Label,
  Input,
  FormText,
  Button
} from 'reactstrap'

export default class LoginPage extends React.Component {
  constructor (props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)

    this.emailRe = /\w+(\.\w+)*@\w+(\.\w+)*\.edu/

    this.state = {
      email: '',
      emailValid: false,
      emailConf: '',
      emailsMatch: false,
      password: '',
      passwordConf: '',
      passMatch: false
    }
  }

  handleChange (event) {
    console.log(event.target.id)
    switch (event.target.id) {
      case 'acctEmail':
        this.setState({
          email: event.target.value,
          emailValid: this.emailRe.test(event.target.value)
        })
        break
      case 'acctEmailConf':
        this.setState({
          emailConf: event.target.value,
          emailsMatch: this.state.email === event.target.value
        })
        break
      case 'acctPass':
        this.setState({
          password: event.target.value
        })
        break
      case 'acctPassConf':
        this.setState({
          passwordConf: event.target.value,
          passMatch: this.state.password === event.target.value
        })
        break
    }
  }

  render () {
    return (
      <Container>
        <Row md='12'>
          <Col>
            <h1>Login or Create an Account</h1>
          </Col>
        </Row>
        <Row>
          <Col md='6'>
            <Form>
              <FormGroup>
                <Label for='acctEmail'>Email</Label>
                <Input valid={this.state.emailValid} invalid={!this.state.emailValid} id='acctEmail' onChange={this.handleChange} value={this.state.email} type='email' />
                <FormFeedback invalid>Please use a valid email address</FormFeedback>
                <FormText>You must register with a valid educational email address (ex. john.doe@university.edu)</FormText>
              </FormGroup>
              <FormGroup>
                <Label for='acctEmailConf'>Email</Label>
                <Input valid={this.state.emailsMatch} invalid={!this.state.emailsMatch} id='acctEmailConf' onChange={this.handleChange} value={this.state.emailConf} type='email' />
                <FormFeedback invalid>Please make sure both emails match</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for='acctPass'>Password</Label>
                <Input id='acctPass' onChange={this.handleChange} value={this.state.password} type='password' />
                <FormText>Please choose a strong password consisting of both alphanumeric and special characters</FormText>
              </FormGroup>
              <FormGroup>
                <Label for='acctPassConf'>Confirm Password</Label>
                <Input valid={this.state.passMatch} invalid={!this.state.passMatch} id='acctPassConf' onChange={this.handleChange} value={this.state.passwordConf} type='password' />
                <FormFeedback invalid>The two passwords do not match</FormFeedback>
              </FormGroup>
              <Button color='success' disabled={!this.state.emailValid || !this.state.emailsMatch || !this.state.passMatch}>Create Account</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    )
  }
}
