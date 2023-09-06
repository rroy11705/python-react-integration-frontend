import http from '../http';

const BASE_URL = '/watch-list/platform/';

export const fetchPlatforms = () => 
    http.get(BASE_URL);

export const createPlatform = (data) => 
    http.post(BASE_URL, data);

export const updatePlatform = (data, id) => 
    http.put(`${BASE_URL}${id}/`, data);

export const removePlatform  = (id) => 
    http.delete(`${BASE_URL}${id}/`);