import axios from 'axios';

const api = axios.create({
  // Replace this with your actual ngrok URL
  baseURL: 'http://127.0.0.1:4040',
  headers: {
    'Content-Type': 'application/json',
    // This is required to bypass the ngrok warning screen
    'ngrok-skip-browser-warning': 'true' 
  }
});

export default api;