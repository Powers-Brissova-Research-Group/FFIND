import React from 'react'
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

export function compareAges (age1, age2) {
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

export default class FilterSet extends React.Component {
  constructor (props) {
    super(props)
    if (this.props.setName === 'DISEASE DURATION') {
      this.tags = this.tags.sort(compareAges)
    }
    this.state = {
      open: true
    }
  }

  render () {
    if (this.props.setName !== 'AGE') {
      return (
        <div className='filter-set'>
          <Row className='pancreatlas-row'>
            <Col md='8' className='text-left'>
              <h4>{this.props.setName}</h4>
            </Col>
            <Col md='4' className='text-right'>
              <FontAwesomeIcon icon={faAngleRight} className={this.state.open ? 'collapse-button collapse-button-open' : 'collapse-button collapse-button-closed'} onClick={() => this.setState({ open: !this.state.open })} />
            </Col>
          </Row>
          <Collapse isOpened={this.state.open}>
            {this.props.tags.map(tag => (
              <FilterItem defaultChecked={tag.active} clear={this.props.clear} key={tag.name} filterName={tag.name} filterQty={this.props.tags[tag]} callback={() => this.props.callback(tag.name)} />
            ))}
          </Collapse>
        </div>
      )
    } else {
      return null
    }
  }
}

FilterSet.defaultProps = {
  tags: {}
}
