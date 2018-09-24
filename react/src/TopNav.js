import React from 'react';
import {
    Button,
    Collapse,
    Container,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink } from 'reactstrap';

import logo from './assets/HANDEL-Logo-Small-2.png'

export default class TopNav extends React.Component {
    constructor(props){
        super(props)
        this.toggle = this.toggle.bind(this)
        this.state = {
            isOpen: false
        }
    }

    toggle(){
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render(){
        return (
            <div>
                <Navbar color="dark" dark expand="md" fixed="top">
                    <Container>
                        <NavbarBrand href='/'><img src={logo} alt={'HANDEL-P Logo'} /></NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink href="#">Diabetes</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="#">Image Atlas</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="#">Collaborators</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="#">About</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="#"><Button color="danger">Join Our Efforts</Button></NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        )
    }
}