import axios from "axios";

axios.defaults.baseURL = `http://localhost:3000/`;

function _login(data) {
    const url = `login`
    return axios.post(url, data).then(response => response.data)
}

export {
    _login
}