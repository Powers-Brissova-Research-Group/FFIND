/**
 * @file Parent class for our list of filters--defines the sidebar and leaves implementation of individual sets to child classes
 * @author Jimmy Messmer
 */
import React from 'react'
import {
  Row,
  Col,
  Button,
  Tooltip
} from 'reactstrap'

import {
  FontAwesomeIcon
} from '@fortawesome/react-fontawesome'

import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

import FilterSet from './FilterSet'

// import AgeFilterSet from './AgeFilterSet'

import Error from './Error'

import { isArray } from './utilities'
import mergeWith from 'lodash.mergewith'

/**
 * React component for the FilterList.
 * @class FilterList
 */
class FilterList extends React.Component {
  /**
   * Create a new FilterList
   * @param {*} props React props
   */
  constructor(props) {
    super(props)
    console.log(JSON.stringify(this.props.filters))
    this.generateURLParam = this.generateURLParam.bind(this)
    this.setFilters = this.setFilters.bind(this)
    this.clear = this.clear.bind(this)
    this.toggle = this.toggle.bind(this)
    this.state = {
      loaded: false,
      filters: this.props.filters,
      prevFilters: this.props.filters,
      clear: true,
      ttOpen: false
    }
  }

  componentDidMount() {
    this.setState({
      loaded: true,
      tags: this.props.filters
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(prevState.filters) !== JSON.stringify(this.props.filters)) {
      this.setState({
        filters: this.props.filters
      })
    }
  }

  /**
   * Read the current URL search parameters and if the new tag is there, remove it. Otherwise, add it.
   * @param {string} newTag Tag to add
   */
  generateURLParam(newTag) {
    let params = new URLSearchParams(window.location.search)
    if (params.has('filters')) {
      var activeFilters = JSON.parse(window.atob(params.get('filters')))
      if (activeFilters.includes(newTag)) {
        activeFilters = activeFilters.filter(tag => tag !== newTag)
      } else {
        activeFilters.push(newTag)
      }
      return activeFilters
    } else {
      var newFilters = [newTag]
      return newFilters
    }
  }

  /**
   * Generate an updated list of active tags and store that in the URL. Then call the callback method in ImageGrid to propogate changes.
   * @param {array} newTags Array of new tags to add
   */
  setFilters(newTags, diff) {
    let urlParams = new URLSearchParams(window.location.search)
    for (let key of Object.keys(newTags)) {
      // this.generateURLParam(key, newTags[key])
      var toAdd = newTags[key]
      if (urlParams.has(key)) {
        let old = {}
        old[key] = JSON.parse(window.atob(urlParams.get(key)))
        let newObj = {}
        newObj[key] = newTags[key]
        mergeWith(old, newObj, (objValue, srcValue) => {
          if (isArray(objValue)) {
            return srcValue
          }
        })
        toAdd = old[key]
      }      
      urlParams.set(key, window.btoa(JSON.stringify(toAdd)))
    }
    // let newFilters = extractFilters(newTags)

    // for (let newTag of newTags) {
    //   /* eslint-disable no-loop-func */
    //   newParams = newParams.concat(this.generateURLParam(newTag).filter(param => !newParams.includes(param)))
    //   /* eslint-enable no-loop-func */
    // }
    // let encoded = window.btoa(JSON.stringify(newParams))
    // let params = new URLSearchParams(window.location.search)
    // params.set('filters', encoded)
    window.history.pushState({ 'pageTitle': 'Browse & Filter Dataset' }, '', `${window.location.protocol}//${window.location.host}${window.location.pathname}?${urlParams.toString()}`)
    this.props.callback(diff)
  }

  /**
   * Clear all active filters.
   */
  clear() {
    this.props.clear({})
  }

  toggle() {
    this.setState({
      ttOpen: !this.state.ttOpen
    })
  }

  render() {
    if (this.props.tags !== null) {
      return (
        <div className='filter-list'>
          <Row className='pancreatlas-row'>
            <Col className='text-left' md='8'>
              <h3>
                <strong>Filters:</strong>
              </h3>
              <span id='QuestionCircle'>
                <FontAwesomeIcon icon={faQuestionCircle} />
              </span>
              <Tooltip placement='right'
                isOpen={this.state.ttOpen}
                target='QuestionCircle'
                toggle={this.toggle}>
                The filters work as an AND function between groups and an OR within them. Example: (Childhood) AND (F OR M)
              </Tooltip>

            </Col>
            <Col className='text-right' md='4'>
              <Button outline className='filter-button text-center' color='danger' size='sm' onClick={this.clear}><i
                className='fa fa-home fa-fw' />Clear</Button>
            </Col>
          </Row>
          {this.props.filters.children.map(filterSet => {
            return (
              <div className='filter-set'>
                <FilterSet setName={filterSet.name} node={filterSet} callback={this.setFilters} depth={1} />
              </div>
            )
            // switch (filterSet.filterMethod) {
            //   case 'slider':
            //     var ageSortedTags = filterSet.children.sort((a, b) => compareAges(a.name, b.name))
            //     return (
            //       <FilterSet setName={filterSet.name} subFilters={filter}>
            //         <SliderFilterList clear={this.state.clear} className='slider-filter-set' setName={filterSet.name} tags={ageSortedTags} callback={this.setFilters} key={filterSet.name} filters={[]} />
            //       </FilterSet>
            //     )
            //   case 'checkbox':
            //   default:
            //     var sortedTags = filterSet.children.sort((a, b) => (a.name > b.name) ? 1 : -1)
            //     return (
            //       <FilterSet setName={filterSet.name}>
            //         <CheckboxFilterList clear={this.state.clear} classname='filter-set' setName={filterSet.name} tags={sortedTags} callback={this.setFilters} key={filterSet.name} filters={[]} />
            //       </FilterSet>)
            // }
          })}
        </div>
      )
    } else if (this.state.error !== undefined) {
      return <Error error_desc={this.state.error.message} />
    } else {
      return null
    }
  }
}

FilterList.defaultProps = {
  filters: ['filter 1', 'filter 2', 'filter 3', 'filter 4'],
  tags: {}
}

export default FilterList
