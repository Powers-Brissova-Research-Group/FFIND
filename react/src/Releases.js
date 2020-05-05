import React from 'react'
import {
  Container,
  Row,
  Col
} from 'reactstrap'

import PageBanner from './pancreatlas/PageBanner'

import axios from 'axios'

export default class Releases extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      versions: {},
      loaded: false
    }
  }

  componentDidMount () {
    var releaseNotes = require('./assets/txt/release_notes')
    var Remarkable = require('remarkable')
    var md = new Remarkable()
    for (let key of Object.keys(releaseNotes)) {
      axios.get(releaseNotes[key]).then(resp => {
        var version = key.replace('_', '.')
        var newVersions = JSON.parse(JSON.stringify(this.state.versions))
        newVersions[version] = md.render(resp.data)
        this.setState({ versions: newVersions })
      })
    }
  }

  render () {
    console.log(this.state.versions)
    return (
      <div className='release-info'>
        <PageBanner image bgImg={require('./assets/img/headers/releases-header.jpg')}>
          <h1>Release History</h1>
          <p className='text-larger'>Find info about each of our releases here</p>
        </PageBanner>
        <Container>
          {Object.keys(this.state.versions).map(version => {
            return (
              <Row className='py-4 border-bottom'>
                <Col md='12' dangerouslySetInnerHTML={{ __html: this.state.versions[version] }} />
              </Row>
            )
          })}
        </Container>
      </div>
    )
  }
}
