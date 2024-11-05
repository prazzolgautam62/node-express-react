import React, { useState, useContext } from 'react'
import { UserContext } from '../context/index'

export default function useAuth() {
    const [auth, dispatch] = useContext(UserContext)
    function setUser (data) {
        dispatch({
            type: 'SET_USER',
            payload: data
        })
    }
    function setToken(token) {
        dispatch({
            type: 'SET_TOKEN',
            payload: token
        })
    }
    return { auth, setToken, setUser}
};
