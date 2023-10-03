import React, { useEffect, useState } from 'react';
import {
    Card,
    Spacer,
    Button,
    CardBody,
    Image,
    Checkbox,
    Link,
    CardHeader,
    Spinner,
    Input,
    Divider,
    CardFooter,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { RiDashboard2Fill, RiPencilLine } from "react-icons/ri";
import { MdArrowDropDown, MdSearch, MdShoppingCart, MdDelete, MdChecklist } from "react-icons/md";
import Header from "../../components/header/headerC/Header";
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import useAuth from '../../hooks/useAuth';
import '../../App.css';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const Profile = () => {
    const { auth } = useAuth();
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [image, setImage] = useState(null);
    const imgPreview = image ? URL.createObjectURL(image) : null;
    const [loading, setLoading] = useState(true);
    const axios = useAxiosPrivate();

    useEffect(() => {
        const getData = async () => {
            try {
                await getImageUser();
                const response = await axios.get(`/pv/${auth.userId}`);
                setData(response.data);
                setLoading(false);
            }
            catch (error) {
                console.log(error);
            }
        }
        getData();
    }
        , []);

    const getImageUser = async () => {
        try {
            axios.get(`/users/image/${auth.userId}`, {
                responseType: 'blob',
            }).then(response => {
                console.log(response.data.size);
                if (response.data.size !== 0) {
                    setImage(response.data);
                }
            }
            );
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleImage = (e) => {
        setImage(e.target.files[0]);
    }

    const handleUpdateImage = async () => {
        try {
            const formData = new FormData();
            formData.append('image', image);
            await axios.put(`/users/image/${auth.userId}`, formData);
            toast.success('Imagen actualizada');
            getImageUser();
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleDeleteImage = async () => {
        try {
            await axios.delete(`/users/image/${auth.userId}`);
            toast.success('Imagen eliminada');
            getImageUser();
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleUpdateData = async () => {
        try {
            await axios.put(`/pv/${auth.userId}`, data);
            toast.success('Datos actualizados');
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleDeleteData = async () => {
        try {
            await axios.delete(`/pv/${auth.userId}`);
            toast.success('Datos eliminados');
            navigate('/app');
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex flex-col w-full h-full">
            <Header />
            <ToastContainer />
            <div className="flex justify-between items-center ml-20 mt-10 mb-10">
                <div className="flex items-center md:sm">
                    <Breadcrumbs aria-label="breadcrumb" color="foreground">
                        <Link
                            className="text-foreground"
                            underline="hover"
                            sx={{ display: "flex", alignItems: "center" }}
                            color="foreground"
                            href="#"
                            onClick={() => navigate(`/Home`)}
                        >
                            <RiDashboard2Fill sx={{ mr: 0.5 }} fontSize="inherit" />
                            Inicio
                        </Link>
                        <Typography
                            sx={{ display: "flex", alignItems: "center" }}
                            className="text-foreground"
                        >
                            <RiPencilLine sx={{ mr: 0.5 }} fontSize="inherit" />
                            Perfil
                        </Typography>
                    </Breadcrumbs>
                </div>
            </div>
            {loading ? (
                <div className="flex justify-center items-center w-11/12 ml-20 mt-20">
                    <Spinner label="Cargando" />
                </div>
            ) : (
                <div className="flex justify-center items-center w-full h-full">
                    <Card className="w-1 /2 h-1/2">
                        < CardHeader className="flex justify-center items-center" >
                            <h1 className="text-2xl font-bold">Perfil</h1>
                        </CardHeader >
                    </Card>
                </div>
            )}
        </div >
    );
}

export default Profile;
