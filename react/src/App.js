import React, { Component } from 'react'
import './App.css'

import * as Sentry from '@sentry/browser'

import {
  Button
} from 'reactstrap'

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
import { faGem, faMedkit, faUsers, faFlask, faVial, faHandPointer, faSearchPlus, faCopy, faPaperPlane, faExternalLinkAlt, faBookmark } from '@fortawesome/free-solid-svg-icons'
import Releases from './Releases'

library.add(faGem, faMedkit, faUsers, faFlask, faVial, faHandPointer, faSearchPlus, faCopy, faPaperPlane, faExternalLinkAlt, faBookmark)

class App extends Component {
  constructor (props) {
    super(props)

    Sentry.init({
      dsn: 'https://727efb032f954ff7baf2421cbcf2ace8@sentry.io/1412698'
    })

    this.addFavorite = this.addFavorite.bind(this)
    this.checkCompatability = this.checkCompatability.bind(this)
    this.addFavorite = this.addFavorite.bind(this)

    let urlVars = new URLSearchParams(window.location.search)

    let favs = []
    let encFavs = window.btoa(JSON.stringify(favs))
    if (urlVars.has('iids')) {
      favs = JSON.parse(window.atob(urlVars.get('iids')))
      encFavs = urlVars.get('iids')
    }
    this.state = {
      favorites: favs,
      encodedFavorites: encFavs,
      error: null
    }
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

  addFavorite (iid) {
    if (this.state.favorites.indexOf(iid) !== -1) {
      let tmp = this.state.favorites
      tmp.splice(tmp.indexOf(iid), 1)
      this.setState({
        favorites: tmp,
        encodedFavorites: window.btoa(JSON.stringify(tmp))
      })
    } else {
      let tmp = this.state.favorites.concat(iid)
      this.setState({
        favorites: tmp,
        encodedFavorites: window.btoa(JSON.stringify(tmp))
      })
    }
  }

  componentDidCatch (error, errorInfo) {
    this.setState({ error })
    Sentry.withScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key])
      })
    })
    Sentry.captureException(error)
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

    if (this.state.error) {
      return <Button onClick={() => Sentry.showReportDialog()}>Report feedback</Button>
    } else {
      return (
        <div>
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
              <TopNav favorites={this.state.encodedFavorites} />
              <Switch>
                <Route exact path='/' component={HandelApp} />
                <Route path={`/pancreatlas`} render={(props) => <PancreatlasApp {...props} favoriteCallback={this.addFavorite} favorites={this.state.encodedFavorites} />} />
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
}

export default App
