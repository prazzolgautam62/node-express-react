import {setToStorage, getFromStorage, clearFromStorage}  from '../utils'
const user = getFromStorage('USER')
const token = getFromStorage('TOKEN')

const initialAuth = {
    user: user ? JSON.parse(user) : {},
    token: token ? token : null
};

function addUser (state, action) {
    setToStorage('USER', JSON.stringify(action.payload))
    return { ...state, user: { ...action.payload } }
}

function resetUser(state, action) {
    clearFromStorage('USER')
    return { ...state, user: initialAuth }
}

function setToken(state, action) {
    setToStorage('TOKEN', action.payload)
    return { ...state, token: action.payload };
}

function resetToken(state, action) {
    clearFromStorage('TOKEN')
    return { ...state, token: '' };
}

function userReducer(state, action) {
    switch (action.type) {
        case 'SET_USER':
            return addUser(state, action)
        case 'RESET_USER':
            return resetUser(state, action)
        case 'SET_TOKEN':
            return setToken(state, action)
        case 'RESET_TOKEN':
            return resetToken(state, action)
        default:
            throw new Error();
    }
}

export {
    initialAuth, userReducer
}
