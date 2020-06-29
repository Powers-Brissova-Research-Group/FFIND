import React from 'react'
import {
  Container,
  Row,
  Col
} from 'reactstrap'

import { 
  Banner,
  DatasetList,
  Feature,
  SponsorLogo 
} from '../utils'

import Helmsley from '../../assets/img/sponsor/helmsley.webp'
import HelmsleyAlt from '../../assets/img/sponsor/helmsley.jpg'

import HIRN from '../../assets/img/sponsor/hirn.webp'
import HIRNAlt from '../../assets/img/sponsor/hirn.jpg'

import IIAM from '../../assets/img/sponsor/iiam.webp'
import IIAMAlt from '../../assets/img/sponsor/IIAM.png'

import IIDP from '../../assets/img/sponsor/iidp.webp'
import IIDPAlt from '../../assets/img/sponsor/IIDP.png'

import NDRI from '../../assets/img/sponsor/ndri.webp'
import NDRIAlt from '../../assets/img/sponsor/NDRI.jpg'

import VUMC from '../../assets/img/sponsor/vumc.webp'
import VUMCAlt from '../../assets/img/sponsor/VUMC.png'

export default class Home extends React.Component {
  constructor (props) {
    super(props)
    this.aboutRef = React.createRef()

    this.scrollToAbout = this.scrollToAbout.bind(this)
  }

  scrollToAbout () {
    // console.log(this.myRef)
    window.scrollTo(0, this.aboutRef.current.offsetTop)
  }

  componentDidMount () {
    console.log(this.myRef)
  }

  render () {
    return (
      <div className='home'>
        <Banner />
        <div className='dataset-list' ref={this.aboutRef}>
          <Container className='mt-4'>
            <h1 className='my-4 py-4'><strong>Image Collections</strong></h1>
            <DatasetList />
          </Container>
        </div>
      </div>
    )
  }
}
