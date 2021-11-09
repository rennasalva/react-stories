const API_BASE = 'https://hn.algolia.com/api/v1';
const API_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';

const ApiConfig = {
    url:                API_BASE,
    url_search:         API_SEARCH,
    param_search:       PARAM_SEARCH,
    param_page:         PARAM_PAGE
}

export default ApiConfig;
