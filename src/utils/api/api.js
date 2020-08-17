import Axios from 'axios'
import store from '../../store'
import { setData, setError } from '../../action';
import { LOGOUT, SET_ERROR } from '../../action/types';
Axios.defaults.timeout = 7000;

Axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('user');
    if (token)
        config.headers.Authorization = 'bearer ' + token;
    return config;
})

Axios.interceptors.response.use(
    (res) => {
        const { data } = res;
        if (data.status === 401) {
            store.dispatch(setData(LOGOUT))
            store.dispatch(setError(SET_ERROR, 'Token Expired. Please Login Again'))
        }
        return res;
    },
    (error) => {
        return Promise.reject(error)
    }
);

class Api {
    static async get(url, params = {}) {
        return Axios.get(url, {
            params
        });
    }
    static async post(url, body) {
        return Axios.post(url, body)
    }
}
export default Api;