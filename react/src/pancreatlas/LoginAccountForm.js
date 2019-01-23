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
          <Button color='primary'>Log In</Button>
        </Form>
      </div>
    )
  }
}
