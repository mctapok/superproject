import axios from "axios";

export const API_URL = 'http://localhost:5000/'

const $api = axios.create({
    baseURL: API_URL
})
const $authApi = axios.create({
    baseURL: API_URL
})

const authInterceptor = config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
}
$authApi.interceptors.request.use(authInterceptor)

export{
    $api,
    $authApi
}