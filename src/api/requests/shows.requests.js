import http from '../http';

const BASE_URL = '/watch-list/';

export const fetchShows = () => 
    http.get(BASE_URL);

export const fetchShow = (id) => 
    http.get(`${BASE_URL}${id}/`);

export const createShow = (data) => 
    http.post(BASE_URL, data);

export const updateShow = (data, id) => 
    http.put(`${BASE_URL}${id}/`, data);

export const removeShow = (id) => 
    http.delete(`${BASE_URL}${id}/`);
