import React, { Component } from 'react';
import './App.css';
import HomePage from './HomePage'
import PancreatlasNavbar from './PancreatlasNavbar'
import DatasetList from './DatasetList'
import Footer from './Footer'
import ImageDetail from './ImageDetail'
import MatrixView from './MatrixView'
import AgeBrowser from './AgeBrowser'
import Nomenclature from './Nomenclature'

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
        <div className='wrapper'>
          <div className='content'>
            <Container>
              <Switch>
                <Route exact path='/' component={HomePage} />
                {/* <Route path='/collections' component={CollectionList} /> */}
                <Route exact path='/dataset' component={DatasetList} />
                <Route exact path='/dataset/:did' component={AgeBrowser} />
                <Route path='/image/:iid' component={ImageDetail} />
                <Route path='/matrixview/:dsid' component={MatrixView} />
                <Route path='/nomenclature' component={Nomenclature} />
              </Switch>
            </Container>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
