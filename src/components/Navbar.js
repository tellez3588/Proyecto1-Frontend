import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from "react-bootstrap";
import { Outlet, Link } from "react-router-dom";
import '../styles/Navbar.css'

const NavbarUser = () => {


  let user = JSON.parse(localStorage.getItem('user'));



  return (
    <>

      <Navbar className="navBg" expand="lg">
        <Container>
          <p className="welcome">Bienvenido {user.firstName + " " + user.lastName}</p>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <ul className="navbar-nav bienvenidoNavBar d-none">
              <li className="nav-item dropdown me-auto mb-2 mb-lg-0">
                <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown"
                  aria-expanded="false">
                </a>
              </li>
            </ul>
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/home" className="Link">Home</Nav.Link>
              <Nav.Link as={Link} to="/newsSource" className="Link">News Source</Nav.Link>
              <Nav.Link as={Link} to="/" className="Link">Logout</Nav.Link>
            </Nav>

          </Navbar.Collapse>
        </Container>
        <script src="Common.jsx" type="text/javascript" charset="utf-8"></script>
      </Navbar>

      <section>
        <Outlet></Outlet>
      </section>
    </>
  )
}

export default NavbarUser;