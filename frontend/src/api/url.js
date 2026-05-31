import axios from 'axios';

export const BACKEND_URL = axios.create({
    baseURL: 'https://connectify-2-ew21.onrender.com/'
});
