import React from 'react'
import {
  Row,
  Col,
  Input,
  FormGroup,
  Label
} from 'reactstrap'

import {
  Collapse
} from 'react-collapse'

import { Range } from 'rc-slider'

import AgeFilterItem from './AgeFilterItem'

import {
  FontAwesomeIcon
} from '@fortawesome/react-fontawesome'

import { faAngleRight } from '@fortawesome/free-solid-svg-icons'

export function compareAges(age1, age2) {
  let ageRe = /^(G)?(\d+\.?\d*)(d|w|mo|y)(\+\d+d|w|mo|y)?$/
  let a = ageRe.exec(age1)
  let b = ageRe.exec(age2)
  switch (a[3]) {
    case 'd':
      a[3] = 0
      break
    case 'w':
      a[3] = 1
      break
    case 'mo':
      a[3] = 2
      break
    case 'y':
      a[3] = 3
      break
    default:
      a[3] = -1
  }

  switch (b[3]) {
    case 'd':
      b[3] = 0
      break
    case 'w':
      b[3] = 1
      break
    case 'mo':
      b[3] = 2
      break
    case 'y':
      b[3] = 3
      break
    default:
      b[3] = -1
  }

  if (a[1] === 'G' && b[1] !== 'G') {
    return -1
  } else if (a[1] !== 'G' && b[1] === 'G') {
    return 1
  } else {
    if (a[3] < b[3]) {
      return -1
    } else if (a[3] > b[3]) {
      return 1
    } else {
      if (Number(a[2]) < Number(b[2])) {
        return -1
      } else if (Number(a[2]) > Number(b[2])) {
        return 1
      } else {
        if (a[4] === undefined && b[4] !== undefined) {
          return -1
        } else if (a[4] !== undefined && b[4] === undefined) {
          return 1
        } else {
          return 0
        }
      }
    }
  }
};

export default class SliderFilterSet extends React.Component {
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
    if (this.props.currentFilters !== undefined) {
      // We should be able to just get all the current filters outside of the current age group + the selected ages
      let matches = this.props.tags.slice(args[0], args[1] + 1)
      let others = this.props.currentFilters.filter(el => this.props.tags.indexOf(el) === -1)
      let allMatches = matches.concat(others)
      this.props.callback(allMatches)
    }
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
