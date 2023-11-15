import React, { useState } from "react";
import { Container, Card, Form, Button, FormGroup } from "react-bootstrap";
import NavBar from "./sharedComponents/NavBar";

export default function Saved() {
  return (
    <div>
      <NavBar />
      <div>
        Coming soon!
      </div>
    </div>
  );
}

const styles = {
  main: {
    marginLeft: "3%",
  },
  title: {
    paddingTop: "1%",
    paddingBottom: "1%",
    fontSize: "36px",
  },
  form: {
    display: "flex",
    width: "70%",
  },
};
