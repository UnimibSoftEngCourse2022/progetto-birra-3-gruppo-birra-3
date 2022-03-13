import { brewHistoryBaseEndpoint } from './baseEndpoints';

const historyEndpoint = brewHistoryBaseEndpoint();

const BREW_HISTORY_ENDPOINTS = {
  BASE_URL: historyEndpoint,
  BREW_BEER: (id: string): string => {
    return `${historyEndpoint}/brew-recipe/${id}`;
  },
};

export default BREW_HISTORY_ENDPOINTS;
