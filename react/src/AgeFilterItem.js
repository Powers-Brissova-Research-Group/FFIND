import 'rc-slider/assets/index.css'
import 'rc-tooltip/assets/bootstrap.css'

import React from 'react'
import {
    Row,
    Col
} from 'reactstrap'

import { Range } from 'rc-slider'

import Tooltip from 'rc-tooltip'

export default class AgeFilterItem extends React.Component {

  constructor(props){
    super(props)
    this.onSliderChange = this.onSliderChange.bind(this)
    this.updateMarks = this.updateMarks.bind(this)
    this.leftMark = 0;
    this.state = {
      min: 0,
      max: this.props.ages.length - 1
    }
  }

  onSliderChange(args){
    // console.log(this.props.ages.slice(args[0], args[1] + 1))
    if(this.props.currentFilters !== undefined){
      // We should be able to just get all the current filters outside of the current age group + the selected ages
      let matches = this.props.ages.slice(args[0], args[1] + 1)
      let others = this.props.currentFilters.filter(el => this.props.ages.indexOf(el) === -1)
      let allMatches = matches.concat(others)
      console.log(allMatches)
      this.props.callback(allMatches)
    } else {
      console.log('onSliderChange being called when it shouldn\'t be')
    }
  }

  updateMarks(args){
    this.setState({
      min: args[0],
      max: args[1]
    })
  }

  render(){
    // const Handle = Slider.Handle;
    // const handle = (props) => {
    //   const { value, dragging, index, ...restProps} = props
    //   return (
    //     <Tooltip prefixCls="rc-slider-tooltip" overlay={value} visible={dragging} placement="top" key={index}>
    //       <Handle value={value} {...restProps} />
    //     </Tooltip>        
    //   )
    // }
    if(this.props.hidden){
      return null
    } else {
      return(
        <Row className="age-slider">
          <Col md="12">
            <Range min={0} max={this.props.ages.length - 1} defaultValue={[0, this.props.ages.length - 1]} marks={{[this.state.min]: this.props.ages[this.state.min], [this.state.max]: this.props.ages[this.state.max]}} dots={true} onChange={this.updateMarks} onAfterChange={this.onSliderChange} />
          </Col>
        </Row>
      )
    }
  }
}