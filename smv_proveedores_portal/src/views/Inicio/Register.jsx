import React, { useState } from 'react';
import {
    Card,
    Input,
    Spacer,
    Button,
    CardBody,
    Image,
    Spinner
} from "@nextui-org/react";
import { useTheme } from "next-themes";
import { RadioGroup, Radio } from "@nextui-org/react";
import { MdOutlineMailOutline } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import Header from '../../components/header/Header';

import axiosInstance from '../../components/axios/axios';


const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [typeUser, setTypeUser] = useState('1');
    const [user, setUser] = useState({ email: "", password: "", confirmPassword: "" });
    const [reference, setReference] = useState('');
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const { theme } = useTheme();
    const imgLogo = theme === "dark";

    const validateEmail = (value) => {
        return value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
    };

    const handleSubmit = async (e) => {

        const data = {
            username: user.email,
            password: user.password,
            role: typeUser
        }

        const dataReference = {
            username: user.email,
            password: user.password,
            role: typeUser,
            reference: reference
        }

        if(user.email === '' || user.password === '' || user.confirmPassword === '') return toast.error('Todos los campos son requeridos', ({
            position: "bottom-right",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            autoClose: 5000,
            theme: "colored",
        }));


        if (user.email === '') {
            toast.error('El email es requerido', ({
                position: "bottom-right",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                autoClose: 5000,
                theme: "colored",
            }));
        }
        if (!validateEmail(user.email)) {
            toast.error('El email proporcionado no es valido', ({
                position: "bottom-right",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                autoClose: 5000,
                theme: "colored",
            }));
        }
        if (user.password === '') {
            toast.error('La contraseña es requerida', ({
                position: "bottom-right",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                autoClose: 5000,
                theme: "colored",
            }));
        }
        if (user.password.length < 8) {
            toast.error('La contraseña debe tener al menos 8 caracteres', ({
                position: "bottom-right",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                autoClose: 5000,
                theme: "colored",
            }));
        }
        if (user.confirmPassword === '') {
            toast.error('Confirme la contraseña', ({
                position: "bottom-right",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                autoClose: 5000,
                theme: "colored",
            }));
        }
        if (user.password !== user.confirmPassword) {
            toast.error('las contraseñas no coinciden', ({
                position: "bottom-right",
                hideProgressBar: false, 
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                autoClose: 5000,
                theme: "colored",
            }));
        }

        if (typeUser === '2') {
            if (reference === '') {
                toast.error('la referencia es requerida', ({
                    position: "bottom-right",
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    autoClose: 5000,
                    theme: "colored",
                }));
            }
            try {
                setLoading(true);
                await axiosInstance.post('/register', dataReference,
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true
                    }
                );
                setLoading(false);
                setUser({ email: "", password: "", confirmPassword: "" });
                navigate('/');
                toast.success('Registro exitoso', ({
                    position: "bottom-right",
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    autoClose: 5000,
                    theme: "colored",
                }));
            }
            catch (err) {
                if (!err?.response) {
                    toast.error('Error de conexion', ({
                        position: "bottom-right",
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        autoClose: 5000,
                        theme: "colored",
                    }));
                } else if (err.response?.status === 409) {
                    toast.error('Correo ya registrado', ({
                        position: "bottom-right",
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        autoClose: 5000,
                        theme: "colored",
                    }));
                } else {
                    toast.error('Error al registrarse, vuelva a intentarlo', ({
                        position: "bottom-right",
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        autoClose: 5000,
                        theme: "colored",
                    }));
                }
                return setLoading(false);

            }
        }

        try {
            setLoading(true);
            await axiosInstance.post('/register', data,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            ).then((res) => {
                if (res.status === 200) {
                    toast.success('Registro exitoso', ({
                        position: "bottom-right",
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        autoClose: 5000,
                        theme: "colored",
                    }));
                    setLoading(false);
                    setUser({ email: "", password: "", confirmPassword: "" });
                    navigate('/');
                }
            });
        } catch (err) {
            if (!err?.response) {
                toast.error(err.message, ({
                    position: "bottom-right",
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    autoClose: 5000,
                    theme: "colored",
                }));
            } else if (err.response?.status === 409) {
                toast.error('Correo ya registrado', ({
                    position: "bottom-right",
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    autoClose: 5000,
                    theme: "colored",
                }));
            } else {
                toast.error(err.message, ({
                    position: "bottom-right",
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    autoClose: 5000,
                    theme: "colored",
                }));
            }
            setLoading(false);
        }
    }

    return (
        <>
            <Header />
            <main>
                <ToastContainer />
                {loading ? (
                    <div className="flex justify-center items-center w-11/12 ml-20 mt-20">
                        <Spinner label="Cargando" />
                    </div>
                ) : (
                    <form onChange={handleChange} onSubmit={handleSubmit}>
                        <div className="flex justify-center">
                            <Card
                                style={{
                                    display: "flex",
                                    height: "700px",
                                    width: "450px",
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
                                        <h4>{"Registro"}</h4>
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
                                        <div className="flex w-full flex-wrap items-center justify-center md:flex-nowrap md:mb-0 gap-4">
                                            <Input
                                                id="email"
                                                value={user.email}
                                                className='w-11/12'
                                                onChange={handleChange}
                                                isClearable
                                                onClear={() => setUser({ ...user, email: "" })}
                                                type="email"
                                                label="correo electronico"
                                                labelPlacement="outside"
                                                name="email"
                                            />
                                        </div>
                                    </div>
                                    <Spacer y={6} />
                                    <div className="flex flex-col gap-2">
                                        <div className="flex w-full flex-wrap items-center justify-center md:flex-nowrap md:mb-0 gap-4">
                                            <Input
                                                id="password"
                                                value={user.password}
                                                onChange={handleChange}
                                                isClearable
                                                className='w-11/12'
                                                onClear={() => setUser({ ...user, password: "" })}
                                                type="password"
                                                label="contraseña"
                                                labelPlacement="outside"
                                                name="password"
                                            />
                                        </div>
                                    </div>
                                    <Spacer y={6} />
                                    <div className="flex flex-col gap-2">
                                        <div className="flex w-full flex-wrap items-center justify-center md:flex-nowrap md:mb-0 gap-4">
                                            <Input
                                                id="confirmPassword"
                                                value={user.confirmPassword}
                                                onChange={handleChange}
                                                isClearable
                                                className='w-11/12'
                                                onClear={() => setUser({ ...user, confirmPassword: "" })}
                                                type="password"
                                                label="confirmar contraseña"
                                                labelPlacement="outside"
                                                name="confirmPassword"
                                            />
                                        </div>
                                    </div>
                                    <RadioGroup
                                        value={typeUser}
                                        onChange={(e) => setTypeUser(e.target.value)}
                                        className='flex justify-center mt-7 items-center text-center'
                                    >
                                        <Radio value="1">{"Proveedor"}</Radio>
                                        <Radio value="2">{"Dependiente"}</Radio>
                                    </RadioGroup>

                                    {typeUser === '2' && <Spacer y={1} />}
                                    {typeUser === '2' &&
                                        <div className="flex flex-col gap-2" style={{ marginTop: '20px' }}>
                                            <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
                                                <Input
                                                    id="reference"
                                                    value={reference}
                                                    onChange={(e) => setReference(e.target.value)}
                                                    isClearable
                                                    onClear={() => setReference("")}
                                                    type="text"
                                                    label="Codigo de referencia"
                                                    labelPlacement='outside'
                                                    name="reference"
                                                />
                                            </div>
                                        </div>
                                    }
                                    <br />
    
                                    {loading ? (
                                        <div className="flex justify-center">
                                            <div className="flex justify-center items-center">
                                                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div
                                            className="flex justify-center mt-5"
                                        >
                                            <Button
                                                type="submit"
                                                size={"md"}
                                                color="primary"
                                            >
                                                {"Registrarse"}
                                            </Button>
                                        </div>
                                    )}

                                </CardBody>
                            </Card>
                        </div>
                    </form>
                )}
            </main>
        </>
    );
};

export default Register;
