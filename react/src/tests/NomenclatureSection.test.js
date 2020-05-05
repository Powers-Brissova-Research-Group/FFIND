/* eslint-env jest */

import React from 'react'
import NomenclatureSection from '../pancreatlas/NomenclatureSection'

import { mount } from 'enzyme'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'

library.add(faAngleRight)

describe('Working for all descriptions', () => {
  it('Loads description properly', () => {
    let defs = require('../assets/txt/definitions.json')
    for (let key of Object.keys(defs)) {
      let wrapper = mount(<NomenclatureSection data={defs[key]} sectionName={key} openOverride={false} />)
      expect(wrapper.find('.nomenclature-section')).toHaveLength(1)
    }
  })
})
