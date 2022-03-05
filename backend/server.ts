import express from "express";
import cors, { CorsOptions } from "cors";
import dbModel from "./app/models/dbModel";
import { config } from "dotenv";
import { errorHandler } from "./app/handler/errorHandler";
import routerRecipes from "./app/routes/recipeRoutes";
import authRoutes from "./app/routes/authRoutes";
import ingredientRouter from "./app/routes/ingredientsRoutes";

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

// Errore Handler
app.use(errorHandler);

dbModel.mongoose
  .connect(dbModel.url)
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err: any) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to backend application." });
});

app.use("/api/recipes", routerRecipes);
app.use("/api/auth", authRoutes);
app.use("/api/ingredient", ingredientRouter);

const PORT = process.env.NODE_DOCKER_PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
