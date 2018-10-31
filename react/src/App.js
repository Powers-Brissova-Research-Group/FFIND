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
import PancreatlasFooter from './pancreatlas/PancreatlasFooter'
import BrowserNotSupportedBanner from './BrowserNotSupportedBanner'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faGem, faMedkit, faUsers, faFlask, faVial, faHandPointer, faSearchPlus } from '@fortawesome/free-solid-svg-icons'

library.add(faGem, faMedkit, faUsers, faFlask, faVial, faHandPointer, faSearchPlus)

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      favorites: []
    }

    this.addFavorite = this.addFavorite.bind(this)
    this.checkCompatability = this.checkCompatability.bind(this)
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
        favorites: tmp
      })
      console.log(`Removed ${iid}: ${this.state.favorites}`)
    } else {
      this.setState({
        favorites: this.state.favorites.concat(iid)
      })
    }
  }

  render() {
    var supportInfo = this.checkCompatability();
    var supported = supportInfo.isSupported
    var browser = supportInfo.browserInfo
    console.log(`Browser: ${JSON.stringify(supportInfo)}`)
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
            <TopNav favorites={this.state.favorites} />
            <Switch>
              <Route exact={true} path="/" component={HandelApp} />
              <Route path='/pancreatlas' render={(props) => <PancreatlasApp {...props} favoriteCallback={this.addFavorite} favorites={this.state.favorites} />} />
              <Route path="/" component={HandelApp} />
            </Switch>
            <PancreatlasFooter />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
