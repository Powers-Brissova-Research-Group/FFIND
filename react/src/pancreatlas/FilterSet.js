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

import {
  CheckboxFilterList,
  SliderFilterList
} from './FilterInputs'


import { faAngleRight } from '@fortawesome/free-solid-svg-icons'

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
    this.gatherFilters = this.gatherFilters.bind(this)
    this.state = {
      open: !this.props.node.defaultHidden
    }
  }

  /**
   * Clear all active filters.
   */
  clear() {
    this.props.clear({})
  }

  gatherFilters(filters, diff) {
    var filterObj = {}
    filterObj[this.props.setName] = filters
    this.props.callback(filterObj, diff)
  }


  recurse(node) {
    let childLeaves = node.children.filter(child => child.type === 'leaf')
    let childNodes = node.children.filter(child => child.type !== 'leaf')
    let sortedLeaves = childLeaves.sort(node.sortMethod)
    let sortedNodes = childNodes.sort(node.sortMethod)

    var leafJSX = undefined
    if (sortedLeaves.length > 0 && node.filterMethod === 'slider') {
      leafJSX = <SliderFilterList clear={this.state.clear} className='slider-filter-set' setName={node.name} tags={sortedLeaves} callback={this.gatherFilters} key={node.name} filters={[]} />
    } else if (sortedLeaves.length > 0){
      leafJSX = <CheckboxFilterList clear={this.state.clear} classname='filter-set' setName={node.name} tags={sortedLeaves} callback={this.gatherFilters} key={node.name} filters={[]} />
    }

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
        <Collapse isOpened={this.state.open} contentHeight={50}>
          {leafJSX}
          {sortedNodes.map(child => {
            return (
              <FilterSet node={child} setName={child.name} callback={this.gatherFilters} depth={this.props.depth + 1} />
            )
          })}
        </Collapse>
      </div>
    )
  }

  terminate(tag) {
    return (
      // <p>{tag.name}</p>
      <FilterItem defaultChecked={tag.active} clear={this.clear} key={tag.name} filterName={tag.name} callback={() => this.props.callback(this.props.node.name, [tag.name])} />
    )
  }

  render() {
    return this.recurse(this.props.node)
    // if (this.props.node.type === 'leaf') {
    //   return this.terminate(this.props.node)
    // } else {
    //   return this.recurse(this.props.node)
    // }
  }
}

FilterSet.defaultProps = {
  tags: {}
}
