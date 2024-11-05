import axios from "axios";
import { getFromStorage } from "../utils";

axios.defaults.baseURL = `http://localhost:3000/`;

function getAccessToken() {
    return getFromStorage('TOKEN');
}

function _getAllUsers() {
    return axios.get(`users`, {
    headers: { 'Authorization': getAccessToken() }
    }).then(response => response.data)
}

export {
    _getAllUsers
}