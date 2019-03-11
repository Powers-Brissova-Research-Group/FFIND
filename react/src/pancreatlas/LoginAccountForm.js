import React from 'react'
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from 'reactstrap'

export default class LoginAccountForm extends React.Component {
  constructor (props) {
    super(props)

    this.handleLoginChange = this.handleLoginChange.bind(this)
    this.login = this.login.bind(this)

    this.state = {
      loginUsername: '',
      loginPassword: ''
    }
  }

  handleLoginChange (event) {
    switch (event.target.id) {
      case 'loginUsername':
        this.setState({
          loginUsername: event.target.value
        })
        break
      case 'loginPassword':
        this.setState({
          loginPassword: event.target.value
        })
        break
      default:
        break
    }
  }

  login () {
    window.fetch(`${process.env.REACT_APP_API_URL}/user/login/`, {
      withCredentials: true,
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify({
        'username': this.state.loginUsername,
        'password': this.state.loginPassword
      }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': process.env.REACT_APP_API_AUTH
      }
    }).then(res => res.json())
      .then(response => console.log('Form Submitted', JSON.stringify(response)))
      .catch(error => console.error('Error', error))
  }

  render () {
    return (
      <div className='login-form'>
        <h3>Log In</h3>
        <Form>
          <FormGroup>
            <Label for='loginUsername'>Username</Label>
            <Input id='loginUsername' onChange={this.handleLoginChange} value={this.state.loginUsername} type='text' />
          </FormGroup>
          <FormGroup>
            <Label for='loginPassword'>Password</Label>
            <Input id='loginPassword' onChange={this.handleLoginChange} value={this.state.loginPassword} type='password' />
          </FormGroup>
          <Button color='primary' onClick={this.login}>Log In</Button>
        </Form>
      </div>
    )
  }
}
