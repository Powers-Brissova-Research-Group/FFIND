import React from 'react'
import {
  Tooltip
} from 'reactstrap'

export default class DetailRow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ttOpen: false
    }

    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    this.setState({
      ttOpen: !this.state.ttOpen
    })
  }

  render(){
    if (this.props.data !== null && this.props.data !== undefined && this.props.data !== ''){
      return (<tr><td><p id={this.props.heading.split(' ').join('_') + '-tt'}><Tooltip placement="left" isOpen={this.state.ttOpen} target={this.props.heading.split(' ').join('_') + '-tt'} toggle={this.toggle}>{this.props.desc}</Tooltip>{this.props.heading}</p></td><td className={this.props.heading.split('-').map(val => val.trim()).join(' ')}>{this.props.data}</td></tr>)
    } else {
      return null
    }
  }
}

DetailRow.defaultProps = {
  desc: "DEFAULT DESCRIPTION"
}