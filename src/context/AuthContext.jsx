'use client'

import {createContext, useContext, useEffect, useState} from 'react'

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [loading, setLoading] = useState(true)
    const [auth, setAuth] = useState({
        token: null,
        user: null,
    })

    useEffect(() => {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");

        if(token && user) {
            setAuth({
                token,
                user: JSON.parse(user)
            })
        }
        setLoading(false)
    },[])

    const login = (token, user) => {
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(user))
        setAuth({token, user})
    }

    const logout = (token, user) => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setAuth({token: null, user: null})
    }

    return (
        <>
        <AuthContext.Provider value={{...auth, login, logout, loading}}>
            {children}
        </AuthContext.Provider>
        </>
    )
}

export const useAuth = () => useContext(AuthContext)