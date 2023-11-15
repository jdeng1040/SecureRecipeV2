import React, { useState } from "react";
import { Container, Card, Form, Button, FormGroup } from "react-bootstrap";
import NavBar from "./sharedComponents/NavBar";
import axios from "axios";
import RecipeCard from "./sharedComponents/RecipeCard";

interface RecipeIngredient {
  title: string;
  image: string;
  missing: string[];
}

export default function Ingredients() {
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState<Array<RecipeIngredient>>([]);

  function handleButtonClick() {
    axios
      .get("http://localhost:8000/api/getIngredients", {
        params: { param: ingredients },
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
          Search by <span style={{ fontWeight: "bold" }}> Ingredients</span>
        </div>
        <FormGroup style={styles.form}>
          <Form.Control
            type="text"
            placeholder="Salt, Eggs, Butter, etc..."
            onChange={(e) => setIngredients(e.target.value)}
            value={ingredients}
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
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {recipes.map((recipe) => (
              <RecipeCard
                title={recipe.title}
                image={recipe.image}
                missing={recipe.missing}
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
