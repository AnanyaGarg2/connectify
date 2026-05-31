import axios from 'axios';

export const BACKEND_URL = axios.create({
    baseURL: 'https://connectify-6ydx.onrender.com'
});
