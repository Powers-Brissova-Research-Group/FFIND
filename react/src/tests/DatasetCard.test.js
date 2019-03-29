
import React from 'react'
import ReactDOM from 'react-dom'
import DatasetCard from '../pancreatlas/DatasetCard'

xit('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<DatasetCard />, div)
})
