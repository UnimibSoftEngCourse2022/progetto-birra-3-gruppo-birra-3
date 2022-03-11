import { environment } from 'src/environments/environment';

export const baseEndpoint = () => {
  return environment.backendApi;
};

export const ingredientBaseEndpoint = () => {
  return `${baseEndpoint()}/ingredient`;
};

export const brewHistoryBaseEndpoint = () => {
  return `${baseEndpoint()}/brew-history`;
};

export const recipeBaseEndpoint = () => {
  return `${baseEndpoint()}/recipes`;
};
