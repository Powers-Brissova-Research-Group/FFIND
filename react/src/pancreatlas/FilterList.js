import React from 'react'
import {
  Row,
  Col,
  Button
} from 'reactstrap'
import FilterSet from './FilterSet'
import AgeFilterSet from './AgeFilterSet'

import Error from './Error'

export default class FilterList extends React.Component {

  constructor(props) {
    super(props)
    this.setFilters = this.setFilters.bind(this)
    this.state = {
      loaded: false,
      filters: {}
    }
  }

  componentDidMount() {
    let extras = ['depth 1', 'depth 2', 'depth 3']
    if (this.props.tags !== null) {
      let t = {}
      for (let ts of this.props.tags) {
        if (ts !== undefined) {
          for (let tag of Object.keys(ts.tags)){
            if (extras.indexOf(tag) !== -1){
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

  setFilters(tagset, newTag) {
    let tagList = this.state.filters

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
      this.setState({
        filters: tagList
      })
    } else {
      // If we don't have anything from the current tagset, add that key to the object and add the tag

      // Special case for age -- the tags already come in as an array, so no need to create a new one
      if (tagset === 'AGE') {
        tagList[tagset] = newTag
      } else {
        tagList[tagset] = [newTag]
      }
    }
    console.log(this.state.filters)
    this.props.callback(this.state.filters)
  }

  render() {
    if (this.props.tags !== null) {
      return (
        <div className="filter-list">
          <h3><strong>Filters:</strong></h3>
          <Row className="pancreatlas-row">
            <Col className='text-center' md="12">
              <Button outline className='filter-button text-center' color="danger" size="sm" onClick={() => this.props.callback({})}>Clear</Button>
            </Col>
          </Row>
          {Object.keys(this.props.tags).map(key => {
            if(this.props.tags[key]['set_name'] === 'AGE'){
              return (<AgeFilterSet ageGroup={this.props.ageGroup} className='filter-set' callback={this.setFilters} key={key} ages={Object.keys(this.props.tags[key]['tags'])} /> )
            } else {
              return (<FilterSet classname='filter-set' setName={this.props.tags[key]['set_name']} tags={this.props.tags[key]['tags']} callback={this.setFilters} key={key} />)
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
  filters: ["filter 1", "filter 2", "filter 3", "filter 4"]
}