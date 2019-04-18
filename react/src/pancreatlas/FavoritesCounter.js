import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class FavoritesCounter extends React.Component {
  render () {
    return (
      <div className='favorites-counter'>
        <FontAwesomeIcon className='w-100' icon='book' color='grey' size='4x' />
        <h3 style={{ textAlign: 'center' }}>Favorites: {this.props.count}</h3>
      </div>
    )
  }
}

FavoritesCounter.defaultProps = {
  count: -1
}
