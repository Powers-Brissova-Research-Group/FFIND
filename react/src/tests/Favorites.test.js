
import React from 'react'
import ReactDOM from 'react-dom'
import Favorites from '../pancreatlas/Favorites'
import { MemoryRouter } from 'react-router-dom'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<MemoryRouter><Favorites /></MemoryRouter>, div)
})
