
import React from 'react'
import ReactDOM from 'react-dom'
import DatasetOverview from '../pancreatlas/DatasetOverview'
import { MemoryRouter } from 'react-router-dom'


it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<MemoryRouter><DatasetOverview /></MemoryRouter>, div)
})
