/* eslint-env jest */

import React from 'react'
import ReactDOM from 'react-dom'
import ImageCard from '../pancreatlas/ImageCard'

import { mount } from 'enzyme'

import axios from 'axios'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearchPlus, faBookmark } from '@fortawesome/free-solid-svg-icons'
import { faBookmark as faBookmarkOutline } from '@fortawesome/free-regular-svg-icons'

library.add(faSearchPlus, faBookmark, faBookmarkOutline)

jest.mock('axios')

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<ImageCard iid='16771' />, div)
})

describe('Image Card works', () => {
  let wrapper = null
  let spy = null
  let fav = true

  let mockFavorite = jest.fn(() => {
    fav = !fav
    wrapper.setProps({ isFavorite: fav })
  })
  let mockFilter = jest.fn(() => console.log('filter'))
  let mockModal = jest.fn(() => console.log('modal'))

  let data = {
    'iid': 17839,
    'iname': '329635.jpg',
    'thumbpath': '/var/www/assets/pancreatlas/thumb/329635.jpg',
    'detailpath': '/home/jmessmer/Projects/pancreatlas/api/pancreatlas/assets/details/329635.jpg',
    'pathpath': 'https://omero.app.vumc.org/pathviewer/viewer/17839',
    'tags': [
      {
        'tag': 'ADH4365',
        'tagset': 'UNOS ID'
      },
      {
        'tag': 'Tail',
        'tagset': 'Pancreas Region'
      },
      {
        'tag': '34y',
        'tagset': 'Age'
      },
      {
        'tag': 'Aperio',
        'tagset': 'File Type'
      },
      {
        'tag': 'INS (DAB)',
        'tagset': 'Marker'
      },
      {
        'tag': 'Hematoxylin',
        'tagset': 'Marker'
      },
      {
        'tag': 'F',
        'tagset': 'Sex'
      },
      {
        'tag': 'CFRD',
        'tagset': 'Disease Status'
      },
      {
        'tag': '10y',
        'tagset': 'Disease Duration'
      }
    ],
    'kvals': {
      'Donor info - LIMS ID': {
        'val': 'DON93',
        'desc': 'default val'
      },
      'Image info - File Type': {
        'val': 'Aperio',
        'desc': 'default val'
      },
      'Image info - Section Plane': {
        'val': '',
        'desc': 'default val'
      },
      'Stain info - brightfield-Ab': {
        'val': '',
        'desc': 'default val'
      },
      'Image info - Pancreas Region': {
        'val': 'Tail',
        'desc': 'default val'
      },
      'Stain info - cy3': {
        'val': '',
        'desc': 'default val'
      },
      'File path': {
        'val': '/mnt/drtc-aperio/images3/2017-10-13/329635.svs',
        'desc': 'default val'
      },
      'Donor info - Disease Duration': {
        'val': '10y',
        'desc': 'default val'
      },
      'Stain info - cy5': {
        'val': '',
        'desc': 'default val'
      },
      'Stain info - cy2': {
        'val': '',
        'desc': 'default val'
      },
      'Image info - Analysis': {
        'val': '',
        'desc': 'default val'
      },
      'Image info - Annotations': {
        'val': '',
        'desc': 'default val'
      },
      'Stain info - cy2-Ab': {
        'val': '',
        'desc': 'default val'
      },
      '(DS notes)': {
        'val': '',
        'desc': 'default val'
      },
      'Donor info - Disease Status': {
        'val': 'CFRD',
        'desc': 'default val'
      },
      'Stain info - cy3-Ab': {
        'val': '',
        'desc': 'default val'
      },
      'Donor info - Sex': {
        'val': 'F',
        'desc': 'default val'
      },
      'Donor info - UNOS ID': {
        'val': 'ADH4365',
        'desc': 'default val'
      },
      'Stain info - cy5-Ab': {
        'val': '',
        'desc': 'default val'
      },
      'Stain info - DAPI': {
        'val': '',
        'desc': 'default val'
      },
      'External id': {
        'val': '329635',
        'desc': 'default val'
      },
      'Stain info - brightfield': {
        'val': 'INS (DAB), Hematoxylin',
        'desc': 'default val'
      },
      'Donor info - Age': {
        'val': '34y',
        'desc': 'default val'
      }
    },
    'channel_info': {
      '0': 'FF0000',
      '1': '00FF00',
      '2': '0000FF'
    }
  }

  let mockResp = { data: data }

  axios.get.mockImplementation(() => Promise.resolve(mockResp))

  beforeEach(() => {
    spy = jest.spyOn(ImageCard.prototype, 'componentDidMount')
    wrapper = mount(<ImageCard iid='16771' isFavorite={fav} filterCallback={mockFilter} callback={mockModal} favoriteCallback={mockFavorite} />)
  })

  it('Loaded properly', () => {
    wrapper.update()

    expect(spy).toHaveBeenCalledTimes(1)
    expect(wrapper.state().loaded).toBe(true)
  })

  it('Filters when clicking markers', () => {
    wrapper.update()

    let marker = wrapper.find('.marker-nofilter').first()
    marker.simulate('click')
    expect(mockFilter).toHaveBeenCalledTimes(1)
  })

  it('Opens modal', () => {
    wrapper.update()

    let button = wrapper.find('#modal-button').first()
    button.simulate('click')
    expect(mockModal).toHaveBeenCalledTimes(1)
  })

  it('Saves properly', () => {
    wrapper.update()
    expect(wrapper.find('Button#save-button')).toHaveLength(1)
    let button = wrapper.find('Button#save-button').first()
    button.simulate('click')
    wrapper.update()
    expect(mockFavorite).toHaveBeenCalledTimes(1)
    expect(wrapper.props().isFavorite).toBe(false)
    expect(wrapper.find('Button#unsave-button')).toHaveLength(1)
  })
})
