/**
 * @file Contains classes for different types of filters
 * @author Jimmy Messmer
 */

import React from 'react'
import FilterItem from './FilterItem'

import {
  Row,
  Col
} from 'reactstrap'

// import { Range } from 'rc-slider'
import InputRange from 'react-input-range'

import 'react-input-range/lib/css/index.css'

/**
 * React component for a checkbox. This one is pretty simple--just returns a checkbox for each tag prop
 * @class CheckboxFilterList
 */
class CheckboxFilterList extends React.Component {
  render() {
    return (
      this.props.tags.map(tag => (
        <FilterItem defaultChecked={tag.active} clear={this.props.clear} key={tag.name} filterName={tag.name} filterQty={this.props.tags[tag]} callback={() => this.props.callback([tag.name])} />
      ))
    )
  }
}

/**
 * React component for a slider.
 * @class SliderFilterList
 */
class SliderFilterList extends React.Component {
  constructor(props) {
    super(props)
    this.onSliderChange = this.onSliderChange.bind(this)
    this.updateMarks = this.updateMarks.bind(this)
    this.leftMark = 0
    this.state = {
      value: {
        min: 0,
        max: this.props.tags.length - 1
      }
    }
  }
  /**
   * Reset the filter if the entire set is toggled off
   * @param {*} prevProps Old props for component
   */
  componentDidUpdate(prevProps) {
    if (prevProps.hidden === false && this.props.hidden === true) {
      this.setState({
        value: {
          min: 0,
          max: this.props.tags.length - 1
        }
      })
    }
  }

  /**
   * Update the matches from the slider element when it is updated 
   * @param {array} args Array of arguments--first element is the minimum value, second the maximum
   */
  onSliderChange(newValue) {
    // We should be able to just get all the current filters outside of the current age group + the selected ages
    console.log(newValue.value)
    let matches = this.props.tags.slice(newValue.value.min, newValue.value.max)
    this.setState({
      value: newValue.value
    })
    this.props.callback(matches.map(match => match.name))
  }

  /**
   * Update min and max marks on the slider element
   * @param {array} args Array with new minimum and maximum values
   */
  updateMarks(args) {
    this.setState({
      min: args[0],
      max: args[1]
    })
  }

  render() {
    if (this.props.hidden) {
      return null
    } else {
      return (
        <Row className='age-slider pancreatlas-row'>
          <Col md='12'>
            <InputRange
              formatLabel={value => `${this.props.tags[value].name}`}
              maxValue={this.props.tags.length - 1}
              minValue={0}
              value={this.state.value}
              onChange={value => this.onSliderChange({ value })} />
            {/* {this.props.tags.map(tag => { return (<p>{tag.name}</p>) })}
            <Range
              min={0}
              max={this.props.tags.length - 1}
              defaultValue={[0, this.props.tags.length - 1]}
              marks={{
                [this.state.min]: this.props.tags[this.state.min],
                [this.state.max]: this.props.tags[this.state.max]
              }}
              dots
              onChange={this.updateMarks}
              onAfterChange={this.onSliderChange} /> */}
          </Col>
        </Row>
      )
    }
  }

}

export { CheckboxFilterList, SliderFilterList }