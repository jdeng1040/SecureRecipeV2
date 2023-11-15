import React, { useState } from "react";
import { Container, Card, Form, Button, FormGroup } from "react-bootstrap";
import NavBar from "./sharedComponents/NavBar";
import axios from "axios";
import RecipeCard from "./sharedComponents/RecipeCard";

interface Recipe {
  title: string;
  image: string;
  sourceUrl: string;
  readyTime: number;
}

export default function Keyword() {
  const [keywords, setKeywords] = useState("");
  const [recipes, setRecipes] = useState<Array<Recipe>>([]);

  function handleButtonClick() {
    axios
      .get("http://localhost:8000/api/getKeyword", {
        params: { param: keywords },
      })
      .then((response) => {
        console.log(response.data);
        setRecipes(response.data);
      })
      .catch((error) => console.error(error));
  }

  return (
    <div>
      <NavBar />
      <div style={styles.main}>
        <div style={styles.title}>
          Search by <span style={{ fontWeight: "bold" }}> Keyword</span>
        </div>
        <FormGroup style={styles.form}>
          <Form.Control
            type="text"
            placeholder="Apple, Salad, Chicken, etc..."
            onChange={(e) => setKeywords(e.target.value)}
            value={keywords}
          />
          <Button
            className="btn"
            type="submit"
            onClick={() => handleButtonClick()}
          >
            Enter
          </Button>
        </FormGroup>

        {recipes ? (
          <div style={{ display: "flex", flexWrap: "wrap"}}>
            {recipes.map((recipe) => (
              <RecipeCard
                title={recipe.title}
                image={recipe.image}
                sourceUrl={recipe.sourceUrl}
                readyTime={recipe.readyTime}
              />
            ))}
          </div>
        ) : null}
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
    // width: "50%",
  },
  form: {
    display: "flex",
    width: "70%",
    marginBottom: "3%",
  },
};
