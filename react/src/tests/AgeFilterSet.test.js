/* eslint-env jest */

import React from 'react'
import ReactDOM from 'react-dom'
import AgeFilterSet from '../pancreatlas/AgeFilterSet'

import { mount } from 'enzyme'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<AgeFilterSet />, div)
})

describe('Checkbox works properly', () => {
  let wrapper = null
  let mockCallback = jest.fn()
  beforeEach(() => {
    wrapper = mount(<AgeFilterSet ages={['4d', 'G12w', 'G12.3w', 'G15w', 'G15.5w', 'G17w', 'G17.3w', '1d', '5d', '2mo', '20mo', '3mo', '10y', '5y']} callback={mockCallback} />)
  })

  xit('calls updateFilters function', () => {
    let inputs = wrapper.find('Input')
    wrapper.instance().toggleGroup = mockCallback
    inputs.forEach((node) => {
      node.simulate('click')
      expect(mockCallback).toHaveBeenCalled()
    })
  })
})
