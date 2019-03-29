
import React from 'react'
import ReactDOM from 'react-dom'
import FilterItem from '../pancreatlas/FilterItem'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<FilterItem />, div)
})
