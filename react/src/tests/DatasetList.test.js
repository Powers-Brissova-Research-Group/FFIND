/* eslint-env jest */

import React from 'react'
import ReactDOM from 'react-dom'
import DatasetList from '../pancreatlas/DatasetList'
import LoadingBar from '../pancreatlas/LoadingBar'
import { NavLink } from 'reactstrap'
import { mount } from 'enzyme'

import { MemoryRouter } from 'react-router-dom'

import axios from 'axios'

jest.mock('axios')

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<MemoryRouter><DatasetList /></MemoryRouter>, div)
})

describe('tabs work when clicked', () => {
  let root = null
  let wrapper = null
  let spy = null

  let datasets = [
    {
      'did': 384,
      'dsname': 'Human Pancreas Development',
      'desc': 'Human endocrine pancreas architecture from birth to childhood',
      'kvals': {
        'funding': 'helmsley',
        'release_status': 'development',
        'image_count': '231',
        'release_date': '2019-01-01',
        'citations': '{"12345": "This is a citation string", "54321": "This is another citation string"}',
        'description_long': 'Proin finibus venenatis velit, id vehicula lacus auctor eu. Nunc interdum eu mi id lobortis.'
      }
    }
  ]

  const mockResp = { data: datasets }
  axios.get.mockImplementation(() => Promise.resolve(mockResp))

  beforeEach(() => {
    spy = jest.spyOn(DatasetList.prototype, 'componentDidMount')
    root = mount(<MemoryRouter><DatasetList /></MemoryRouter>)
    wrapper = root.find(DatasetList).first()
  })

  it('ComponentDidMount called', () => {
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('Loading bar rendering', () => {
    expect(wrapper.find(LoadingBar)).toHaveLength(1)
  })

  it('Shows navlinks', () => {
    expect(wrapper.state().loaded).toEqual(true)
    root.update()
    expect(root.find('.dataset-lists').exists()).toBeTruthy()
  })

  it('Should have working tab buttons', () => {
    root.update()
    let tabs = root.find(NavLink)
    let dsList = root.find(DatasetList).first()
    expect(tabs).toHaveLength(2)
    let tabOne = tabs.first()
    let tabTwo = tabs.at(1)
    tabOne.simulate('click')
    expect(dsList.state().activeTab).toEqual('0')
    tabTwo.simulate('click')
    expect(dsList.state().activeTab).toEqual('1')
  })
})
