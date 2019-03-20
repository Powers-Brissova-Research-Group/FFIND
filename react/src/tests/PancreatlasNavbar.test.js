
import React from 'react'
import ReactDOM from 'react-dom'
import PancreatlasNavbar from '../pancreatlas/PancreatlasNavbar'
import { MemoryRouter } from 'react-router-dom'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<MemoryRouter><PancreatlasNavbar /></MemoryRouter>, div)
})
