import React from 'react';
import {
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from 'reactstrap';

import {
  Link,
  NavLink
} from 'react-router-dom'


import logo from './assets/logo-pancreatlas-300w_light.png'

export default class TopNav extends React.Component {
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
      <Navbar color="dark" dark expand="md">
        <Container fluid>
          <NavbarBrand><Link to="/"><img src={logo} alt={'HANDEL-P Logo'} /></Link></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem active={(window.location.pathname === '/pancreatlas') ? true : false}>
                <NavLink to="/pancreatlas/dataset">Image Atlas</NavLink>
              </NavItem>
                <NavItem>
                <NavLink to="/diabetes">About Diabetes</NavLink>
              </NavItem>
              <NavItem active={(window.location.pathname === '/collaborators') ? true : false}>
                <NavLink to="/collaborators">Collaborators</NavLink>
              </NavItem>
              <NavItem active={(window.location.pathname === '/handelp/about') ? true : false}>
                <NavLink to="/about">About</NavLink>
              </NavItem>
              <NavItem>
                <a class="btn btn-info" href='https://webapp.mis.vanderbilt.edu/vumc-giving/landing?appealCode=J1001'>Join Our Efforts</a>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>

    )
  }
}