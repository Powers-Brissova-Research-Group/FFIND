import React, { Component } from 'react'
import MetaTags from 'react-meta-tags'

import HomePage from './HomePage'
import DatasetList from './DatasetList'
import ImageDetail from './ImageDetail'
import MatrixView from './MatrixView'
import AgeBrowser from './AgeBrowser'
import Nomenclature from './Nomenclature'
import PageNotFound from './PageNotFound'

import {
  Switch,
  Route
} from 'react-router'

class PancreatlasApp extends Component {
  render () {
    return (
      <div className='pancreatlas'>
        <MetaTags>
          <title>Pancreatlas / HANDEL-P</title>
          <meta name='description' content='An online atlas dedicated to the human pancreas, curated by the Vanderbilt University Medical Center' />
        </MetaTags>
        {/* <Container fluid>
          <Row className="pancreatlas-row">
            <PancreatlasNavbar />
          </Row>
        </Container> */}
        <div className='wrapper'>
          <div className='content'>
            <Switch>
              <Route exact path='/pancreatlas' component={HomePage} />
              {/* <Route path='/collections' component={CollectionList} /> */}
              <Route exact path='/pancreatlas/dataset' component={DatasetList} />
              <Route exact path='/pancreatlas/dataset/:did' component={AgeBrowser} />
              <Route path='/pancreatlas/image/:iid' component={ImageDetail} />
              <Route path='/pancreatlas/matrixview/:dsid' component={MatrixView} />
              <Route path='/pancreatlas/nomenclature' component={Nomenclature} />
              <Route component={PageNotFound} />
            </Switch>
          </div>
        </div>
      </div>
    )
  }
}

export default PancreatlasApp
