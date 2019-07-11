/* eslint-env jest */
import React from 'react'
import ReactDOM from 'react-dom'
import AgeBrowser from '../pancreatlas/AgeBrowser'

import axios from 'axios'

jest.mock('axios')

describe('loads data properyly', () => {
  let dataset =
    {
      'did': 410,
      'dsname': 'Cystic Fibrosis-Related Diabetes (CFRD)',
      'desc': 'Altered pancreatic architecture in the context of cystic fibrosis',
      'kvals': {
        'active': 'true'
      }
    }

  const mockResp = { data: dataset }
  axios.get.mockImplementation(() => Promise.resolve(mockResp))

  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<AgeBrowser match={{ params: { dsid: 410 } }} />, div)
  })
})