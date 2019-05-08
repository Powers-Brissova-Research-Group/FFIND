import React from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem
} from 'reactstrap'

import { Link } from 'react-router-dom'

import Logo from '../assets/pancreatlas/logos/handel-p-white-small.png'

export default class PancreatlasNavbar extends React.Component {
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
      <div className='pancreatlas-nav'>
        <Navbar color='dark' dark expand='md'>
          <Link to={'/'} className='navbar-brand'><img className='navbar-logo' src={Logo} alt='Pancreatlas' /></Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className='ml-auto' navbar>
              {/* <NavItem>
                <Link to={'/pancreatlas/collections'} className='nav-link'>Collections</Link>
              </NavItem> */}
              <NavItem>
                <Link to={'/datasets'} className='nav-link'>Datasets</Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
  }
}
