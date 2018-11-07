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
  render() {
    const { detect } = require('detect-browser')
    const browser = detect()
    var supported = true
    console.log(`Browser: ${JSON.stringify(browser)}`)
    if (browser.name.toLowerCase() !== 'firefox' && browser.name.toLowerCase() !== 'chrome'){
      supported = false
    }
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
            <TopNav />
            <Switch>
              <Route exact={true} path="/" component={HandelApp} />
              <Route path="/handelp" component={HandelApp} />
              <Route path='/pancreatlas' component={PancreatlasApp} />
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
