import React from 'react';
import {
  Row,
  Col
} from 'reactstrap'

import {
  Collapse
} from 'react-collapse'

import {
  FontAwesomeIcon
} from '@fortawesome/react-fontawesome'

import { faAngleRight } from '@fortawesome/free-solid-svg-icons'

import FilterItem from './FilterItem'

export default class FilterSet extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: true
    }
  }

  render() {
    if (this.props.setName !== 'AGE') {
      // Object.keys(this.props.tags).map(tag => {
      //   if(this.props.filters !== undefined && this.props.filter.indexOf(tag) !== -1){
      //     console.log(tag)
      //   }
      // })
      return (
        <div className="filter-set">
          <Row className="pancreatlas-row">
            <Col md="8" className='text-left'>
              <h4>{this.props.setName}</h4>
            </Col>
            <Col md="4" className='text-right'>
              <FontAwesomeIcon icon={faAngleRight} className={this.state.open ? 'collapse-button collapse-button-open' : 'collapse-button collapse-button-closed'} onClick={() => this.setState({ open: !this.state.open })} />
            </Col>
          </Row>
          <Collapse isOpened={this.state.open}>
            {Object.keys(this.props.tags).map(tag => (
              <FilterItem defaultChecked={this.props.filters !== undefined && this.props.filters.indexOf(tag) !== -1} clear={this.props.clear} key={tag} filterName={tag} filterQty={this.props.tags[tag]} callback={() => this.props.callback(this.props.setName, tag)} />
            ))}
          </Collapse>
        </div>
      )
    } else {
      return null;
    }
  }
}