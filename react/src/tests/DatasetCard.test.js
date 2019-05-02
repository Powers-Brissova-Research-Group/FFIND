/* eslint-env jest */

import React from 'react'
import ReactDOM from 'react-dom'

import { MemoryRouter } from 'react-router-dom'
import { DropdownToggle, Button } from 'reactstrap'

import { mount } from 'enzyme'

import DatasetCard from '../pancreatlas/DatasetCard'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<MemoryRouter><DatasetCard /></MemoryRouter>, div)
})

describe('buttons', () => {
  let wrapper = null

  beforeEach(() => {
    wrapper = mount(<MemoryRouter><DatasetCard /></MemoryRouter>)
  })

  it('Dropdown works', () => {
    let button = wrapper.find(DropdownToggle).find(Button)
    button.simulate('click')
    wrapper.update()
    let dscard = wrapper.find(DatasetCard)
    expect(dscard.state().dropdownOpen).toBe(true)
  })
})
