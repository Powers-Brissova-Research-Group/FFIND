import React from 'react'

export default class Error extends React.Component {
  render () {
    return (
      <div className='error'>
        <h1>{this.props.error_title}</h1>
        <p>{this.props.error_desc}</p>
      </div>
    )
  }
}

Error.defaultProps = {
  error_title: 'Unknown Error',
  error_desc: 'No more info'
}
