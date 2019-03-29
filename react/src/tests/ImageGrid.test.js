
import React from 'react'
import ReactDOM from 'react-dom'
import ImageGrid from '../pancreatlas/ImageGrid'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<ImageGrid />, div)
})
