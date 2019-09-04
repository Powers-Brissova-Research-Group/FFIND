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

import TopNav from './TopNav'
import PancreatlasFooter from './pancreatlas/PancreatlasFooter'
import WarningBanner from './WarningBanner'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faLink, faEnvelope, faPhone, faGem, faMedkit, faUsers, faFlask, faVial, faHandPointer, faSearchPlus, faCopy, faPaperPlane, faExternalLinkAlt, faBookmark, faRedo, faBook, faAngleRight, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { faBookmark as faBookmarkOutline } from '@fortawesome/free-regular-svg-icons'
import Releases from './Releases'
import Diabetes from './Diabetes'
import Collaborators from './Collaborators'
import Home from './Home'
import About from './About'

import DatasetListPage from './pancreatlas/DatasetListPage'
import AgeBrowser from './pancreatlas/AgeBrowser'
import MatrixView from './pancreatlas/MatrixView'
import Nomenclature from './pancreatlas/Nomenclature'
import Favorites from './pancreatlas/Favorites'
import DatasetOverview from './pancreatlas/DatasetOverview'
import PageNotFound from './pancreatlas/PageNotFound'
import Resources from './Resources'

library.add(faLink, faEnvelope, faPhone, faGem, faMedkit, faUsers, faFlask, faVial, faHandPointer, faSearchPlus, faCopy, faPaperPlane, faExternalLinkAlt, faBookmark, faBookmarkOutline, faRedo, faBook, faAngleRight, faAngleDown)

class App extends Component {
// blank line for new commit
  constructor (props) {
    super(props)

    Sentry.init({
      dsn: 'https://727efb032f954ff7baf2421cbcf2ace8@sentry.io/1412698',
      release: `pancreatlas@${process.env.REACT_APP_VERSION}`
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
    var browser = detect()
    var supported = true

    if (browser !== null) {
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
    } else {
      supported = false
      browser = {
        name: 'Unknown',
        version: '-1'
      }
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
    var browserName = browser.name === 'ie' ? 'Internet Explorer' : browser.name
    var version = supportInfo.browserInfo.version
    // if (browser.name.toLowerCase() !== 'firefox' && browser.name.toLowerCase() !== 'chrome'){
    //   supported = false
    // }

    if (this.state.error) {
      return <Button onClick={() => Sentry.showReportDialog()}>Report feedback</Button>
    } else {
      return (
        <div>
          <WarningBanner>
            <h5>WARNING: You are currently using a development version of Pancreatlas. Note that features are not guaranteed to work and that you must log into OMERO to use PathViewer.</h5>
          </WarningBanner>
          {supported === false && <WarningBanner><h5>Sorry, but your browser ({browserName.charAt(0).toUpperCase() + browserName.slice(1) + ' ' + version}) is not supported and some site features may not work properly.</h5><p>Please consider using the most recent versions of <a href='https://www.mozilla.org/en-US/firefox/new/'>Mozilla Firefox</a> or <a href='https://www.google.com/chrome'>Google Chrome</a>.</p></WarningBanner>}
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
                <Route exact path='/' component={Home} />
                {/* <Route path={`/pancreatlas`} render={(props) => <PancreatlasApp {...props} favoriteCallback={this.addFavorite} favorites={this.state.encodedFavorites} />} /> */}
                <Route path='/releases' component={Releases} />
                <Route path='/diabetes' component={Diabetes} />
                <Route path='/collaborators' component={Collaborators} />
                <Route path='/about' component={About} />

                <Route exact path={`/datasets`} component={DatasetListPage} />
                <Route exact path={`/datasets/:did`} render={(props) => <AgeBrowser {...props} favoriteCallback={this.addFavorite} favorites={JSON.parse(window.atob(this.state.encodedFavorites))} />} />
                {/* <Route path='/pancreatlas/image/:iid' component={ImageDetail} /> */}
                <Route path='/matrixview/:dsid' component={MatrixView} />
                <Route path='/nomenclature' component={Nomenclature} />
                <Route path={`/favorites`} render={(props) => <Favorites {...props} favoriteCallback={this.addFavorite} favorites={JSON.parse(window.atob(this.state.encodedFavorites))} />} />
                <Route path={`/datasets/:did/overview`} component={DatasetOverview} />
                <Route path='/resources' component={Resources} />
                <Route component={PageNotFound} />

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
