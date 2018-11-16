import React from 'react'
import {
  Row,
  Col
} from 'reactstrap'
import DatasetList from './DatasetList'

export default class DatasetPage extends React.Component {
  render () {
    return (
      <div className='dataset-page' >
        <Row className='pancreatlas-row'>
          <Col md='12'>
            <h1>Available Datasets</h1>
          </Col>
        </Row>
        <Row className='pancreatlas-row'>
          <Col md='12'>
            <DatasetList />
          </Col>
        </Row>
      </div >
    )
  }
}
