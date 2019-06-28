
import React from 'react'
import ReactDOM from 'react-dom'
import About from '../About'
import { MemoryRouter } from 'react-router-dom'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<MemoryRouter><About /></MemoryRouter>, div)
})
