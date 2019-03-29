
import React from 'react'
import ReactDOM from 'react-dom'
import DatasetOverview from '../pancreatlas/DatasetOverview'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<DatasetOverview />, div)
})
