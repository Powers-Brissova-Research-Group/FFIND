import React from 'react'

import {
  Container,
  Row,
  Col
} from 'reactstrap'

export default class Admin extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      rows: []
    }
  }

  componentDidMount() {
    let ref = this.props.firebase.fetchUserInfoRef()
    let newRows = []
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        newRows.push(doc)
        this.setState({
          rows: newRows
        })
      })
    })
  }

  render() {
    return (
      <Container>
        <Row>
          <Col md={12}>
            <p>{this.state.rows}</p>
          </Col>
        </Row>
      </Container>
    )
  }
}