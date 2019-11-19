import React from 'react'
import FilterItem from './FilterItem'

import {
  Row,
  Col
} from 'reactstrap'

import { Range } from 'rc-slider'


export class CheckboxFilterList extends React.Component {
  render() {
    return (
      this.props.tags.map(tag => (
        <FilterItem defaultChecked={tag.active} clear={this.props.clear} key={tag.name} filterName={tag.name} filterQty={this.props.tags[tag]} callback={() => this.props.callback([ tag.name ])} />
      ))
    )
  }
}

export class SliderFilterList extends React.Component {
  constructor(props) {
    super(props)
    this.onSliderChange = this.onSliderChange.bind(this)
    this.updateMarks = this.updateMarks.bind(this)
    this.leftMark = 0
    this.state = {
      min: 0,
      max: this.props.tags.length - 1
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.hidden === false && this.props.hidden === true) {
      this.setState({
        min: 0,
        max: this.props.tags.length - 1
      })
    }
  }

  onSliderChange(args) {
    // We should be able to just get all the current filters outside of the current age group + the selected ages
    let matches = this.props.tags.slice(args[0], args[1] + 1)
    this.props.callback(matches.map(match => match.name))
  }

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
              onAfterChange={this.onSliderChange} />
          </Col>
        </Row>
      )
    }
  }

}