import React from 'react'
import {
  Row,
  Col,
  Input
} from 'reactstrap'

export default class FilterItem extends React.Component {
  
  

  render() {
    if(this.props.filterQty > 0){
      return (
        <div className="filter-item">
          <Row>
            <Col md="9">
              {this.props.filterName + ' (' + this.props.filterQty + ')'}
            </Col>
            <Col className='text-right' md="3">
              <Input type="checkbox" onChange={() => this.props.callback(this.props.filterName)} />{' '}
            </Col>
          </Row>
        </div>
      )
    } else {
      return null
    }
  }
}

