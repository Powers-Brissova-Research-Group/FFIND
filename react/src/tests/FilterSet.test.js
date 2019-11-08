/* eslint-env jest */

import React from 'react'
import ReactDOM from 'react-dom'
import FilterSet from '../pancreatlas/FilterSet'

import {
  FontAwesomeIcon
} from '@fortawesome/react-fontawesome'

import { mount } from 'enzyme'

xit('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<FilterSet />, div)
})

describe('Collapse changes state as expected', () => {
  let wrapper = null

  beforeEach(() => {
    wrapper = mount(<FilterSet />)
  })

  xit('Should change collapse state when user clicks icon', () => {
    wrapper.find(FontAwesomeIcon).first().simulate('click')
    expect(wrapper.state().open).toBe(false)
  })
})
