import { environment } from 'src/environments/environment';

const recipeEndpoint = environment.backendApi + 'recipes';

const RECIPE_ENDPOINTS = {
  BASE_URL: recipeEndpoint,
  BASE_URL_ID_PARAM: (ID: string): string => {
    return `${recipeEndpoint}/${ID}`;
  },
  BREW_RECIPE: `${recipeEndpoint}/brewRecipe`,

  FIND_BY_TITLE: (title: string): string => {
    return `${recipeEndpoint}?title=${title}`;
  },
};

export default RECIPE_ENDPOINTS;
