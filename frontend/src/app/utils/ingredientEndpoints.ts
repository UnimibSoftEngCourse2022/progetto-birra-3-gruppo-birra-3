import { ingredientBaseEndpoint } from './baseEndpoints';

const ingredientEndpoint = ingredientBaseEndpoint();

const INGREDIENT_ENDPOINTS = {
  ADD_RECIPE: `${ingredientEndpoint}/add-to-user`,
  FETCH_RECIPE: `${ingredientEndpoint}/add-to-user`,
  UPDATE_RECIPE: '',
};
