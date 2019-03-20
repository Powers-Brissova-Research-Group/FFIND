
import React from 'react'
import ReactDOM from 'react-dom'
import PancreatlasApp from '../pancreatlas/PancreatlasApp'
import { MemoryRouter } from 'react-router-dom'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<MemoryRouter><PancreatlasApp /></MemoryRouter>, div)
})
