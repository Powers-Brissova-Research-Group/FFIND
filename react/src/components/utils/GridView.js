import React from 'react'

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

  render() {
    let did = (this.props.match !== undefined) ? this.props.match.params.did : 0
    let iid = (this.props.match !== undefined) ? this.props.match.params.iid : 0
    return (
      <div className='grid-view'>
        <MetaTags>
          <title>Browse Dataset</title>
          <meta name='description' content='Browse all images within this dataset' />
        </MetaTags>
        <ImageGridBoundary>
          <ImageGrid favorites={this.props.favorites} favoriteCallback={this.props.favoriteCallback} filters={{}} group={this.state.group} groupName={this.state.groupName} did={did} iid={iid} />
        </ImageGridBoundary>
      </div>
    )
  }
}
