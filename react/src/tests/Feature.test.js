
import React from 'react'
import ReactDOM from 'react-dom'
import Feature from '../Feature'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faRedo } from '@fortawesome/free-solid-svg-icons'

library.add(faRedo)


it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Feature />, div)
})
