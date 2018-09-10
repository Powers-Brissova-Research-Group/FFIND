import 'rc-slider/assets/index.css'
import 'rc-tooltip/assets/bootstrap.css'

import React from 'react'
import {
    Row,
    Col
} from 'reactstrap'

import {
    Range
} from 'rc-slider'
  
export default class AgeFilterItem extends React.Component {

  constructor(props){
    super(props)
  }


  render(){
    return(
      <Row>
        <Col md="12">
          <Range min={0} max={this.props.ages.length - 1} defaultValue={[0, this.props.ages.length - 1]} dots={true} marks={this.props.ages} />
        </Col>
      </Row>
    )
  }
}