import React from 'react'

import {
  Button,
  Modal, 
  ModalHeader,
  ModalBody, 
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label
} from 'reactstrap'

import { withFirebase } from '../firebase'

class UserInfoModal extends React.Component {
  constructor (props) {
    super(props)

    this.updateInstition = this.updateInstition.bind(this)
    this.updateRole = this.updateRole.bind(this)
    this.submit = this.submit.bind(this)
    this.state = {
      visible: this.props.visible,
      formData: {
        institution: undefined,
        role: undefined
      }
    }
  }

  updateInstition(e) {
    let tmp = {...this.state.formData}
    tmp.institution = e.target.value
    this.setState({
      formData: tmp
    })
  }

  updateRole(e) {
    let tmp = {...this.state.formData}
    tmp.role = e.target.value
    this.setState(prevState => ({
      formData: tmp
    }))
  }

  submit() {
    this.props.firebase.addNewUserInfo(this.state.formData)
    this.props.toggle()
    // return this.state.formData
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.props.visible} toggle={this.props.toggle}>
          <ModalHeader toggle={this.props.toggle}>We need your help!</ModalHeader>
          <ModalBody>
            <p>It looks like you are finding our site useful. By better understanding who our users are, we improve our chances of securing future funding needed to keep this resource available.</p>
            <Form>
              <FormGroup>
                <Label for='institution'>Name of your institution/organization</Label>
                <Input type='text' id='institution' name='institution' placeholder='Vanderbilt University, NIDDK, Novartis, etc...' onChange={this.updateInstition} />
              </FormGroup>
              <FormGroup tag='roles'>
                <legend>What is your role?</legend>
                <FormGroup check>
                  <Label check>
                    <Input type='radio' name='role' value='research-fac' onChange={this.updateRole}  />{' '}
                    Faculty
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type='radio' name='role' value='research-staff' onChange={this.updateRole}  />{' '}
                    Staff
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type='radio' name='role' value='student' onChange={this.updateRole}  />{' '}
                    Student/Trainee
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type='radio' name='role' value='admin' onChange={this.updateRole}  />{' '}
                    Administrator
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type='radio' name='role' value='public' onChange={this.updateRole} />{' '}
                    Public User
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type='radio' name='role' value='other' onChange={this.updateRole}  />{' '}
                    Other
                  </Label>
                </FormGroup>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button onClick={this.submit}>Submit!</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default withFirebase(UserInfoModal)
