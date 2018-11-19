import React, { Component } from 'react'
import './App.css'

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import HandelApp from './HandelApp'
import PancreatlasApp from './pancreatlas/PancreatlasApp'
import TopNav from './TopNav'
import PancreatlasFooter from './pancreatlas/PancreatlasFooter'
import BrowserNotSupportedBanner from './BrowserNotSupportedBanner'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faGem, faMedkit, faUsers, faFlask, faVial, faHandPointer, faSearchPlus } from '@fortawesome/free-solid-svg-icons'
import Releases from './Releases'

library.add(faGem, faMedkit, faUsers, faFlask, faVial, faHandPointer, faSearchPlus)

class App extends Component {
  constructor (props) {
    super(props)
    this.checkCompatability = this.checkCompatability.bind(this)
  }

  checkCompatability () {
    const { detect } = require('detect-browser')
    const browser = detect()
    var supported = true

    switch (browser.name.toLowerCase()) {
      case 'firefox':
        if (parseInt(browser.version.split('.')[0], 10) < 50) {
          supported = false
        }
        break
      case 'chrome':
        if (parseInt(browser.version.split('.')[0], 10) < 55) {
          supported = false
        }
        break
      case 'ie':
      case 'safari':
      case 'opera':
      case 'edge':
        supported = false
        break
      default:
        supported = false
    }

    return { isSupported: supported, browserInfo: browser }
  }

  render () {
    var supportInfo = this.checkCompatability()
    var supported = supportInfo.isSupported
    var browser = supportInfo.browserInfo
    /* console.log(`Browser: ${JSON.stringify(supportInfo)}`) */
    var version = supportInfo.browserInfo.version
    // if (browser.name.toLowerCase() !== 'firefox' && browser.name.toLowerCase() !== 'chrome'){
    //   supported = false
    // }
    return (
      <div className='app'>
        {supported === false && <BrowserNotSupportedBanner version={version} browser={browser.name === 'ie' ? 'Internet Explorer' : browser.name} />}
        {/* <Container fluid className='test-feedback'>
          <Row>
            <Col sm="12">
              <p><strong>N.B. This is a test version of the Pancreatlas.</strong></p>
            </Col>
          </Row>
        </Container> */}
        <Router>
          <div className='App'>
            <TopNav />
            <Switch>
              <Route exact path='/' component={HandelApp} />
              <Route path='/pancreatlas' component={PancreatlasApp} />
              <Route path='/releases' component={Releases} />
              <Route path='/' component={HandelApp} />
            </Switch>
            <PancreatlasFooter />
          </div>
        </Router>
      </div>
    )
  }
}

export default App
