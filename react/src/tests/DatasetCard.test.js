
import React from 'react'
import ReactDOM from 'react-dom'
import DatasetCard from '../pancreatlas/DatasetCard'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<DatasetCard />, div)
})
