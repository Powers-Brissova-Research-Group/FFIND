
import React from 'react'
import ReactDOM from 'react-dom'
import DatasetPage from '../pancreatlas/DatasetPage'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<DatasetPage />, div)
})
