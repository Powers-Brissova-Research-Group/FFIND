
import React from 'react'
import ReactDOM from 'react-dom'
import MatrixView from '../pancreatlas/MatrixView'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<MatrixView />, div)
})
