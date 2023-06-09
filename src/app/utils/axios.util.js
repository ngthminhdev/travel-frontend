import axios from "axios";
import jwt_decode from 'jwt-decode';
import {LocalStorageItem} from "../enum";

const endPoint = process.env.REACT_APP_ENDPOINT;
const getAccessToken = () => JSON.parse(localStorage.getItem(LocalStorageItem.AccessToken));
const getMac = () => JSON.parse(localStorage.getItem(LocalStorageItem.DeviceId));

const axiosAuth = axios.create({
    baseURL: endPoint,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getAccessToken(),
        mac: getMac(),
    }
});

const axiosDevice = axios.create({
    baseURL: endPoint,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        mac: getMac(),
    }
});

axiosAuth.interceptors.request.use(
    async (config) => {
        let date = new Date();
        let accessToken = getAccessToken();
        const decodedToken = jwt_decode(accessToken);

        if (decodedToken?.exp < date.getTime() / 1000) {
            const res = await axios({
                baseURL: endPoint,
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + accessToken,
                    mac: getMac(),
                },
                method: 'POST',
                url: '/auth/refresh-token',
            });
            const newAccessToken = await res.data.data.accessToken;
            newAccessToken && localStorage.setItem(LocalStorageItem.AccessToken, JSON.stringify(newAccessToken));

            config.headers.Authorization = `Bearer ${newAccessToken}`
        }
        return config;
    },
    (error) => {
        return Promise.reject(error.response.data);
    }
);

export {axiosAuth, axiosDevice};