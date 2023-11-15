import React, { useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    console.log("Username:", username);
    console.log("Password:", password);
    try {
      const { data } = await axios.post(
        "http://localhost:8000/signup",
        { username, password },
        { withCredentials: true }
      );
      const { success } = data;
      if (success) {
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
    setUsername("");
    setPassword("");
  };

  return (
    <Container className="mt-5">
      <div className="row justify-content-center">
        <Card>
          <Card.Header>Login</Card.Header>
          <Card.Body>
            <Form>
              <Form.Group>
                <Form.Label>Set Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Set Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" onClick={handleSignup}>
                Login
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}

const styles = {
  // title: {
  //   paddingBottom: "2rem",
  //   paddingTop: "3rem",
  //   display: "flex",
  //   justifyContent: "center",
  // },
  // card: {
  //   width: "40rem",
  //   marginLeft: "auto",
  //   marginRight: "auto",
  // },
  // registeredText: {
  //   paddingTop: "0.7rem",
  // },
};
