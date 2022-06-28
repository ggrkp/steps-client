import React, { useState, useEffect, useCallback } from 'react';

let logoutTimer;

const AuthContext = React.createContext({
    isAdmin: null,
    token: null,
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
    const storedIsAdmin = localStorage.getItem('isAdmin')

    const remTime = calculateRemTime(storedExpTime)

    if (remTime <= 3600) {
        localStorage.clear();
        return null;
    }
    return {
        token: storedToken,
        isAdmin: storedIsAdmin === 'true',
        remTime: remTime
    };
}

export const AuthContextProvider = (props) => {
    const tokenData = getStoredToken();
    let initialToken
    let initIsAdmin

    if (tokenData) {
        initialToken = tokenData.token
        initIsAdmin = tokenData.isAdmin
    }

    const [token, setToken] = useState(initialToken)
    const [isAdmin, setIsAdmin] = useState(initIsAdmin)

    const userIsLogged = !!token

    const logoutHandler = useCallback(() => {
        setToken(null)
        setIsAdmin(null)
        localStorage.clear()
        if (logoutTimer) {
            clearTimeout(logoutTimer)
        }
    }, [])

    const loginHandler = (token, isAdmin, expirationTime) => {
        setToken(token)
        setIsAdmin(isAdmin)
        localStorage.setItem('token', token)
        localStorage.setItem('expTime', expirationTime)
        localStorage.setItem('isAdmin', isAdmin)

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
        isAdmin: isAdmin,
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