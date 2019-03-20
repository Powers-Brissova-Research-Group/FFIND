
import React from 'react'
import ReactDOM from 'react-dom'
import PageNotFound from '../pancreatlas/PageNotFound'
import { MemoryRouter } from 'react-router-dom'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<MemoryRouter><PageNotFound /></MemoryRouter>, div)
})
