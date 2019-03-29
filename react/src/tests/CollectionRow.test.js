
import React from 'react'
import ReactDOM from 'react-dom'
import CollectionRow from '../pancreatlas/CollectionRow'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<CollectionRow />, div)
})
