import React from 'react'

export default class SponsorLogo extends React.Component {
  constructor (props) {
    super(props)
    let height = null
    switch (this.props.size.toLowerCase()) {
      case 'sm':
      case 'small':
        height = '4rem'
        break
      case 'med':
      case 'medium':
        height = '6rem'
        break
      case 'lg':
      case 'large':
        height = '8rem'
        break
      default:
        height = '2rem'
    }

    this.state = {
      height: height
    }
  }
  render () {
    return (
      <div className='sponsor-logo'>
        <a href={this.props.location} alt={this.props.name} target='_blank' rel='noopener noreferrer'>
          <img style={{ height: this.state.height }} className='img-fluid' src={this.props.imgSrc} alt={this.props.name} />
        </a>
      </div>
    )
  }
}
