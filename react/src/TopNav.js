import React from 'react'
import {
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from 'reactstrap'

import {
  Link,
  NavLink
} from 'react-router-dom'

import logo from './assets/logo-pancreatlas-300w_light.png'

export default class TopNav extends React.Component {
  constructor (props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.state = {
      isOpen: false
    }
  }

  toggle () {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render () {
    return (
      <Navbar color='dark' dark expand='md'>
        <Container fluid>
          <NavbarBrand tag={Link} to='/'>
            <img src={logo} alt={'Pancreatlas -- Home'} />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className='ml-auto' navbar>
              <NavItem active={(window.location.pathname === '/pancreatlas')}>
                <NavLink to='/pancreatlas/dataset'>Image Atlas</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to='/diabetes'>About Diabetes</NavLink>
              </NavItem>
              <NavItem active={(window.location.pathname === '/collaborators')}>
                <NavLink to='/collaborators'>Collaborators</NavLink>
              </NavItem>
              <NavItem active={(window.location.pathname === '/handelp/about')}>
                <NavLink to='/about'>About</NavLink>
              </NavItem>
              <NavItem className='btn btn-info'>
                <NavLink to='https://webapp.mis.vanderbilt.edu/vumc-giving/landing?appealCode=J1001'>Join Our Efforts</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    )
  }
}
