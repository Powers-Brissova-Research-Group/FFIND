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
import AgeFilterSet from './AgeFilterSet'

import Error from './Error'

export default class FilterList extends React.Component {
  constructor (props) {
    super(props)
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
    let extras = ['depth 1', 'depth 2', 'depth 3']
    if (this.props.tags !== null) {
      let t = {}
      for (let ts of this.props.tags) {
        if (ts !== undefined) {
          for (let tag of Object.keys(ts.tags)) {
            if (extras.indexOf(tag) !== -1) {
              delete ts.tags[tag]
            }
          }
          t[ts.set_name] = ts.tags
        }
      }
      this.setState({
        loaded: true,
        tags: t
      })
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (JSON.stringify(prevState.filters) !== JSON.stringify(this.props.filters)) {
      this.setState({
        filters: this.props.filters
      })
    }
  }

  setFilters (tagset, newTag) {
    let tagList = this.state.filters
    let prevFilters = JSON.parse(JSON.stringify(tagList))

    // First check to make sure that we have tags from the current tagset defined
    if (tagList[tagset] !== undefined) {
      if (tagset === 'AGE') {
        tagList[tagset] = newTag
      } else {
        let idx = tagList[tagset].indexOf(newTag)

        // If the tagset is already selected, remove it from the set of selected tags
        if (idx >= 0) {
          tagList[tagset].splice(idx, 1)
          // If the list of selected tags from the tagset is now empty, remove the key from the tagList object
          if (tagList[tagset].length <= 0) {
            delete tagList[tagset]
          }
        } else {
          // If the tag is not in our list, add it
          tagList[tagset].push(newTag)
        }
      }
    } else {
      // If we don't have anything from the current tagset, add that key to the object and add the tag

      // Special case for age -- the tags already come in as an array, so no need to create a new one
      if (tagset === 'AGE') {
        tagList[tagset] = newTag
      } else {
        tagList[tagset] = [newTag]
      }
    }
    this.setState({
      filters: tagList,
      prevFilters: prevFilters
    })
    this.props.callback(this.state.filters, prevFilters)
  }

  clear () {
    this.setState({
      filters: {
        'AGE': []
      }
    })
    this.props.callback({})
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
          {Object.keys(this.props.tags).map(key => {
            if (this.props.tags[key]['set_name'] === 'AGE') {
              return (<AgeFilterSet clear={this.state.clear} ageGroup={this.props.ageGroup} className='filter-set' callback={this.setFilters} key={key} ages={Object.keys(this.props.tags[key]['tags'])} filters={this.props.filters['AGE']} />)
            } else {
              return (<FilterSet clear={this.state.clear} classname='filter-set' setName={this.props.tags[key]['set_name']} tags={this.props.tags[key]['tags']} callback={this.setFilters} key={key} filters={this.props.filters[this.props.tags[key]['set_name']]} />)
            }
            // <Collapse isOpened={true}>
            //   <div className='tagset' key={key}>
            //     <h4>{this.props.tags[key]['set_name']}</h4>
            //     {Object.keys(this.props.tags[key]['tags']).map(tag => (
            //       <FilterItem key={tag} filterName={tag} filterQty={this.props.tags[key]['tags'][tag]} callback={() => this.setFilters(this.props.tags[key]['set_name'], tag)} />
            //     ))}
            //   </div>
            // </Collapse>
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
