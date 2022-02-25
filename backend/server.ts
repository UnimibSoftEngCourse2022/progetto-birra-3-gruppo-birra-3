import express from "express";
import cors, { CorsOptions } from "cors";
import db from "./app/models";
import { recipeRouter } from "./app/routes/recipeRoutes";
import { config } from "dotenv";
const app = express();

config();

const corsOptions: CorsOptions = {
  origin: [
    "http://localhost:8081",
    "http://localhost:4200",
    "http://localhost:8000",
  ],
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

db.mongoose
  .connect(db.url)
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err: any) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to backend application." });
});

// recipeRoutes(express);
app.use("/api/recipes", recipeRouter);

// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
