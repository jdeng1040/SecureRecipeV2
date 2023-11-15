import express from "express";
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';

dotenv.config();

const { MONGO_URL, PORT, APIKEY } = process.env;

//For env File

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

// MongoDB Connection
mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is connected successfully"))
  .catch((err) => console.error(err));

const apiKey = APIKEY;
const port = PORT;

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB connection established successfully');
});

const TEST = {
  title: "Chicken 67",
  image: "https://spoonacular.com/recipeImages/637876-556x370.jpg",
  readyTime: 45,
  sourceUrl:
    "http://www.foodista.com/recipe/G4XPLKBW/chicken-65-chicken-marinaded-in-traditional-indian-spices-and-deep-fried",
};

app.get("/api/getKeyword", async (req, res) => {
  const recipe = req.query.param;

  let url =
    "https://api.spoonacular.com/recipes/complexSearch?apiKey=" +
    apiKey +
    "&query=" +
    recipe +
    "&number=5";

  let recipePromises = []; // Array to store fetch promises

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let size = data.results.length < 5 ? data.results.length : 5;
      for (let i = 0; i < size; i++) {
        const recipeInfoPromise = fetch(
          "https://api.spoonacular.com/recipes/" +
            data.results[i].id +
            "/information?apiKey=" +
            apiKey
        )
          .then((response) => response.json())
          .then((data) => {
            return {
              title: data.title,
              image: data.image,
              sourceUrl: data.sourceUrl,
              readyTime: data.readyInMinutes,
            };
          });
        recipePromises.push(recipeInfoPromise);
      }

      // Wait for all fetch promises to resolve
      Promise.all(recipePromises)
        .then((recipes) => {
          // Once all promises have resolved, log and send the response
          console.log(recipes);
          res.json(recipes);
        })
        .catch((error) => {
          res.status(500).json({ error: "Server error" });
        });
    });

  // let test_return: Array<Recipe> = [];
  // for (let i = 0; i < 5; i++) {
  //   test_return.push(TEST);
  // }
  // res.json(test_return);
});

app.get("/api/getIngredients", async (req, res) => {
  const recipe = req.query.param;
  let url =
    "https://api.spoonacular.com/recipes/findByIngredients?apiKey=" +
    apiKey +
    "&ingredients=" +
    recipe +
    "&number=5&ranking=2";

  let recipeVal = []; // Array to store fetch promises

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let size = data.length < 5 ? data.length : 5;
      for (let i = 0; i < size; i++) {
        let missing = [];
        for (let j = 0; j < data[i].missedIngredients.length; j++) {
          missing.push(data[i].missedIngredients[j].name);
        }
        recipeVal.push({
          title: data[i].title,
          image: data[i].image,
          missing: missing,
        });
      }
      console.log(recipeVal);
      res.json(recipeVal);
    });

  // let test_return: Array<Recipe> = [];
  // for (let i = 0; i < 5; i++) {
  //   test_return.push(TEST);
  // }
  // res.json(test_return);
});

app.get("/api/getDiet", async (req, res) => {
  const recipe = req.query.keywords;
  const diet = req.query.selection;

  let url =
    "https://api.spoonacular.com/recipes/complexSearch?apiKey=" +
    apiKey +
    "&query=" +
    recipe +
    "&number=5&diet=" +
    diet;

  let recipePromises = []; // Array to store fetch promises

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(recipe, diet);
      console.log(data);
      let size = data.results.length < 5 ? data.results.length : 5;
      for (let i = 0; i < size; i++) {
        const recipeInfoPromise = fetch(
          "https://api.spoonacular.com/recipes/" +
            data.results[i].id +
            "/information?apiKey=" +
            apiKey
        )
          .then((response) => response.json())
          .then((data) => {
            return {
              title: data.title,
              image: data.image,
              sourceUrl: data.sourceUrl,
              readyTime: data.readyInMinutes,
            };
          });
        recipePromises.push(recipeInfoPromise);
      }

      // Wait for all fetch promises to resolve
      Promise.all(recipePromises)
        .then((recipes) => {
          // Once all promises have resolved, log and send the response
          console.log(recipes);
          res.json(recipes);
        })
        .catch((error) => {
          res.status(500).json({ error: "Server error" });
        });
    });

  // let test_return: Array<Recipe> = [];
  // for (let i = 0; i < 5; i++) {
  //   test_return.push(TEST);
  // }
  // res.json(test_return);
});

app.get("/api/getRandom", async (req, res) => {
  let url =
    "https://api.spoonacular.com/recipes/random?apiKey=" + apiKey + "&number=5";

  let recipeVal = []; // Array to store fetch promises

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let size = data.length < 5 ? data.length : 5;
      for (let i = 0; i < size; i++) {
        recipeVal.push({
          title: data.recipes[i].title,
          image: data.recipes[i].image,
          sourceUrl: data.recipes[i].sourceUrl,
          readyTime: data.recipes[i].readyInMinutes,
        });
      }
      res.json(recipeVal);
    });

  // let test_return: Array<Recipe> = [];
  // for (let i = 0; i < 5; i++) {
  //   test_return.push(TEST);
  // }
  // res.json(test_return);
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
