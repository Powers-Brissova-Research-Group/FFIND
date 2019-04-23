import React from 'react'
import {
  Container,
  Row,
  Col,
  Button,
  ButtonGroup
} from 'reactstrap'

import MetaTags from 'react-meta-tags'

import NomenclatureSection from './NomenclatureSection'

export default class Nomenclature extends React.Component {
  constructor (props) {
    super(props)
    this.defs = require('../assets/pancreatlas/definitions.json')
    this.state = {
      open: false
    }
  }

  render () {
    return (
      <div className='nomenclature'>
        <MetaTags>
          <title>Nomenclature -- Pancreatlas</title>
          <meta name='description' content='How pancreatlas organizes its images' />
        </MetaTags>
        <Container>
          <div style={{ height: '45vh' }}>
            <Row className='h-100'>
              <Col md='12' className='d-flex align-items-center'>
                <div className='dataset-title align-middle'>
                  <h1>Nomenclature</h1>
                  <p>Below are descriptions regarding the various annotations we have added to our images</p>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
        <Container fluid className='shaded'>
          <Container>
            <Row className='my-4'>
              <ButtonGroup className='mt-4'>
                <Button outline color='secondary' onClick={() => this.setState({ open: false })} active={this.state.open === false}>Close All</Button>
                <Button outline color='secondary' onClick={() => this.setState({ open: true })} active={this.state.open === true}>Open All</Button>
              </ButtonGroup>
            </Row>
            {Object.keys(this.defs).map(section => (
              <div className='definitions'>
                <NomenclatureSection data={this.defs[section]} sectionName={section} openOverride={this.state.open} />
              </div>
            ))}
          </Container>
        </Container>
      </div>
    )
  }
}
