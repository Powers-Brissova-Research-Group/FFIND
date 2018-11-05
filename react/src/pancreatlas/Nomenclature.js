import React from 'react'
import {
  Container,
  Row,
  Col
} from 'reactstrap'

import MetaTags from 'react-meta-tags'

export default class Nomenclature extends React.Component {
  constructor(props) {
    super(props)
    this.defs = require('../assets/pancreatlas/definitions.json')
  }
  render() {
    return (
      <div className='nomenclature'>
        <MetaTags>
          <title>HDL-P | Pancreatlas > Nomenclature</title>
          <meta name="description" content="How pancreatlas organizes its images"/>
        </MetaTags>
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