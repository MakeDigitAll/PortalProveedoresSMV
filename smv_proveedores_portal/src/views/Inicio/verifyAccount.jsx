import React, { useEffect, useState} from 'react';import {
    Card,
    Input,
    Spacer,
    Button,
    CardBody,
    Image,
} from "@nextui-org/react";
import { useParams } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Header from '../../components/header/Header';

import axiosInstance from '../../components/axios/axios';

const VerifyAccount = (props) => { 
    const navigate = useNavigate();
    const [validUrl, setValidUrl] = useState(false);
    const params = useParams();
 
    useEffect(() => {
        const verifyAccount = async () => {
            try {
                const response = await axiosInstance.post(`/smv/${params.id}/verify/${params.token}`);
                if (response.status === 200) {
                    setValidUrl(true);
                    toast.success("¡Cuenta verificada correctamente!", {
                        position: "bottom-right",
                        hideProgressBar: false,
                        closeOnClick: true, 
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        autoClose: 5000,
                        theme: "colored",
                    });
                }
            } catch (error) {
                console.log(error);
                setValidUrl(false);
            } 
        }
        verifyAccount();
    }, [params])



    return (
        <>
            <ToastContainer />
            <Header />
            <main>
                <div className="flex justify-center">
                    <Card shadow className="w-11/12 justify-center ml-20 mr-20 mt-20"
                    >
                        <CardBody
                        >
                            {validUrl && (
                                <div className="flex flex-col justify-center lg:ml-20">
                                    <h4 className="text-center text-2xl">¡Cuenta verificada correctamente!</h4>
                                    <Button
                                        auto
                                        size="lg"
                                        className='mt-20 bg-primary'
                                        onClick={() => navigate("/")}
                                    >
                                        Continuar
                                    </Button>
                                </div>
                            )}
                            {!validUrl && (
                                <div className="flex flex-col justify-center lg:ml-20 h-52 items-center text-center">
                                    <h4 className='text-red-500 text-2xl'>Verificacion Fallida</h4>
                                    <Button
                                        auto
                                        size="lg"
                                        className='mt-20 bg-primary'
                                        onClick={() => navigate("/")}
                                    >
                                        Salir
                                    </Button>
                                </div>
                            )}
                        </CardBody>
                    </Card>
                </div>
            </main>
        </>
    );
};

export default VerifyAccount;