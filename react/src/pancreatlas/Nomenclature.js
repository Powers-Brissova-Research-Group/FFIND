import React from 'react'
import {
  Container,
  Row,
  Col
} from 'reactstrap'

export default class Nomenclature extends React.Component {
  constructor(props) {
    super(props)
    this.defs = require('../assets/pancreatlas/definitions.json')
  }
  render() {
    return (
      <div className='nomenclature'>
        <Container>
          <h1>Nomenclature</h1>
          <p>Below are descriptions regarding the various annotations we have added to our images</p>
          {Object.keys(this.defs).map(key => (
            <Row className="pancreatlas-row">
              <Col md="3"><h3>{key}</h3></Col>
              <Col md="9"><p>{this.defs[key].long_desc}</p></Col>
            </Row>
          ))}
        </Container>
      </div>
    )
  }
}