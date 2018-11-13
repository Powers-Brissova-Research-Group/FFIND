import React, { Component } from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import HandelApp from './HandelApp';
import PancreatlasApp from './pancreatlas/PancreatlasApp'
import TopNav from './TopNav'
import Footer from './Footer'
import PancreatlasFooter from './pancreatlas/PancreatlasFooter'
import BrowserNotSupportedBanner from './BrowserNotSupportedBanner'


class App extends Component {

  constructor(props){
    super(props)
    this.checkCompatability = this.checkCompatability.bind(this)
    this.addFavorite = this.addFavorite.bind(this)

    let urlVars = new URLSearchParams(window.location.search)

    let favs = []
    let encFavs = window.btoa(JSON.stringify(favs))
    if(urlVars.has('iids')){
      favs = JSON.parse(window.atob(urlVars.get('iids')))
      encFavs = urlVars.get('iids')
    }
    this.state = {
      favorites: favs,
      encodedFavorites: encFavs
    }
  }

  checkCompatability(){
    const { detect } = require('detect-browser')
    const browser = detect()
    var supported = true

    switch(browser.name.toLowerCase()){
      case 'firefox':
        if (parseInt(browser.version.split('.')[0], 10) < 50){
          supported = false;
        }
        break
      case 'chrome':
        if (parseInt(browser.version.split('.')[0], 10) < 55){
          supported = false;
        }
        break
      case 'ie':
      case 'safari':
      case 'opera':
      case 'edge':
        supported = false;
        break
      default:
        supported = false;
    }

    return {isSupported: supported, browserInfo: browser}
  }

  addFavorite(iid){
    if (this.state.favorites.indexOf(iid) !== -1){
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

  render() {
    var supportInfo = this.checkCompatability();
    var supported = supportInfo.isSupported
    var browser = supportInfo.browserInfo
    // if (browser.name.toLowerCase() !== 'firefox' && browser.name.toLowerCase() !== 'chrome'){
    //   supported = false
    // }
    return (
      <div className='app'>
        {supported === false && <BrowserNotSupportedBanner browser={browser.name === 'ie' ? 'Internet Explorer' : browser.name} />}
        {/* <Container fluid className='test-feedback'>
          <Row>
            <Col sm="12">
              <p><strong>N.B. This is a test version of the Pancreatlas.</strong></p>
            </Col>
          </Row>
        </Container> */}
        <Router>
          <div className="App">
            <TopNav favorites={this.state.encodedFavorites} />
            <Switch>
              <Route exact={true} path="/" component={HandelApp} />
              <Route path="/handelp" component={HandelApp} />
              <Route path={`/pancreatlas`} render={(props) => <PancreatlasApp {...props} favoriteCallback={this.addFavorite} favorites={this.state.encodedFavorites} />} />
            </Switch>
            <Footer />
            <PancreatlasFooter />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
