import React from 'react'

import {
  Switch,
  Route
} from 'react-router'

import Home from './Home';
import Diabetes from './Diabetes';
import Collaborators from './Collaborators';
import About from './About';
import MetaTags from 'react-meta-tags'

export default class HandelApp extends React.Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.state = {
      isOpen: false
    }
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div className="App">
        <MetaTags>
          <title>HDL-P</title>
          <meta name="description" content="HANDEL-P Project within the Vanderbilt University Medical Center"/>
          <meta name="keywords" content="VUMC, pancreas, microscopy, handel-p, diabetes" />
        </MetaTags>
        <Switch>
          <Route exact={true} path="/" component={Home} />
          <Route exact={true} path="/handelp" component={Home} />
          <Route path="/handelp/diabetes" component={Diabetes} />
          <Route path="/handelp/collaborators" component={Collaborators} />
          <Route path="/handelp/about" component={About} />
        </Switch>
      </div>
    )
  }
}