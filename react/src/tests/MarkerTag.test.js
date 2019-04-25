
import React from 'react'
import ReactDOM from 'react-dom'
import MarkerTag from '../pancreatlas/MarkerTag'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<MarkerTag marker='dapi' iid={1000} />, div)
})
