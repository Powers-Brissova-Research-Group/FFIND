/* eslint-env jest */

import React from 'react'
import ReactDOM from 'react-dom'
import ImageCard from '../pancreatlas/ImageCard'

import { mount } from 'enzyme'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearchPlus, faBookmark } from '@fortawesome/free-solid-svg-icons'
import { faBookmark as faBookmarkOutline } from '@fortawesome/free-regular-svg-icons'

import axios from 'axios'

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
    'iid': 16771,
    'iname': 'FHP-2796-ND-G17.3w-Unknow.jpg',
    'thumbpath': '/var/www/assets/pancreatlas/thumb/FHP-2796-ND-G17.3w-Unknow.jpg',
    'detailpath': '/home/jmessmer/Projects/pancreatlas/api/pancreatlas/assets/details/FHP-2796-ND-G17.3w-Unknow.jpg',
    'pathpath': 'https://omero.app.vumc.org/pathviewer/viewer/16771',
    'tags': [
      'DAPI',
      'GCG',
      'SST',
      'ND',
      'Transverse',
      'FHP-2796',
      'G17.3w',
      'Aperio',
      'Unknown'
    ],
    'kvals': {
      'Stain info - cy5-Ab': {
        'val': '',
        'desc': 'default val'
      },
      'Donor info - LIMS ID': {
        'val': '',
        'desc': 'default val'
      },
      'Donor info - Sex': {
        'val': 'Unknown',
        'desc': 'default val'
      },
      'Image info - File Type': {
        'val': 'Aperio',
        'desc': 'default val'
      },
      'Stain info - cy2': {
        'val': 'INS',
        'desc': 'default val'
      },
      'Stain info - cy5': {
        'val': 'SST',
        'desc': 'default val'
      },
      'Image info - Section Plane': {
        'val': 'Transverse',
        'desc': 'default val'
      },
      'Image info - Annotations': {
        'val': 'yes',
        'desc': 'default val'
      },
      'External id': {
        'val': '89346',
        'desc': 'default val'
      },
      'Image info - Analysis': {
        'val': 'yes',
        'desc': 'default val'
      },
      'File path': {
        'val': '/mnt/drtc-aperio/Images/2013-08-23/89346.afi',
        'desc': 'default val'
      },
      'Donor info - Age': {
        'val': 'G17.3w',
        'desc': 'default val'
      },
      'Stain info - cy2-Ab': {
        'val': '',
        'desc': 'default val'
      },
      'Stain info - cy3': {
        'val': 'GCG',
        'desc': 'default val'
      },
      '(DS notes)': {
        'val': 'slide 21',
        'desc': 'default val'
      },
      'Donor info - Disease Status': {
        'val': 'ND',
        'desc': 'default val'
      },
      'Donor info - Disease Duration': {
        'val': '',
        'desc': 'default val'
      },
      'Stain info - cy3-Ab': {
        'val': '',
        'desc': 'default val'
      },
      'Stain info - DAPI': {
        'val': 'DAPI',
        'desc': 'default val'
      },
      'Image info - Pancreas Region': {
        'val': '',
        'desc': 'default val'
      },
      'Donor info - UNOS ID': {
        'val': 'FHP-2796',
        'desc': 'default val'
      }
    },
    'channel_info': {
      'DAPI': '0000FF',
      'CY2': '00FF00',
      'CY3': 'FF0000',
      'CY5': 'FFFFFF'
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
