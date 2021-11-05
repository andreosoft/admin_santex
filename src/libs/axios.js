import Vue from 'vue'
import axios from "axios"
import config from "../config/config"

const token = localStorage.getItem('user-token');
if (token) {
    axios.defaults.headers.common['Authorization'] = token
}

axios.defaults.baseURL = config.baseUrl;

axios.interceptors.response.use(undefined, function (err) {
    return new Promise(function (resolve, reject) {
        if (err.response.status === 400) {
            // Vue.$emit('', {text: err.response?.response?.message})
        } else if (err.response.status === 403) {
            localStorage.removeItem('user-token')
            localStorage.removeItem('user-profile')
            window.location.href = '/';
        }
        throw err;
    });
});

Vue.prototype.$axios = axios

export default axios