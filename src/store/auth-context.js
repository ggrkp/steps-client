import React, { useState, useEffect, useCallback } from 'react';

let logoutTimer;

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => { },
    logout: () => { },
})

const calculateRemTime = (expirationTime) => {
    const currTime = new Date().getTime();
    const expTime = new Date(expirationTime).getTime()
    const remTime = expTime - currTime

    return remTime
}


const getStoredToken = () => {
    const storedToken = localStorage.getItem('token')
    const storedExpTime = localStorage.getItem('expTime')

    const remTime = calculateRemTime(storedExpTime)

    if (remTime <= 3600) {
        localStorage.clear();
        return null;
    }
    return {
        token: storedToken,
        remTime: remTime
    };
}

export const AuthContextProvider = (props) => {
    const tokenData = getStoredToken();

    let initialToken

    if (tokenData) {
        initialToken = tokenData.token
    }

    const [token, setToken] = useState(initialToken)

    const userIsLogged = !!token


    const logoutHandler = useCallback(() => {
        setToken(null)
        localStorage.clear()

        if (logoutTimer) {
            clearTimeout(logoutTimer)
        }
    }, [])

    const loginHandler = (token, expirationTime) => {
        setToken(token)
        localStorage.setItem('token', token)
        localStorage.setItem('expTime', expirationTime)

        // * Automatically log out the user after token expiration.
        const remTime = calculateRemTime(expirationTime)
        logoutTimer = setTimeout(logoutHandler, remTime)
    }

    // * Auto logout if i log the user automatically.
    useEffect(() => {
        if (tokenData) {
            logoutTimer = setTimeout(logoutHandler, tokenData.remTime)
        }
    }, [tokenData, logoutHandler]);


    const contextValue = {
        token: token,
        isLoggedIn: userIsLogged,
        login: loginHandler,
        logout: logoutHandler
    }


    return <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContext