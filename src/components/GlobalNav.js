import React, {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Navbar, NavDropdown, Nav} from 'react-bootstrap'
export default class GlobalNav extends Component{
    render(){  
        return(
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="#home">YouGo</Navbar.Brand>
                <NavDropdown.Divider />
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                     
                    <Nav className="m-auto p-auto mr-auto">
                        <Nav.Link href="#Videos">Videos</Nav.Link>
                        <Nav.Link href="#Search">Search</Nav.Link>
                    </Nav>

                    <NavDropdown.Divider />

                    <Nav>
                        <Nav.Link href="#UserProfile">User: Bryce</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}