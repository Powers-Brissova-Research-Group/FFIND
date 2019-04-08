/* eslint-env jest */

import React from 'react'
import ReactDOM from 'react-dom'
import FilterItem from '../pancreatlas/FilterItem'
import { Input } from 'reactstrap'
import { mount } from 'enzyme'

let mockCallback = jest.fn(x => x)

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<FilterItem />, div)
})

describe('Checkbox works as intended', () => {
  let wrapper = null

  beforeEach(() => {
    wrapper = mount(<FilterItem defaultChecked={false} callback={mockCallback} />)
  })

  it('Should call callback when clicked', () => {
    let checkbox = wrapper.find(Input).first()
    checkbox.simulate('change')
    expect(mockCallback).toBeCalledTimes(1)
  })
})
