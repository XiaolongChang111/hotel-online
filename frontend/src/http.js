import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL, 
});

instance.interceptors.request.use((config) => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
}, err => {
    return Promise.reject(err); 
})

export default instance;
