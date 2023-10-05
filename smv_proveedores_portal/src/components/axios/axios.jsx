import axios from 'axios';

const BASE_URL = 'http://ec2-54-183-171-134.us-west-1.compute.amazonaws.com:8080';

//const BASE_URL = 'http://localhost:8080';

const axiosInstance = axios.create({
    baseURL: BASE_URL
});

export default axiosInstance;

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers : {
        'Content-Type': {'application/json': 'application/json'},
        'withCredentials': true,
    }
});