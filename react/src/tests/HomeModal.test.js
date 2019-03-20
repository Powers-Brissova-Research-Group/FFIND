
import React from 'react'
import ReactDOM from 'react-dom'
import HomeModal from '../HomeModal'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<HomeModal />, div)
})
