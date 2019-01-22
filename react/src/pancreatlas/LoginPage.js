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
  Button,
  Progress
} from 'reactstrap'

export default class LoginPage extends React.Component {
  constructor (props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.submit = this.submit.bind(this)

    this.emailRe = /\w+(\.\w+)*@\w+(\.\w+)*\.edu/

    this.state = {
      username: '',
      email: '',
      emailValid: false,
      emailConf: '',
      emailsMatch: false,
      password: '',
      passwordConf: '',
      passMatch: false,
      strengthColor: 'danger',
      passStrength: 0,
      passMessage: '',
      passFeedback: ''
    }
  }

  handleChange (event) {
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
        let zxcvbn = require('zxcvbn')
        let passStrengthInfo = zxcvbn(event.target.value)
        let color = 'danger'
        let message = 'Very weak password'
        switch (passStrengthInfo.score) {
          case 1:
            color = 'warning'
            message = 'Weak password'
            break
          case 2:
            color = 'info'
            message = 'Average password'
            break
          case 3:
            color = 'primary'
            message = 'Strong password'
            break
          case 4:
            color = 'success'
            message = 'Very strong password'
            break
          default:
            color = 'danger'
            message = 'Very weak password'
            break
        }
        this.setState({
          password: event.target.value,
          passStrength: passStrengthInfo.score,
          passMessage: message,
          strengthColor: color,
          passFeedback: `${passStrengthInfo.feedback.warning} \n ${passStrengthInfo.feedback.suggestions.join(` `)}`
        })
        break
      case 'acctPassConf':
        this.setState({
          passwordConf: event.target.value,
          passMatch: this.state.password === event.target.value
        })
        break
      case 'acctUsername':
        this.setState({
          username: event.target.value
        })
    }
  }

  submit (event) {
    let data = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    }

    console.log(data)
    window.fetch(`${process.env.REACT_APP_API_URL}/user/`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(response => console.log('Form Submitted', JSON.stringify(response)))
      .catch(error => console.error('Error', error))
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
                <Label for='acctUsername'>Username</Label>
                <Input id='acctUsername' onChange={this.handleChange} value={this.state.username} type='text' />
              </FormGroup>
              <FormGroup>
                <Label for='acctEmail'>Email</Label>
                <Input valid={this.state.emailValid} invalid={!this.state.emailValid} id='acctEmail' onChange={this.handleChange} value={this.state.email} type='email' />
                <FormFeedback invalid>Please use a valid email address</FormFeedback>
                <FormText>You must register with a valid educational email address (ex. john.doe@university.edu)</FormText>
              </FormGroup>
              <FormGroup>
                <Label for='acctEmailConf'>Confirm Email</Label>
                <Input valid={this.state.emailsMatch} invalid={!this.state.emailsMatch} id='acctEmailConf' onChange={this.handleChange} value={this.state.emailConf} type='email' />
                <FormFeedback invalid>Please make sure both emails match</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for='acctPass'>Password</Label>
                <Input id='acctPass' onChange={this.handleChange} value={this.state.password} type='password' />
                <FormText>Please choose a strong password consisting of both alphanumeric and special characters</FormText>
                <Progress color={this.state.strengthColor} value={20 * (1 + this.state.passStrength)}>{this.state.passMessage}</Progress>
                <span className='display-linebreak'><strong>Password Feedback:</strong> {this.state.passFeedback}</span>
              </FormGroup>
              <FormGroup>
                <Label for='acctPassConf'>Confirm Password</Label>
                <Input valid={this.state.passMatch} invalid={!this.state.passMatch} id='acctPassConf' onChange={this.handleChange} value={this.state.passwordConf} type='password' />
                <FormFeedback invalid>The two passwords do not match</FormFeedback>
              </FormGroup>
              <Button color='success' disabled={!this.state.emailValid || !this.state.emailsMatch || !this.state.passMatch} onClick={this.submit}>Create Account</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    )
  }
}
