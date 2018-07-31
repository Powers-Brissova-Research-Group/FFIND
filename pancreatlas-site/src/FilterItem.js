import React from 'react'
import {
  Row,
  Col,
  Input
} from 'reactstrap'

export default class FilterItem extends React.Component {
  
  

  render() {
    return (
      <div className="filter-item">
        <Row>
          <Col md="8">
            <strong>{this.props.filterName}</strong>
          </Col>
          <Col md="4">
            <Input type="checkbox" onChange={() => this.props.callback(this.props.filterName)} />{' '}
          </Col>
        </Row>
      </div>
    )
  }
}

