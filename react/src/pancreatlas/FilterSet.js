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

import FilterItem from './FilterItem'


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

export default class FilterSet extends React.Component {
  constructor(props) {
    super(props)
    // this.tags = []
    // if (this.props.setName === 'AGE') {
    //   this.tags = this.props.tags.sort((a, b) => compareAges(a.name, b.name))
    // } else {
    //   this.tags = this.props.tags.sort((a, b) => (a.name > b.name) ? 1: -1)
    // }
    this.recurse = this.recurse.bind(this)
    this.terminate = this.terminate.bind(this)
    this.clear = this.clear.bind(this)
    this.state = {
      open: true
    }
  }

  /**
   * Clear all active filters.
   */
  clear() {
    this.props.clear({})
  }


  recurse(node) {
    return (
      <div >
        <Row className='pancreatlas-row'>
          <Col md='8' className='text-left'>
            <h4 className={`filter-set-heading-${this.props.depth}`}>{this.props.setName}</h4>
          </Col>
          <Col md='4' className='text-right'>
            <FontAwesomeIcon icon={faAngleRight} className={this.state.open ? 'collapse-button collapse-button-open' : 'collapse-button collapse-button-closed'} onClick={() => this.setState({ open: !this.state.open })} />
          </Col>
        </Row>
        <Collapse isOpened={this.state.open}>
          {node.children.map(child => {
            return (
                <FilterSet node={child} setName={child.name} callback={this.props.callback} depth={this.props.depth + 1} />
            )
          })}
        </Collapse>
      </div>
    )
  }

  terminate(tag) {
    return (
      // <p>{tag.name}</p>
      <FilterItem defaultChecked={tag.active} clear={this.clear} key={tag.name} filterName={tag.name} callback={() => this.props.callback([tag.name])} />
    )
  }

  render() {
    if (this.props.node.type === 'leaf') {
      return this.terminate(this.props.node)
    } else {
      return this.recurse(this.props.node)
    }
  }
}

FilterSet.defaultProps = {
  tags: {}
}
