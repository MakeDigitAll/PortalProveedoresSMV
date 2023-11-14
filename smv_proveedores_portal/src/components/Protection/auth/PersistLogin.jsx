import { Outlet } from "react-router-dom";
import React, { useState, useEffect } from "react";
import useAuth from '../../../hooks/useAuth';
import Cookies from "js-cookie";
import * as jose from 'jose'


//1- verificar que exita la cookie makeID
//2- SI existe la cookie makeID, verificar que exista el userData en el localStorage
//3- SI existe el userData en el localStorage, verificar que exista el referenceCode y roles
//5- SI NO existe el userData en el localStorage, o si NO existe la cookie makeID, redirigir a login


const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { setAuth } = useAuth();

    useEffect(() => {
        let isMounted = true;
        try {
            let accessToken = String(Cookies.get("aT"));
            let decoded = jose.decodeJwt(accessToken);

            setAuth({
                ID: decoded?.ID,
                roles: decoded?.roles,
                isVerified: decoded?.isVerified,
                username: decoded?.username,
                accessToken: accessToken,
                userId: decoded?.userId
            });
            setIsLoading(false);

        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }

        return () => isMounted = false;
    }, [])

    return (
        <>
            {isLoading
                ? <p>Loading...</p>
                : <Outlet />
            }
        </>
    )
}

export default PersistLogin
