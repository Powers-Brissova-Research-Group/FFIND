import React from 'react'

import {
  Tooltip
} from 'reactstrap'

export default class MarkerTag extends React.Component {
  constructor (props) {
    super(props)
    this.toggleTooltip = this.toggleTooltip.bind(this)
    this.state = {
      ttOpen: false
    }
  }

  toggleTooltip () {
    this.setState({
      ttOpen: !this.state.ttOpen
    })
  }

  render () {
    var tinycolor = require('tinycolor2')
    if (this.props.filterActive) {
      return (
        <span className='tag' key={`${this.props.marker}-${this.props.iid}-key`}>{' '}
          <span id={`${this.props.marker.replace(' ', '_').replace(/[^0-9a-zA-Z\-_]/gi, '')}-${this.props.iid}`}
            onClick={() => this.props.filterCallback(this.props.marker)}
            className='tag marker'
            style={{
              color: (tinycolor(this.props.color).isLight()) ? '#000000' : '#FFFFFF',
              backgroundColor: `#${this.props.color}`
            }}>
            {this.props.marker}
          </span>
          <Tooltip placement='bottom'
            isOpen={this.state.ttOpen}
            target={`${this.props.marker.replace(' ', '_').replace(/[^0-9a-zA-Z\-_]/gi, '')}-${this.props.iid}`}
            toggle={this.toggleTooltip}>
              Filter results by this marker
          </Tooltip>
        </span>
      )
    } else {
      return (
        <span className='tag' key={`${this.props.marker}-${this.props.iid}-key`}>{' '}
          <span id={`${this.props.marker.replace(' ', '_')}-${this.props.iid}`}
            onClick={() => this.props.filterCallback(this.props.marker)}
            className='tag marker-nofilter'
            style={{
              color: (tinycolor(this.props.color).isLight()) ? '#000000' : '#FFFFFF',
              backgroundColor: `#${this.props.color}`
            }}>
            {this.props.marker}
          </span>
        </span>
      )
    }
  }
}
