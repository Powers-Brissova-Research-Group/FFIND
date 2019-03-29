
import React from 'react'
import ReactDOM from 'react-dom'
import ImageCard from '../pancreatlas/ImageCard'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<ImageCard />, div)
})
