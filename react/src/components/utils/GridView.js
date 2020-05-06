import React from 'react'

import axios from 'axios'

import MetaTags from 'react-meta-tags'

import { 
  ImageGrid,
  ImageGridBoundary
 } from '../grid-view'

export default class GridView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      tags: undefined,
      groupName: null,
      group: 4
    }
  }

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_API_URL}/datasets/${this.props.match.params.did}`, {
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Authorization': process.env.REACT_APP_API_AUTH
      }
    }).then(result => {
      this.setState({
        title: result.data.dsname
      })
    })
  }

  render() {
    let did = (this.props.match !== undefined) ? this.props.match.params.did : 0
    return (
      <div className='grid-view'>
        <MetaTags>
          <title>Browse Dataset</title>
          <meta name='description' content='Browse all images within this dataset' />
        </MetaTags>
        <ImageGridBoundary>
          <ImageGrid favorites={this.props.favorites} favoriteCallback={this.props.favoriteCallback} filters={{}} group={this.state.group} groupName={this.state.groupName} did={did} />
        </ImageGridBoundary>
      </div>
    )
  }
}
