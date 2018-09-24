import React, { Component } from 'react';
import './App.css';

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
      <Router>
        <div className="App">
          <Switch>
            <Route exact={true} path="/" component={HandelApp} />
            <Route path="/handelp" component={HandelApp} />
            <Route path='/pancreatlas' component={PancreatlasApp} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
