import React, { Component } from 'react';
import './App.css';
import ImageGrid from './ImageGrid'
import HomePage from './HomePage'
import PancreatlasNavbar from './PancreatlasNavbar'
import CollectionList from './CollectionList'
import DatasetList from './DatasetList'
import Footer from './Footer'
import ImageDetail from './ImageDetail'
import MatrixView from './MatrixView'
import {
  Container,
  Row,
} from 'reactstrap'

import {
  Switch,
  Route
} from 'react-router'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Container fluid>
          <Row>
            <PancreatlasNavbar />
          </Row>
        </Container>
        <Container>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route path='/collections' component={CollectionList} />
            <Route exact path='/dataset' component={DatasetList} />
            <Route exact path='/dataset/:did' component={ImageGrid} />
            <Route path='/image/:iid' component={ImageDetail} />
            <Route path='/matrixview' component={MatrixView} />
          </Switch>
        </Container>
        <Footer />
      </div>
    );
  }
}

export default App;
