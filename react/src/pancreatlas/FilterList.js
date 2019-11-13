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

export default class FilterList extends React.Component {
  constructor (props) {
    super(props)
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

  componentDidMount () {
      this.setState({
        loaded: true,
        tags: this.props.filters
      })
  }

  componentDidUpdate (prevProps, prevState) {
    if (JSON.stringify(prevState.filters) !== JSON.stringify(this.props.filters)) {
      this.setState({
        filters: this.props.filters
      })
    }
  }

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

  setFilters (newTag) {
    let newParams = this.generateURLParam(newTag)
    let encoded = window.btoa(JSON.stringify(newParams))
    let params = new URLSearchParams(window.location.search)
    params.set('filters', encoded)
    window.history.pushState({'pageTitle': 'Browse & Filter Dataset'}, '', `${window.location.protocol}//${window.location.host}${window.location.pathname}?${params.toString()}`)
    this.props.callback(newTag)
  }

  clear () {
    this.props.clear({})
  }

  toggle () {
    this.setState({
      ttOpen: !this.state.ttOpen
    })
  }

  render () {
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
            // if (this.props.filters[key]['set_name'] === 'AGE') {
            //   return (<AgeFilterSet split clear={this.state.clear} setName={this.props.filters[key]['set_name']} ageGroup={this.props.ageGroup} className='filter-set' callback={this.setFilters} key={key} ages={Object.keys(this.props.filters[key]['tags'])} filters={this.props.filters['AGE']} />)
            // } else {
              return (<FilterSet clear={this.state.clear} classname='filter-set' setName={filterSet.name} tags={filterSet.children} callback={this.setFilters} key={filterSet.name} filters={[]} />)
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
