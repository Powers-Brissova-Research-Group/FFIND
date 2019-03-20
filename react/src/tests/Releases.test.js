
import React from 'react'
import ReactDOM from 'react-dom'
import Releases from '../Releases'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Releases />, div)
})
