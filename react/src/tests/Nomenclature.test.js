
import React from 'react'
import ReactDOM from 'react-dom'
import Nomenclature from '../pancreatlas/Nomenclature'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'

library.add(faAngleRight)

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Nomenclature />, div)
})
