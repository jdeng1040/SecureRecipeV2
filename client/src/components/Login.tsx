import React, { useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log("Username:", username);
    console.log("Password:", password);

    try {
      const { data } = await axios.post(
        "http://localhost:8000/login",
        {
          username, password
        },
        { withCredentials: true }
      );
      console.log(data);
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
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" onClick={handleLogin}>
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
