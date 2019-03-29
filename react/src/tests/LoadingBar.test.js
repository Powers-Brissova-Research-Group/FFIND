
import React from 'react'
import ReactDOM from 'react-dom'
import LoadingBar from '../pancreatlas/LoadingBar'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<LoadingBar />, div)
})
