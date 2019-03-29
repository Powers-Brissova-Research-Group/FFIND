
import React from 'react'
import ReactDOM from 'react-dom'
import AgeFilterItem from '../pancreatlas/AgeFilterItem'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<AgeFilterItem />, div)
})
