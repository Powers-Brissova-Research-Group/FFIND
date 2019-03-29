
import React from 'react'
import ReactDOM from 'react-dom'
import DatasetList from '../pancreatlas/DatasetList'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<DatasetList />, div)
})
