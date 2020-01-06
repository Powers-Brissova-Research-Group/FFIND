import React from 'react'

import {
  Button,
  Modal, 
  ModalHeader,
  ModalBody, 
  ModalFooter
} from 'reactstrap'

export default class UserInfoModal extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      visible: this.props.visible
    }
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.props.visible}>
          <ModalHeader>User Information</ModalHeader>
          <ModalBody>
            <h3>Hi there!</h3>
            <p>It looks like you are finding our site useful (we're flattered). Please take a minute to fill out our survey below.</p>
          </ModalBody>
          <ModalFooter>
            <Button>Submit!</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}
