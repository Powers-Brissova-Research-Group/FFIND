import React from 'react'
import {
  Button
} from 'reactstrap'
import FilterItem from './FilterItem'

export default class FilterList extends React.Component {

  constructor(props) {
    super(props)
    this.setFilters = this.setFilters.bind(this)
    this.state = {
      loaded: false,
      filters: {},
      tags: {}
    }
  }

  componentDidMount() {
    fetch('http://127.0.0.1:8000/api/tagsets/')
      .then(res => res.json())
      .then(result => {
        let t = {}
        for (let ts of result) {
          t[ts.set_name] = ts.tags
        }
        this.setState({
          loaded: true,
          tags: t
        })
      })
  }

  setFilters(tagset, newTag) {
    let tagList = this.state.filters
    if (tagList[tagset] !== undefined) {
      let idx = tagList[tagset].indexOf(newTag)
      if (idx >= 0) {
        tagList[tagset].splice(idx, 1)
        if (tagList[tagset].length <= 0){
          delete tagList[tagset]
        }
      } else {
        tagList[tagset].push(newTag)
      }
      this.setState({
        filters: tagList
      })
    } else {
      tagList[tagset] = [newTag]
    }
    console.log(tagList)
  }

  render() {
    if (this.state.loaded) {
      return (
        <div className="filter-list">
          <h3><strong>Filters:</strong></h3>
          {Object.keys(this.state.tags).map(key => (
            <div className='tagset' key={key}>
              <h4>{key}</h4>
              {this.state.tags[key].map(tag => (
                <FilterItem key={tag} filterName={tag} callback={() => this.setFilters(key, tag)} />
              ))}
            </div>
          ))}
          <Button color="danger" onClick={() => this.props.callback(this.state.filters)}>Filter</Button>
        </div>
      )
    } else {
      return null
    }
  }
}

FilterList.defaultProps = {
  filters: ["filter 1", "filter 2", "filter 3", "filter 4"]
}