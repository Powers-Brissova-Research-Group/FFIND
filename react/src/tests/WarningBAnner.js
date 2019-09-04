
import React from 'react'
import ReactDOM from 'react-dom'
import WarningBanner from '../WarningBanner'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<WarningBanner />, div)
})
