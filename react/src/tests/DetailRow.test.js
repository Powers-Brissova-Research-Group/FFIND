/* eslint-env jest */

import React from 'react'
import ReactDOM from 'react-dom'
import DetailRow from '../pancreatlas/DetailRow'

import { Table } from 'reactstrap'

import { mount } from 'enzyme'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<DetailRow />, div)
})

describe('Loads descriptions properly', () => {
  let wrapper = null
  let defs = require('../assets/pancreatlas/definitions.json')

  beforeEach(() => {
    const div = document.createElement('div')
    div.setAttribute('id', 'TooltipDiv')
    document.body.appendChild(div)
    wrapper = mount(<Table><tbody><DetailRow data='Sagittal' desc={defs['Image Tags']['Image info - Section Plane'].short_desc} heading='Section Plane' /></tbody></Table>, { attachTo: div })
  })

  it('Contains tags', () => {
    expect(defs['Image Tags']['Image info - Section Plane']).not.toBe(undefined)
  })

  it('Mounts properly', () => {
    let detailRow = wrapper.find(DetailRow).instance()
    detailRow.setState({ ttOpen: true })
    expect(detailRow.state.ttOpen).toBe(true)
  })
})
