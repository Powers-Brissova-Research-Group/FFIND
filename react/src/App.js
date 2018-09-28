import React, { Component } from 'react';
import './App.css';

import {
  Container,
  Row,
  Col
} from 'reactstrap'

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import HandelApp from './HandelApp';
import PancreatlasApp from './pancreatlas/PancreatlasApp'

class App extends Component {
  render() {
    return (
      <div className='app'>
        <Container fluid className='test-feedback'>
          <Row>
            <Col sm="12">
              <p><strong>N.B. This is a test version of the Pancreatlas. Please report feedback <a href="#">here</a></strong></p>
            </Col>
          </Row>
        </Container>
        <Router>
          <div className="App">
            <Switch>
              <Route exact={true} path="/" component={HandelApp} />
              <Route path="/handelp" component={HandelApp} />
              <Route path='/pancreatlas' component={PancreatlasApp} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
