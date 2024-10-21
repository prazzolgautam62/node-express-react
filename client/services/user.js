import axios from "axios";

axios.defaults.baseURL = `http://localhost:3000/`;

function getAccessToken() {
    let user =  localStorage.getItem('user');
    let token = user ? (JSON.parse(user)).token : '';
    return token;
}

function _getAllUsers() {
    return axios.get(`users`, {
    headers: { 'Authorization': getAccessToken() }
    }).then(response => response.data)
}

export {
    _getAllUsers
}