const API_URL = process.env.REACT_APP_API_URL;

/**
 * Generate HTTP headers
 * @param {Object} headers
 */
const getHeader = async (headers = new Headers(), hasFiles = false) => {
  const defaultHeaders = new Headers();
  defaultHeaders.append('Accept', 'application/json');
  defaultHeaders.append('Content-Type', 'application/json; charset=utf8');
  
  if (headers) {
    headers.forEach((value, key) => defaultHeaders.append(key, value));
  }
  
  if (!hasFiles) {
    defaultHeaders.append('Content-Type', 'application/json');
  }

  return defaultHeaders;
};

/**
 * Generate HTTP body
 * @param {Object} body
 * @param {Boolean} hasFiles
 */
const getBody = (body = {}, hasFiles = false) => {
  if (hasFiles) {
    return body;
  }

  return JSON.stringify(body);
};

export class ApiResponseError extends Error {
  constructor(code, body = null) {
    super();
    this.name = 'ApiResponseError';
    this.code = code || 400;
    this.body = body;
  }
}

/**
 * Check HTTP response
 * @param {object} response API response
 * @returns
 */
const checkError = response => {
  if (!/^(2|3)[0-9][0-9]$/.test(String(response?.status))) {
    const error = new Error('Something went wrong');
    error.response = response;
    throw error;
  }
};

/**
 * Generate Request URL
 * @param {String} url
 * @param {Object} options
 * @param {String | undefined | null} options.baseURL
 * @param {boolean} options.isMockedURL
 */
const getURL = (url = '', options = { baseURL: null, isMockedURL: false }) => {
  const baseURL = options?.baseURL ? options.baseURL : API_URL;

  const finalURL = baseURL + url;

  return finalURL;
};

const defaultOptions = {
  baseURL: null,
  isMockedURL: false,
  headers: null,
  hasFiles: false,
};

/**
 * HTTP GET Request
 * @method GET
 * @param {String} url
 * @param {Object | undefined} options
 */
const fetchGet = async (url, options = defaultOptions) => {
  const result = await fetch(
    getURL(url, { isMockedURL: options?.isMockedURL, baseURL: options?.baseURL }),
    {
      method: 'GET',
      headers: await getHeader(options?.headers),
    },
  );

  checkError(result);

  const response = await result.json();

  return response;
};

/**
 * HTTP POST Request
 * @method POST
 * @param {String} url
 * @param {Object | undefined} options
 */
const fetchPost = async (url, body = {}, options = defaultOptions) => {
  const result = await fetch(
    getURL(url, { isMockedURL: options?.isMockedURL, baseURL: options?.baseURL }),
    {
      method: 'POST',
      headers: await getHeader(options?.headers, options?.hasFiles),
      body: getBody(body, options?.hasFiles),
    },
  );

  checkError(result);

  const response = await result.json();
  return response;
};

/**
 * HTTP PATCH Request
 * @method PATCH
 * @param {String} url
 * @param {Object} options
 */
const fetchPatch = async (url, body = {}, options = defaultOptions) => {
  const result = await fetch(
    getURL(url, { isMockedURL: options?.isMockedURL, baseURL: options?.baseURL }),
    {
      method: 'PATCH',
      headers: await getHeader(options?.headers, options?.hasFiles),
      body: getBody(body, options?.hasFiles),
    },
  );

  checkError(result);

  const response = await result.json();
  return response;
};

/**
 * HTTP PUT Request
 * @method PUT
 * @param {String} url
 * @param {Object} options
 */
const fetchPut = async (url, body = {}, options = defaultOptions) => {
  const result = await fetch(
    getURL(url, { isMockedURL: options?.isMockedURL, baseURL: options?.baseURL }),
    {
      method: 'PUT',
      headers: await getHeader(options?.headers, options?.hasFiles),
      body: getBody(body, options?.hasFiles),
    },
  );

  checkError(result);

  const response = await result.json();
  return response;
};

/**
 * HTTP DELETE Request
 * @method DELETE
 * @param {String} url
 * @param {Object} options
 */
const fetchDelete = async (url, body = {}, options = defaultOptions) => {
  const result = await fetch(
    getURL(url, { isMockedURL: options?.isMockedURL, baseURL: options?.baseURL }),
    {
      method: 'DELETE',
      headers: await getHeader(options?.headers, options?.hasFiles),
      body: getBody(body, options?.hasFiles),
    },
  );

  checkError(result);

  return;
};

const http = {
  get: fetchGet,
  post: fetchPost,
  put: fetchPut,
  patch: fetchPatch,
  delete: fetchDelete,
};

export default http;