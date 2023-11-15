import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import {
    Card,
    Input,
    Spacer,
    Button,
    CardBody,
    Image,
    Checkbox,
} from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Header from '../../components/header/Header';
import Cookies from 'js-cookie';
import * as jose from 'jose'


import axiosInstance from '../../components/axios/axios';
const LOGIN_URL = 'login';

const Login = () => {
    const navigate = useNavigate();
    const [loading, setloading] = useState(false);
    const [user, setUser] = useState({ email: "", password: "" });
    const [toggle, setToggle] = localStorage.getItem('persist') === 'true' ? useState(true) : useState(false);
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    const { setAuth } = useAuth();



    // Comprobacion de sesion ---------------------------------------------------------------------
    useEffect(() => {
        try {
            const aT = Cookies.get('aT');
            if (aT) {
                navigate('/Home', { replace: true });
            }
        } catch (err) {
            console.log(err);
        }
    }, [navigate]);


    // ---------------------------------------------------------------------------------------------


    const validateEmail = (value) => {
        return value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            username: user.email,
            password: user.password,
        }

        if (user.email === '') {
            toast.error('El email es requerido', {
                position: "bottom-right",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                autoClose: 5000,
                theme: "colored",
            });
            return;
        }
        if (!validateEmail(user.email)) {
            toast.error('El email es invalido', {
                position: "bottom-right",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                autoClose: 5000,
                theme: "colored",
            });
            return;
        }
        if (user.password === '') {
            toast.error(t('La contraseña es requerida'), {
                position: "bottom-right",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                autoClose: 5000,
                theme: "colored",
            });
            return;
        }
        setloading(true);

        try {
            const response = await axiosInstance.post(LOGIN_URL, data,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            const accessToken = response?.data?.accessToken;
            const refreshToken = response?.data?.refreshToken;

            const expiracionAT = new Date();
            expiracionAT.setHours(expiracionAT.getMinutes() + 10);

            const expiracionRT = new Date();
            expiracionRT.setHours(expiracionRT.getHours() + 2);

            Cookies.set('rT', refreshToken, { expires: expiracionRT });
            Cookies.set('aT', accessToken, { expires: expiracionAT });

            const decoded = jose.decodeJwt(accessToken);

            

            setAuth( { accessToken, roles: decoded?.roles, isVerified: decoded?.isVerified, username: decoded?.username, userId: decoded?.userId } );
            navigate('/Home', { replace: true });
            setloading(false);
        } catch (err) {
            console.log(err);
                toast.error(err.message, {
                    position: "bottom-right",
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    autoClose: 5000,
                    theme: "colored", 
                });

            setloading(false);
        }
    }

    const { theme } = useTheme();
    const imgLogo = theme === "dark";

    return (
        <>
            <Header />
            <ToastContainer />
            <main>
                <form onSubmit={handleSubmit} onChange={handleChange}>
                    <div className="flex justify-center">
                        <Card
                            style={{
                                display: "flex",
                                height: "600px",
                                width: "400px",
                                marginTop: "100px",
                            }}
                        >
                            <CardBody
                                css={{
                                    marginTop: "20px",
                                    marginRight: "20px",
                                }}
                            >
                                <div className="flex justify-center" style={{ marginTop: '20px' }}>
                                    <h4>{'Bienvenido'}</h4>
                                </div>
                                <div
                                    className="flex justify-center"
                                    style={{ marginTop: "20px" }}
                                >
                                    {imgLogo ? (
                                        <Image
                                            isZoomed
                                            src="../../../public/make-dark.png"
                                            alt=""
                                            width={100}
                                            height={100}
                                        />
                                    ) : (
                                        <Image
                                            isZoomed
                                            src="../../../public/make-light.png"
                                            alt=""
                                            width={100}
                                            height={100}
                                        />
                                    )}
                                </div>
                                <Spacer y={10} />
                                <div className="flex flex-col gap-2" style={{ marginTop: '20px' }}>
                                    <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
                                        <Input
                                            id="email"
                                            value={user.email}
                                            onChange={handleChange}
                                            isClearable
                                            onClear={() => setUser({ ...user, email: "" })}
                                            type="email"
                                            label="Email"
                                            labelPlacement='outside'
                                            name="email"
                                        />
                                    </div>
                                </div>
                                <Spacer y={6} />
                                <div className="flex flex-col gap-2" style={{ marginTop: '20px' }}>
                                    <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
                                        <Input
                                            id="password"
                                            value={user.password}
                                            onChange={handleChange}
                                            isClearable
                                            onClear={() => setUser({ ...user, password: "" })}
                                            type="password"
                                            label="password"
                                            labelPlacement='outside'
                                            name="password"
                                        />
                                    </div>
                                </div>
                                <br />
                                <div
                                    className="flex justify-center"
                                    style={{ marginTop: "20px" }}
                                >
                                    <Checkbox
                                        id="toggle"
                                        checked={toggle}
                                        onChange={() => {
                                            setToggle(!toggle);
                                            localStorage.setItem('persist', !toggle);
                                        }}
                                    >
                                        {'Recordame'}
                                    </Checkbox>
                                </div>
                                <br />

                                {loading ? (
                                    <div
                                        className="flex justify-center"
                                        style={{ marginTop: "20px" }}
                                    >
                                        <Button
                                            isLoading={loading}
                                            className='bg-red-900'
                                            size="md"
                                            spinner={
                                                <svg
                                                    className="animate-spin h-5 w-5 text-current"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    />
                                                    <path
                                                        className="opacity-75"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                        fill="currentColor"
                                                    />
                                                </svg>

                                            }
                                        >
                                            Loading
                                        </Button>
                                    </div>
                                ) : (
                                    <div
                                        className="flex justify-center mt-5"
                                    >
                                        <Button size='md' color="primary" className="hover:bg-red-900" type="submit">
                                            {'Ingresar'}
                                        </Button>

                                        <Button
                                            size='md'
                                            color="error"
                                            className="hover:bg-red-900"
                                            onClick={() => navigate('/Register')}
                                        >
                                            {'Registrarse'}
                                        </Button>
                                    </div>
                                )}
                            </CardBody>
                        </Card>
                    </div>
                </form>
            </main>
        </>
    );
};

export default Login;