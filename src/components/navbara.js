import React, { useState } from 'react';
import { Navbar, Container, Nav, NavDropdown, FormControl, Button, Alert } from 'react-bootstrap';
import firebase from 'firebase/app';
import 'firebase/database';

function NavbarA(props) {

  const [search, setSearch] = useState('');

  const searchUser = () => {
    firebase.database().ref(`USR-${search}`).on('value', (snapshot) => {
      if (snapshot.val() == null) {
        document.getElementById('Alerta').style.display = 'block';
        setTimeout(() => {
          document.getElementById('Alerta').style.display = 'none';
        }, 2000)
      } else {
        document.getElementById('Alertb').style.display = 'block';
        setTimeout(() => {
          document.getElementById('Alertb').style.display = 'none';
        }, 2000)
        window.location.href = '/userprofile#' + search
        window.location.reload();
      }
    })
  }

  return (<>
    <Navbar bg="primary" expand="lg" variant='dark' style={{ position: 'sticky', top: 0, left: 0, right: 0 }}>
      <Container fluid>
        <Navbar.Brand href="/">BloodHelper</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/register">Register</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            <NavDropdown title="Legal" id="navbarScrollingDropdown">
              <NavDropdown.Item href="/privacypolicy">Privacy Policy</NavDropdown.Item>
              <NavDropdown.Item href="/termsofservice">Terms of service</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <div className="d-flex">
            <FormControl
              type="search"
              placeholder="Search user"
              className="me-2"
              aria-label="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button variant="outline-light" onClick={searchUser}>Search</Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <br />
    <Alert variant='danger' style={{ textAlign: 'center', display: 'none' }} id='Alerta'>
      No user exists with this ID.
    </Alert>
    <Alert variant='success' style={{ textAlign: 'center', display: 'none' }} id='Alertb'>
      Found user, Redirecting...
    </Alert>
    <Alert variant='info' style={{ textAlign: 'center', display: 'none' }} id='Alertbr'>
      Account is being deleted, Please wait.
    </Alert>
    <Alert variant='success' style={{ textAlign: 'center', display: 'none' }} id='Alertcr'>
      Account Deleted.
    </Alert>
  </>);
}

export default NavbarA;
