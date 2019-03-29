
import React from 'react'
import ReactDOM from 'react-dom'
import MatrixModalListComponent from '../pancreatlas/MatrixModalListComponent'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<MatrixModalListComponent />, div)
})
