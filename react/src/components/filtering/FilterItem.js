/**
 * @file Contains definition of FilterItem class
 * @author Jimmy Messmer
 */
import React from 'react'
import {
  Row,
  Col,
  Input,
  FormGroup,
  Label
} from 'reactstrap'

/**
 * Defines a single checkbox corresponding to a single filter. When checked, the event bubbles up to the ImageGrid to update the UI and FilterTree
 * @class FilterItem
 * @hideconstructor
 */
class FilterItem extends React.Component {
  /**
   * Renders the component
   */
  render () {
    return (
      <div className='filter-item'>
        <Row className='pancreatlas-row'>
          <Col md='12' className='text-left'>
            <FormGroup check>
              <Label check>
                <Input checked={this.props.defaultChecked} id={this.props.filterName} type='checkbox' onChange={() => this.props.callback(this.props.filterName)} />{this.props.filterName}
              </Label>
            </FormGroup>
          </Col>
        </Row>
      </div>
    )
  }
}

export default FilterItem