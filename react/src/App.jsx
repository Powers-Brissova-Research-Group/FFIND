import React, { Component } from 'react'
import './App.css'

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'


import { library } from '@fortawesome/fontawesome-svg-core'
import { faLink, faEnvelope, faPhone, faGem, faMedkit, faUsers, faFlask, faVial, faHandPointer, faSearchPlus, faCopy, faPaperPlane, faExternalLinkAlt, faBookmark, faRedo, faBook, faAngleRight, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { faBookmark as faBookmarkOutline } from '@fortawesome/free-regular-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'

import {
  About,
  DatasetListPage,
  Favorites,
  Home,
  PageNotFound,
} from './components/pages'

import {
  MatrixView
} from './components/matrix-view'


import {
  DatasetOverview,
  GridView,
  Footer,
  TopNav,
  WarningBanner
} from './components/utils'

library.add(faLink, faEnvelope, faPhone, faGem, faMedkit, faUsers, faFlask, faVial, faHandPointer, faSearchPlus, faCopy, faPaperPlane, faExternalLinkAlt, faBookmark, faBookmarkOutline, faRedo, faBook, faAngleRight, faAngleDown, faTwitter)

class App extends Component {
  // blank line for new commit
  constructor(props) {
    super(props)

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
      error: null,
      userInfoDisplay: false,
    }
  }

  checkCompatability() {
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

  addFavorite(iid) {
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

  componentDidMount() {
    window.setTimeout(this.showInfoModal, 120000)
  }

  render() {
    var supportInfo = this.checkCompatability()
    var supported = supportInfo.isSupported
    var browser = supportInfo.browserInfo
    var browserName = browser.name === 'ie' ? 'Internet Explorer' : browser.name
    var version = supportInfo.browserInfo.version
    // if (browser.name.toLowerCase() !== 'firefox' && browser.name.toLowerCase() !== 'chrome'){
    //   supported = false
    // }


    return (
      <div>
        {supported === false && <WarningBanner><h5>Sorry, but your browser ({browserName.charAt(0).toUpperCase() + browserName.slice(1) + ' ' + version}) is not supported and some site features may not work properly.</h5><p>Please consider using the most recent versions of <a href='https://www.mozilla.org/en-US/firefox/new/'>Mozilla Firefox</a> or <a href='https://www.google.com/chrome'>Google Chrome</a>.</p></WarningBanner>}
        <Router basename={process.env.PUBLIC_URL}>
          <div className='App'>
            <TopNav favorites={this.state.encodedFavorites} />
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/about' component={About} />

              <Route exact path={`/datasets`} component={DatasetListPage} />
              <Route exact path={`/datasets/:did/explore`} render={(props) => <GridView {...props} favoriteCallback={this.addFavorite} favorites={JSON.parse(window.atob(this.state.encodedFavorites))} />} />
              <Route exact path={`/datasets/:did/explore/:iid`} render={(props) => <GridView {...props} favoriteCallback={this.addFavorite} favorites={JSON.parse(window.atob(this.state.encodedFavorites))} />} />
              <Route path={`/datasets/:did/overview`} component={DatasetOverview} />

              <Route exact path={`/explore-all-images`} render={(props) => <GridView {...props} favoriteCallback={this.addFavorite} favorites={JSON.parse(window.atob(this.state.encodedFavorites))} />} />
              <Route exact path={`/explore-all-images/:iid`} render={(props) => <GridView {...props} favoriteCallback={this.addFavorite} favorites={JSON.parse(window.atob(this.state.encodedFavorites))} />} />

              <Route path='/matrixview/:dsid' component={MatrixView} />

              <Route path={`/favorites`} render={(props) => <Favorites {...props} favoriteCallback={this.addFavorite} favorites={JSON.parse(window.atob(this.state.encodedFavorites))} />} />

              {/* <Route path='/pancreatlas/image/:iid' component={ImageDetail} /> */}
              <Route component={PageNotFound} />

            </Switch>
            <Footer />
          </div>
        </Router>
      </div>
    )
  }
}

export default App
