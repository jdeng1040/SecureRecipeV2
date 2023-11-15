import React, { useState } from "react";
import { Container, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function OptionCard(props: {
  title: string;
  description: string;
  img?: string;
  btn_name: string;
  width?: string;
  path: string;
}) {
  const navigate = useNavigate();

  return (
    <div>
      <Card style={{ width: props.width ? props.width : "22rem" }}>
        {props.img ? <Card.Img variant="top" src={props.img} /> : ""}
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>{props.description}</Card.Text>
          <Button variant="primary" onClick={() => navigate(props.path)}>{props.btn_name}</Button>
        </Card.Body>
      </Card>
    </div>
  );
}
