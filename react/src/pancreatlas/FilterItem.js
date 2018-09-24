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
        <Row className="pancreatlas-row">
          <Col md="9">
            {this.props.filterName.charAt(0).toUpperCase() + this.props.filterName.slice(1)}
          </Col>
          <Col className='text-right' md="3">
            <Input type="checkbox" onChange={() => this.props.callback(this.props.filterName)} />{' '}
          </Col>
        </Row>
      </div>
    )
  }
}

