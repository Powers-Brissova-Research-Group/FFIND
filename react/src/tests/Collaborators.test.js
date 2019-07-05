
import React from 'react'
import ReactDOM from 'react-dom'
import Collaborators from '../Collaborators'
import { MemoryRouter } from 'react-router-dom'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<MemoryRouter><Collaborators /></MemoryRouter>, div)
})
