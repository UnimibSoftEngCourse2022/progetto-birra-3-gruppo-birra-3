import { brewHistoryBaseEndpoint } from './baseEndpoints';

const historyEndpoint = brewHistoryBaseEndpoint();

const BREW_HISTORY_ENDPOINTS = {
  BASE_URL: historyEndpoint,
  BREW_BEER: `${historyEndpoint}/brew-recipe`,
};

export default BREW_HISTORY_ENDPOINTS;
