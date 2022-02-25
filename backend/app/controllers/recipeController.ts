import db from "../models";
import { RecipeModel } from "../models/recipeModel";
import express, { Request, Response } from "express";
import {
  findAllRecipesQueryParams,
  findOneRecipeParams,
} from "../types/recipeControllerTypes";

const Recipe: typeof RecipeModel = db.recipes;

// Create and Save a new Recipe
export const create = (req: Request, res: Response) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Recipe
  const recipe = new Recipe({
    title: req.body.title,
    color: req.body.color,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  });
  recipe
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Recipe.",
      });
    });
};

// // Retrieve all Recipes from the database.
export const findAllRecipes = (req: Request, res: Response) => {
  const { title } = req.query as unknown as findAllRecipesQueryParams;

  const condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};
  Recipe.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving recipes.",
      });
    });
};

// // Find a single Recipe with an id

export const findOneRecipe = (req: Request, res: Response) => {
  const { id } = req.params as unknown as findOneRecipeParams;

  Recipe.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Recipe with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Recipe with id=" + id });
    });
};

// // Update a Recipe by the id in the request
export const updateRecipe = (req: Request, res: Response) => {
  const { id } = req.params as unknown as findOneRecipeParams;

  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  Recipe.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Recipe with id=${id}. Maybe Recipe was not found!`,
        });
      } else res.send({ message: "Recipe was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Recipe with id=" + id,
      });
    });
};

// // Delete a Recipe with the specified id in the request
export const deleteRecipe = (req: Request, res: Response) => {
  const { id } = req.params as unknown as findOneRecipeParams;

  Recipe.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Recipe with id=${id}. Maybe Recipe was not found!`,
        });
      } else {
        res.send({
          message: "Recipe was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Recipe with id=" + id,
      });
    });
};

// // Delete all Recipes from the database.
export const deleteAll = (req: Request, res: Response) => {
  Recipe.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Recipes were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all recipes.",
      });
    });
};

// Find all published Recipes
export const findAllPublished = (req: Request, res: Response) => {
  Recipe.find({ published: true })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving recipes.",
      });
    });
};
