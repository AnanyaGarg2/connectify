import axios from 'axios';

export const BACKEND_URL = axios.create({
    baseURL: 'http://localhost:4001/api/v1'
});