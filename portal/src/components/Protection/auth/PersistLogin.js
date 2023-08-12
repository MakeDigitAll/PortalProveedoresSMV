import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from '../../../hooks/useAuth';


//1- verificar que exita la cookie makeID
//2- SI existe la cookie makeID, verificar que exista el userData en el localStorage
//3- SI existe el userData en el localStorage, verificar que exista el referenceCode y roles

//5- SI NO existe el userData en el localStorage, o si NO existe la cookie makeID, redirigir a login


const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const {setAuth} = useAuth();
    //const cookie = document.cookie.indexOf('makeID') !== -1;
    const userData = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : null;
    const referenceCode = userData ? userData.referenceCode : null;
    const roles = userData ? userData.roles : null;


    useEffect(() => {
        let isMounted = true;

        if (userData && referenceCode && roles) {
            setAuth({referenceCode, roles});
            window.location.href = '/Home';
            setIsLoading(false);
        }
        else {
            setIsLoading(false);
        }

        window.location.href = '/';
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

    /*
    const { auth } = useAuth();
    const [persist] = useLocalStorage('persist', false);

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                await refresh();
            }
            catch (err) {
                console.error(err);
            }
            finally {
                isMounted && setIsLoading(false);
            }
        }

        // persist added here AFTER tutorial video
        // Avoids unwanted call to verifyRefreshToken
        !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);

        return () => isMounted = false;
    }, [])

    useEffect(() => {
        console.log(`isLoading: ${isLoading}`)
        console.log(`aT: ${JSON.stringify(auth?.accessToken)}`)
    }, [isLoading])

    return (
        <>
            {!persist
                ? <Outlet />
                : isLoading
                    ? <p>Loading...</p>
                    : <Outlet />
            }
        </>
    )
}

export default PersistLogin


*/