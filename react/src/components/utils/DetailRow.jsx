import React from 'react'
import {
  Tooltip
} from 'reactstrap'

/**
 * A row in the image modal preview
 * @component
 * @author Jimmy Messmer
 */
class DetailRow extends React.Component {
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
      return (
        <tr>
          <td className='image-detail-row'>
            <p className='text-center' id={this.props.heading.split(' ').join('_') + '-tt'}>
              {this.props.desc !== undefined && <Tooltip placement='left' isOpen={this.state.ttOpen} target={this.props.heading.split(' ').join('_') + '-tt'} toggle={this.toggle}>{this.props.desc}</Tooltip>}
              <strong>{this.props.heading}</strong>
            </p>
          </td>
          <td className={this.props.heading.split('-').map(val => val.trim()).join(' ') + ' text-center image-detail-row'}>
            {this.props.link === undefined && <p>{this.props.data}</p>}
            {this.props.link !== undefined && <p><a href={this.props.link} targe='_blank'><u>{this.props.data}</u></a></p>}
          </td>
        </tr>)
    } else {
      return null
    }
  }
}

DetailRow.defaultProps = {
  desc: 'DEFAULT DESCRIPTION'
}

export default DetailRow