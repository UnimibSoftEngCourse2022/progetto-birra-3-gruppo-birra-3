import express from "express";
import cors, {CorsOptions} from "cors";
import dbModel from "./app/models/dbModel";
import {config} from "dotenv";
import {errorHandler} from "./app/handler/errorHandler";
import recipeRoutes from "./app/routes/recipeRoutes";
import equipmentsRoutes from "./app/routes/equipmentsRoutes";
import authRoutes from "./app/routes/authRoutes";
import ingredientsRoutes from "./app/routes/ingredientsRoutes";
import brewingHistoryRoutes from "./app/routes/brewingHistoryRoutes";

const app = express();
app.disable("x-powered-by");

config();

const corsOptions: CorsOptions = {
    origin: [
        "http://localhost:8081",
        "http://localhost:4200",
        "http://localhost:8000",
        "172.20.0.1:56836"
    ],
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));

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
    res.json({message: "Welcome to backend application."});
});

app.use("/api/recipes", recipeRoutes);
app.use("/api/equipment", equipmentsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/ingredient", ingredientsRoutes);
app.use("/api/brew-history", brewingHistoryRoutes);

const PORT = process.env.NODE_DOCKER_PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
