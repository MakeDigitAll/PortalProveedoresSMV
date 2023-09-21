import { Outlet } from "react-router-dom";
import React ,{ useState, useEffect } from "react";
import useAuth from '../../../hooks/useAuth';
import Cookies from "js-cookie";


//1- verificar que exita la cookie makeID
//2- SI existe la cookie makeID, verificar que exista el userData en el localStorage
//3- SI existe el userData en el localStorage, verificar que exista el referenceCode y roles
//5- SI NO existe el userData en el localStorage, o si NO existe la cookie makeID, redirigir a login


const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const {setAuth} = useAuth();
    const ID = localStorage.getItem("ID");
    const roles = localStorage.getItem("r");
    const isVerified = localStorage.getItem("iV");
    const username = localStorage.getItem("username");
    const accessToken = Cookies.get("aT");
    const userId = localStorage.getItem("userId");
    const imgURL = localStorage.getItem("imgURL");
    //const [imgURL, setImgURL] = useState(null);
   // const arrayBufferString = localStorage.getItem('img');


    useEffect(() => {
        let isMounted = true;

        //if (arrayBufferString) {
         //   const arrayBuffer = new Uint8Array(arrayBufferString.split(',').map(Number)).buffer;
         //   const recoveredBlob = new Blob([arrayBuffer], { type: 'application/octet-stream' });
          //   const imageURL = URL.createObjectURL(recoveredBlob);
        //     localStorage.setItem('imgURL', imageURL);
        //     setImgURL(imageURL);
        //    }

        if (ID && roles && isVerified && username && accessToken) {
            setAuth({ ID, roles, isVerified, username, accessToken, imgURL, userId });
            setIsLoading(false);
        }
        else {
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
