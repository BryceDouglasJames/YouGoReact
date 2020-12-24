import React, {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Navbar, NavDropdown, Nav} from 'react-bootstrap'
import {Link} from "react-router-dom";
export default class GlobalNav extends Component{

    NavStyle = {
        color: "whote",
        textDecoration: "none"
    }

    render(){  
        return(
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand>
                    <Link to="/Search" style={{color: 'white', textDecoration: 'none'}}>
                        YouGo
                    </Link>
                </Navbar.Brand>
                <NavDropdown.Divider />
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                     
                    <Nav className="m-auto p-auto mr-auto NavStyle">
                            <Nav.Link>
                                <Link to="/VideoList" style={{color: 'white', textDecoration: 'none'}}>
                                    Videos 
                                </Link>
                            </Nav.Link>
                       
                            <Nav.Link>
                                <Link to="/search" style={{color: 'white', textDecoration: 'none'}}>
                                    Search
                                </Link>
                            </Nav.Link>
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