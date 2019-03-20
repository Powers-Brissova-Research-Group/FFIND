
import React from 'react'
import ReactDOM from 'react-dom'
import BrowserNotSupportedBanner from '../BrowserNotSupportedBanner'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<BrowserNotSupportedBanner />, div)
})
