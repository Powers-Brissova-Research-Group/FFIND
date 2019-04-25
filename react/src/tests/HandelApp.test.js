
import React from 'react'
import ReactDOM from 'react-dom'
import { MemoryRouter } from 'react-router-dom'
import HandelApp from '../HandelApp'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUsers, faVial, faFlask } from '@fortawesome/free-solid-svg-icons'

library.add(faUsers, faVial, faFlask)

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <MemoryRouter>
      <HandelApp />
    </MemoryRouter>, div)
})
