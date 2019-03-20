
import React from 'react'
import ReactDOM from 'react-dom'
import HomePage from '../pancreatlas/HomePage'
import { MemoryRouter } from 'react-router-dom'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<MemoryRouter><HomePage /></MemoryRouter>, div)
})
