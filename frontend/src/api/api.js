import axios from 'axios';

// baseURL dynamique : depuis Vite (.env), sinon fallback localhost
const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000/api',
});

export default API;
