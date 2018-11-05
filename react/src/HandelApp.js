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
          <title>pancreatlas - the study of the human pancreas and islet during the first decade of life</title>
          <meta name="description" content="Pancreatlas is a resource to catalogue new research data and discoveries pertaining to the human pancreas and islets change in the first decade of life, in order to to accelerate research throughout the world with the goal of understanding of the events in the pancreas and islet that trigger type 1 diabetes."/>
          <meta name="keywords" content="human pancreas, development, pancreatic, disease, diabetes, diabetic, pancreata, donor, neonatal, juvenile, image, imaging, microscopy, science, research, basic, clinical, helmsley, vanderbilt, university" />
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