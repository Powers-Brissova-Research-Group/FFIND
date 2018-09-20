import React from 'react'
import {
  Container,
  Row,
  Col
} from 'reactstrap'

export default class Nomenclature extends React.Component {
  constructor(props) {
    super(props)
    this.defs = {
      'cy2': 'default description',
      'cy3': 'default description',
      'cy5': 'default description',
      'dapi': 'default description',
      'Disease Status': 'Indicates what type, if any, of diabetes the donor had',
      'File Type': 'Specifies the type of image file this sample is',
      'Sex': 'Indicates the sex of the donor, or whether it was unknown at the time',
      'Section plane': 'default description',
      'UNOS ID': 'default description (do we even need this?)'
    }
  }
  render() {
    return (
      <div className='nomenclature'>
        <Container>
          <h1>Nomenclature</h1>
          <p>Below are descriptions regarding the various annotations we have added to our images</p>
          {Object.keys(this.defs).map(key => (
            <Row>
              <Col md="3"><h3>{key}</h3></Col>
              <Col md="9"><p>{this.defs[key]}</p></Col>
            </Row>
          ))}
        </Container>
      </div>
    )
  }
}