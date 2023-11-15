import React, { useState, useEffect} from "react";
import { Container, Button, Card, Row, Col } from "react-bootstrap";
import NavBar from "./sharedComponents/NavBar";
import Cook from "./assets/chef.jpg";
import Allergy from "./assets/allergies.jpg";
import Ingredients from "./assets/ingredients.jpg";
import OptionCard from "./sharedComponents/Option";
import {
  btn1,
  btn2,
  btn3,
  btn4,
  desc1,
  desc2,
  desc3,
  desc4,
  title1,
  title2,
  title3,
  title4,
} from "./constants";
import axios from "axios";
import RecipeCard from "./sharedComponents/RecipeCard";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

interface Recipe {
  title: string;
  image: string;
  sourceUrl: string;
  readyTime: number;
}

export default function Home() {
  const [recipes, setRecipes] = useState<Array<Recipe>>([]);

  function handleButtonClick() {
    axios
      .get("http://localhost:8000/api/getRandom")
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
        <OptionCard
          title={title1}
          description={desc1}
          img={Cook}
          btn_name={btn1}
          path={"/keyword"}
          width="20.5rem"
        />
        <OptionCard
          title={title2}
          description={desc2}
          img={Ingredients}
          btn_name={btn2}
          path={"/ingredients"}
        />
        <OptionCard
          title={title3}
          description={desc3}
          img={Allergy}
          btn_name={btn3}
          path={"/dietary"}
        />
      </div>
      <div style={styles.bottom}>
        <Card style={{ width: "100%" }}>
          <Card.Body>
            <Card.Title>{title4}</Card.Title>
            <Card.Text>{desc4}</Card.Text>
            <Button
              variant="primary"
              style={{ marginBottom: "1%" }}
              onClick={() => handleButtonClick()}
            >
              {btn4}
            </Button>
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
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

const styles = {
  main: {
    display: "flex",
    justifyContent: "space-between",
    margin: "3%",
  },
  bottom: {
    display: "flex",
    justifyContent: "center",
    margin: "3%",
  },
};
