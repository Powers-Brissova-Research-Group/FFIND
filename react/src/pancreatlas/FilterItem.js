import React from 'react'
import {
  Row,
  Col,
  Input,
  FormGroup,
  Label
} from 'reactstrap'

export default class FilterItem extends React.Component {
  render() {
    return (
      <div className="filter-item">
        <Row className="pancreatlas-row">
          <Col md="12" className='text-left'>
            <FormGroup check>
              <Label check>
                <Input checked={this.props.defaultChecked} id={this.props.filterName} type="checkbox" onChange={() => this.props.callback(this.props.filterName)} />{this.props.filterName}
              </Label>
            </FormGroup>
          </Col>
        </Row>
      </div>
    )
  }
}

