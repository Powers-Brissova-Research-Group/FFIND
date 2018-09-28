import React from 'react'

import {
  Button,
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

import {
  Link
} from 'react-router-dom'

import {
  Switch,
  Route
} from 'react-router'

import Footer from './Footer';
import Home from './Home';
import Diabetes from './Diabetes';
import Collaborators from './Collaborators';
import About from './About';

import logo from './assets/HANDEL-Logo-Small-2.png'


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
        <Navbar color="dark" dark expand="md">
          <Container fluid>
            <NavbarBrand><Link to="/"><img src={logo} alt={'HANDEL-P Logo'} /></Link></NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <Link to="/handelp/diabetes"><NavLink>Diabetes</NavLink></Link>
                </NavItem>
                <NavItem>
                  <NavLink href="/pancreatlas">Image Atlas</NavLink>
                </NavItem>
                <NavItem>
                  <Link to="/handelp/collaborators"><NavLink>Collaborators</NavLink></Link>
                </NavItem>
                <NavItem>
                  <Link to="/handelp/about"><NavLink>About</NavLink></Link>
                </NavItem>
                <NavItem>
                  <NavLink href='https://webapp.mis.vanderbilt.edu/vumc-giving/landing?appealCode=J1001'><Button color="danger">Join Our Efforts</Button></NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
        <Switch>
          <Route exact={true} path="/" component={Home} />
          <Route exact={true} path="/handelp" component={Home} />
          <Route path="/handelp/diabetes" component={Diabetes} />
          <Route path="/handelp/collaborators" component={Collaborators} />
          <Route path="/handelp/about" component={About} />
        </Switch>
        <Footer />
      </div>
    )
  }
}