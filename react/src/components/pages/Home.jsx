import React from 'react'
import {
  Container
} from 'reactstrap'

import { 
  Banner,
  DatasetList
} from '../utils'

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
