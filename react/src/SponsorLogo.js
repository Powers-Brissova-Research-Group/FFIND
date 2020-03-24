import React from 'react'

export default class SponsorLogo extends React.Component {
  render () {
    return (
      <div className='pancreatlas-sponsor-logo mx-4'>
        <a href={this.props.location} alt={this.props.name} target='_blank' rel='noopener noreferrer'>
          <img className='img-fluid' src={this.props.imgSrc} alt={this.props.name} />
        </a>
      </div>
    )
  }
}
