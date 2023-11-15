import React, { useState } from "react";
import { Card } from "react-bootstrap";

export default function RecipeCard(props: {
  title: string;
  image: string;
  sourceUrl?: string;
  readyTime?: number;
  missing?: string[];
}) {
  console.log(props.missing);
  return (
    <div>
      <Card>
        <Card.Img style={styles.img} variant="top" src={props.image} />
        <Card.Body>
          <Card.Body>
            <Card.Link href={props.sourceUrl} target="_blank">
              {props.title}
            </Card.Link>
            {props.sourceUrl ? (
              <Card.Text>Ready in {props.readyTime} minutes!</Card.Text>
            ) : (
              ""
            )}
          </Card.Body>
          {props.missing ? (
            <Card.Body>
              <div>Missing ingredient(s) below:</div>
              {props.missing.map((missing) => (
                <p>-{missing}</p>
              ))}
            </Card.Body>
          ) : (
            ""
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

const styles = {
  img: {
    height: 250,
    width: 300,
  },
};
