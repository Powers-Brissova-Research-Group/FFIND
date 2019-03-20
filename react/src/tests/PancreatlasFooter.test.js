
import React from 'react'
import ReactDOM from 'react-dom'
import PancreatlasFooter from '../pancreatlas/PancreatlasFooter'
import { MemoryRouter } from 'react-router-dom'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<MemoryRouter><PancreatlasFooter /></MemoryRouter>, div)
})
