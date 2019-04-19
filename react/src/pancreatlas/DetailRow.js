import React from 'react'
import {
  Tooltip
} from 'reactstrap'

export default class DetailRow extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      ttOpen: false
    }

    this.toggle = this.toggle.bind(this)
  }

  toggle () {
    this.setState({
      ttOpen: !this.state.ttOpen
    })
  }

  render () {
    if (this.props.data !== null && this.props.data !== undefined && this.props.data !== '') {
      return (<tr><td className='image-detail-row'><p className='text-center' id={this.props.heading.split(' ').join('_') + '-tt'}><Tooltip placement='left' isOpen={this.state.ttOpen} target={this.props.heading.split(' ').join('_') + '-tt'} toggle={this.toggle}>{this.props.desc}</Tooltip><strong>{this.props.heading}</strong></p></td><td className={this.props.heading.split('-').map(val => val.trim()).join(' ') + ' text-center image-detail-row'}><p>{this.props.data}</p></td></tr>)
    } else {
      return null
    }
  }
}

DetailRow.defaultProps = {
  desc: 'DEFAULT DESCRIPTION'
}
