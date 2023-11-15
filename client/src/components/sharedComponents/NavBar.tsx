import React, { useState } from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";

export default function NavBar() {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">SecureRecipe</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/saved">Saved Recipes</Nav.Link>
          </Nav>
          {/* <Nav.Link className="d-flex">
            <Button variant="outline-light">Sign Out</Button>
          </Nav.Link> */}
        </Container>
      </Navbar>
    </div>
  );
}