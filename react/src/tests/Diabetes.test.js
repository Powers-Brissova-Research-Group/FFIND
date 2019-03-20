
import React from 'react'
import ReactDOM from 'react-dom'
import Diabetes from '../Diabetes'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Diabetes />, div)
})
