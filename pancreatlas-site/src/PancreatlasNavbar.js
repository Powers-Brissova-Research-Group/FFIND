import React from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
} from 'reactstrap'

import { Link } from 'react-router-dom'

export default class PancreatlasNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div className="pancreatlas-nav">
        <Navbar color="dark" dark expand="md">
          <Link to={'/'} className='navbar-brand'>Pancreatlas</Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link to={'/collections'} className='nav-link'>Collections</Link>
              </NavItem>
              <NavItem>
                <Link to={'/dataset'} className='nav-link'>Datasets</Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
  }
}