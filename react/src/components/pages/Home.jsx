import React from 'react'
import {
  Container
} from 'reactstrap'

import { 
  Banner,
  DatasetList
} from '../utils'

import conf from '../../assets/conf/conf.json'

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
        <Banner title={conf.title} subtitle={conf.subtitle} description={conf.description}/>
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
