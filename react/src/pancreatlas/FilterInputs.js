/**
 * @file Contains classes for different types of filters
 * @author Jimmy Messmer
 */

import React from 'react'
import FilterItem from './FilterItem'

import {
  Row,
  Col,
  Input
} from 'reactstrap'

// import { Range } from 'rc-slider'
import InputRange from 'react-input-range'

import 'react-input-range/lib/css/index.css'

/**
 * React component for a checkbox. This one is pretty simple--just returns a checkbox for each tag prop
 * @class CheckboxFilterList
 */
class CheckboxFilterList extends React.Component {
  constructor(props) {
    super(props)
    this.addFilter = this.addFilter.bind(this)
    this.state = {
      activeFilters: this.props.tags.filter(tag => tag.active).map(tag => tag.name)
    }
  }

  addFilter(newFilter) {
    let oldFilters = JSON.parse(JSON.stringify(this.state.activeFilters))
    let newFilters = []
    if (oldFilters.indexOf(newFilter) < 0) {
      oldFilters.push(newFilter)
      newFilters = oldFilters
    } else {
      newFilters = oldFilters.filter(val => val !== newFilter)
    }

    this.setState({
      activeFilters: newFilters
    })

    this.props.callback(newFilters, [newFilter])
  }

  render() {
    return (
      this.props.tags.map(tag => (
        <FilterItem defaultChecked={tag.active} clear={this.props.clear} key={tag.name} filterName={tag.name} filterQty={this.props.tags[tag]} callback={() => this.addFilter(tag.name)} />
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
    this.onToggleChange = this.onToggleChange.bind(this)
    this.updateMarks = this.updateMarks.bind(this)
    let leftMark = 0
    let rightMark = this.props.tags.length - 1
    for (let i = 0; i < this.props.tags.length; i++) {
      if (this.props.tags[i].active) {
        leftMark = i
        break
      }
    }
    for (let i = this.props.tags.length - 1; i >= 0; i--) {
      if (this.props.tags[i].active) {
        rightMark = i
        break
      }
    }
    this.state = {
      value: {
        min: leftMark,
        max: rightMark
      },
      active: this.props.tags.filter(tag => tag.active).length > 0
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
        },
        active: false
      })
    }
  }

  /**
   * Update the matches from the slider element when it is updated 
   * @param {array} args Array of arguments--first element is the minimum value, second the maximum
   */
  onSliderChange(newValue) {
    // We should be able to just get all the current filters outside of the current age group + the selected ages
    if (this.state.active) {
      let oldMatches = this.props.tags.slice(this.state.value.min, this.state.value.max + 1).map(match => match.name)
      let matches = this.props.tags.slice(newValue.value.min, newValue.value.max + 1).map(match => match.name)
      let diff = []
      if (oldMatches.length > matches.length) {
        diff = oldMatches.filter(val => matches.indexOf(val) < 0)
      } else {
        diff = matches.filter(val => oldMatches.indexOf(val) < 0)
      }
      this.setState({
        value: newValue.value
      })
      this.props.callback(matches, diff)
    }
  }

  onToggleChange() {
    if (!this.state.active) {
      let matches = this.props.tags
      this.props.callback(matches.map(match => match.name), matches.map(match => match.name))
    } else {
      this.props.callback([], this.props.tags.slice(this.state.value.min, this.state.value.max + 1).map(tag => tag.name))
      this.setState({
        value: {
          min: 0,
          max: this.props.tags.length
        }
      })
    }
    this.setState(prevState => ({
      active: !prevState.active
    }))
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
          <Col md='2'>
            <Input type='checkbox' checked={this.state.active} onChange={this.onToggleChange} />
          </Col>
          <Col md='10'>
            <InputRange
              formatLabel={value => `${this.props.tags[value].name}`}
              maxValue={this.props.tags.length - 1}
              minValue={0}
              value={this.state.value}
              onChange={value => this.onSliderChange({ value })} />
          </Col>
        </Row>
      )
    }
  }

}

export { CheckboxFilterList, SliderFilterList }