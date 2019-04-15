/* eslint-env jest */

import React from 'react'
import ReactDOM from 'react-dom'
import AgeFilterItem from '../pancreatlas/AgeFilterItem'

import { mount } from 'enzyme'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<AgeFilterItem />, div)
})

describe('Changes on slider change', () => {
  let wrapper = null

  beforeEach(() => {
    wrapper = mount(<AgeFilterItem ages={['G8w', 'G10w', 'G3m']} />)
  })

  it('renders handles properly', () => {
    expect(wrapper.find('.rc-slider-handle-1').exists()).toBeTruthy()
    expect(wrapper.find('.rc-slider-handle-2').exists()).toBeTruthy()
  })

  xit('calls proper methods', () => {
    // wrapper.instance().updateMarks = jest.fn()
    const FakeUpdate = jest.spyOn(AgeFilterItem.prototype, 'updateMarks')
    let handle1 = wrapper.find('div.rc-slider-handle-1').first()
    handle1.simulate('mousedown')
    handle1.simulate('mouseup')
    console.log(handle1.debug())
    wrapper.update()
    expect(FakeUpdate).toHaveBeenCalled()
  })
})
