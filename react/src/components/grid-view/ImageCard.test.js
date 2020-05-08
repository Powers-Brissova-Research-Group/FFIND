/* eslint-env jest */

import React from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import axiosMock from 'axios'
import ImageCard from './ImageCard'

jest.mock('axios')

test('Loads properly from input', async () => {
  const imageId = 19072
  const mockFilterCallback = jest.fn()

  render(<ImageCard iid={imageId} callback={mockFilterCallback} />)

  axiosMock.get.mockResolvedValueOnce({
    data: {
      'iid': 19072,
      'iname': 'DON121-ND-1d-F-Hea.jpg',
      'pathpath': 'https://omero.app.vumc.org/pathviewer/viewer/#?slide=19072&q_image=19072&tabs=VDp',
      'tags': [
        {
          'tag': 'ND',
          'tagset': 'Disease Status'
        },
        {
          'tag': '1d',
          'tagset': 'Age-NEONATAL'
        },
        {
          'tag': 'F',
          'tagset': 'Sex'
        },
        {
          'tag': 'CPEP',
          'tagset': 'Marker'
        },
        {
          'tag': 'GCG',
          'tagset': 'Marker'
        },
        {
          'tag': 'SST',
          'tagset': 'Marker'
        },
        {
          'tag': 'DAPI',
          'tagset': 'Marker'
        },
        {
          'tag': 'Head',
          'tagset': 'Pancreas Region'
        },
        {
          'tag': 'Fluorescence IHC',
          'tagset': 'Modality'
        }
      ],
      'kvals': {
        'Stain info - cy5-Ab': {
          'val': '',
          'desc': 'default val'
        },
        'Donor info - LIMS ID': {
          'val': 'DON121',
          'desc': 'default val'
        },
        'Image info - File Type': {
          'val': 'Aperio',
          'desc': 'default val'
        },
        'Stain info - cy2': {
          'val': 'CPEP',
          'desc': 'default val'
        },
        'Stain info - cy5': {
          'val': 'SST',
          'desc': 'default val'
        },
        'Image info - Section Plane': {
          'val': 'Sagittal',
          'desc': 'default val'
        },
        'External id': {
          'val': '439029',
          'desc': 'default val'
        },
        'Image info - Modality': {
          'val': 'Fluorescence IHC',
          'desc': 'default val'
        },
        'Donor info - Sex': {
          'val': 'F',
          'desc': 'default val'
        },
        'File path': {
          'val': '/mnt/drtc-aperio/images3/2019-02-22/439029.afi',
          'desc': 'default val'
        },
        'Donor info - Age': {
          'val': '1d',
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
          'val': 'Head',
          'desc': 'default val'
        },
        'Donor info - UNOS ID': {
          'val': 'AEDJ236',
          'desc': 'default val'
        }
      },
      'channel_info': {
        'DAPI': '0000FF',
        'SST': 'FFFFFF',
        'CPEP': '00FF00',
        'GCG': 'FF0000'
      }
    }
  })

  expect(axiosMock.get).toHaveBeenCalledTimes(1)
})
