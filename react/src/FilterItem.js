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
          <Col md="9">
            {this.props.filterName}
          </Col>
          <Col className='text-right' md="3">
            <Input type="checkbox" onChange={() => this.props.callback(this.props.filterName)} />{' '}
          </Col>
        </Row>
      </div>
    )
  }
}

