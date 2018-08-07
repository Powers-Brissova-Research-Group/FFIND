import React from 'react'
import {
  Button 
} from 'reactstrap'
import FilterItem from './FilterItem'

export default class FilterList extends React.Component {
  
  constructor(props){
    super(props)
    this.setFilters = this.setFilters.bind(this)
    this.state = {
      filters: []
    }
  }

  setFilters(newTag) {
    let tagList = this.state.filters

    let idx = tagList.indexOf(newTag)
    if (idx >= 0){
      tagList.splice(idx, 1)
    } else {
      tagList.push(newTag)
    }
    this.setState({
      filters: tagList
    })
    console.log(tagList)
  }
  
  render() {
    return (
      <div className="filter-list">
        <h3>Filters:</h3>
        {this.props.filters.map(item => 
          <FilterItem key={item} filterName={item} callback={this.setFilters}/>
        )}
        <Button color="danger" onClick={() => this.props.callback(this.state.filters)}>Filter</Button> 
      </div>
    )
  }
}

FilterList.defaultProps = {
  filters: ["filter 1", "filter 2", "filter 3", "filter 4"]
}