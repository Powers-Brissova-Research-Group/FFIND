
import React from 'react'
import ReactDOM from 'react-dom'
import PancreatlasFooter from '../pancreatlas/PancreatlasFooter'
import { MemoryRouter } from 'react-router-dom'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faHandPointer } from '@fortawesome/free-solid-svg-icons'

library.add(faHandPointer)

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<MemoryRouter><PancreatlasFooter /></MemoryRouter>, div)
})
