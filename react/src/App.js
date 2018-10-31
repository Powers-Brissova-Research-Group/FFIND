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
  constructor(props){
    super(props)
    this.state = {
      favorites: []
    }

    this.addFavorite = this.addFavorite.bind(this)
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
            <TopNav favorites={this.state.favorites} />
            <Switch>
              <Route exact={true} path="/" component={HandelApp} />
              <Route path="/handelp" component={HandelApp} />
              <Route path='/pancreatlas' render={(props) => <PancreatlasApp {...props} favoriteCallback={this.addFavorite} favorites={this.state.favorites} />} />
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
