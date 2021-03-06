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

import logo from '../../assets/img/page_imgs/ffind-logo.png'

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
            <img style={{ maxHeight: '3rem' }}className='img-fluid' src={logo} alt={'Pancreatlas -- Home'} />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className='ml-auto' navbar>
              {JSON.parse(window.atob(this.props.favorites)).length > 0 &&
                <NavItem>
                  <UncontrolledDropdown>
                    <DropdownToggle nav caret>Image Atlas <Badge color='primary'>{JSON.parse(window.atob(this.props.favorites)).length}</Badge></DropdownToggle>
                    <DropdownMenu right>
                      <Link className='dropdown-item' to='/datasets'>Data Collections</Link>
                      <Link className='dropdown-item' to={`/favorites?iids=${this.props.favorites}`}>Favorites <Badge color='primary'>{JSON.parse(window.atob(this.props.favorites)).length}</Badge></Link>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </NavItem>}
              {JSON.parse(window.atob(this.props.favorites)).length <= 0 &&
                <NavItem active={(window.location.pathname === '/datasets')}>
                  <NavLink to='/datasets'>Data Collections</NavLink>
                </NavItem>
              }
              <NavItem active={(window.location.pathname === '/about')}>
                <NavLink to='/about'>About</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    )
  }
}

TopNav.defaultProps = {
  favorites: window.btoa(JSON.stringify({}))
}
