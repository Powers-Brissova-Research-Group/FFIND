
import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from '../pancreatlas/registerServiceWorker'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<registerServiceWorker />, div)
})
