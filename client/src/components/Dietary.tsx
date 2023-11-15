import React, { useState } from "react";
import {
  Container,
  Card,
  Form,
  Button,
  FormGroup,
  DropdownButton,
  Dropdown,
  InputGroup,
} from "react-bootstrap";
import NavBar from "./sharedComponents/NavBar";
import axios from "axios";
import RecipeCard from "./sharedComponents/RecipeCard";

interface Recipe {
  title: string;
  image: string;
  sourceUrl: string;
  readyTime: number;
}

export default function Dietary() {
  const [keywords, setKeywords] = useState("");
  const [recipes, setRecipes] = useState<Array<Recipe>>([]);
  const [selection, setSelection] = useState("Select restrictions");

  function handleDietSelect(e: any) {
    setSelection(e.substr(1, e.length - 1));
  }

  function handleButtonClick() {
    if (selection === "Select restrictions") setSelection("");
    axios
      .get("http://localhost:8000/api/getDiet", {
        params: {
          keywords: keywords,
          selection: selection,
        },
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
          Search by
          <span style={{ fontWeight: "bold" }}> Dietary Restrictions</span>
        </div>
        <FormGroup style={styles.form}>
          <Form.Control
            placeholder="Apple, Salad, Chicken, etc..."
            aria-label="Text input with dropdown button"
            onChange={(e) => setKeywords(e.target.value)}
            value={keywords}
          />
          <DropdownButton
            variant="outline-secondary"
            title={selection}
            align="end"
            onSelect={(e) => {
              handleDietSelect(e);
            }}
          >
            <Dropdown.Item href="#Vegetarian">Vegetarian</Dropdown.Item>
            <Dropdown.Item href="#Vegan">Vegan</Dropdown.Item>
            <Dropdown.Item href="#Gluten Free">Gluten Free</Dropdown.Item>
            <Dropdown.Item href="#Ketogenic">Ketogenic</Dropdown.Item>
            <Dropdown.Item href="#Pescetarian">Pescetarian</Dropdown.Item>
          </DropdownButton>
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
