import { environment } from 'src/environments/environment';

const historyEndpoint = environment.backendApi + 'brew-history';

const BREW_HISTORY_ENDPOINTS = {
  BASE_URL: historyEndpoint,
  BREW_BEER: `${historyEndpoint}/brew-recipe`,
};

export default BREW_HISTORY_ENDPOINTS;
