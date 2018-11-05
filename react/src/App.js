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


class App extends Component {
  render() {
    return (
      <div className='app'>
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
