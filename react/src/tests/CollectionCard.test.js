
import React from 'react'
import ReactDOM from 'react-dom'
import CollectionCard from '../pancreatlas/CollectionCard'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<CollectionCard />, div)
})
