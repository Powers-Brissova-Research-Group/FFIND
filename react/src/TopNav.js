import React from 'react'
import {
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  Badge
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
    this.state = {
      iids: JSON.parse(window.atob(this.props.favorites))
    }
  }

  componentDidUpdate (prevProps) {
    if (prevProps.favorites !== this.props.favorites) {
      this.setState({
        iids: JSON.parse(window.atob(this.props.favorites))
      })
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
            <img className='img-fluid' src={logo} alt={'Pancreatlas -- Home'} />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className='ml-auto' navbar>
              {JSON.parse(window.atob(this.props.favorites)).length > 0 &&
                <NavItem>
                  <UncontrolledDropdown>
                    <DropdownToggle nav caret>Image Atlas <Badge color='primary'>{JSON.parse(window.atob(this.props.favorites)).length}</Badge></DropdownToggle>
                    <DropdownMenu right>
                      <Link className='dropdown-item' to='/pancreatlas/dataset'>Image Atlas</Link>
                      <Link className='dropdown-item' to={`/pancreatlas/favorites?iids=${this.props.favorites}`}>Favorites <Badge color='primary'>{JSON.parse(window.atob(this.props.favorites)).length}</Badge></Link>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </NavItem>}
              {JSON.parse(window.atob(this.props.favorites)).length <= 0 &&
                <NavItem active={(window.location.pathname === '/pancreatlas/dataset')}>
                  <NavLink to='/pancreatlas/dataset'>Image Atlas</NavLink>
                </NavItem>
              }
              <NavItem>
                <NavLink to='/diabetes'>About Diabetes</NavLink>
              </NavItem>
              <NavItem active={(window.location.pathname === '/collaborators')}>
                <NavLink to='/collaborators'>Collaborators</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to='/about'>About pancreatlas</NavLink>
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
