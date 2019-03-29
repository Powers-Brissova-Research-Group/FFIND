
import React from 'react'
import ReactDOM from 'react-dom'
import CollectionList from '../pancreatlas/CollectionList'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<CollectionList />, div)
})
