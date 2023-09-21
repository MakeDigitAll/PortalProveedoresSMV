import React, { useState, useEffect } from 'react';
import Header from "../../components/header/headerC/Header";
import { useNavigate, useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Input, Link, Button, CircularProgress } from "@nextui-org/react";
import { MdShoppingCart } from "react-icons/md";
import { MdArrowBack, MdSettings, MdSave } from 'react-icons/md';
import { RiDashboard2Fill } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import useAuth from '../../hooks/useAuth';
import '../../App.css';
import ba from '../../../public/Blank-Avatar.png';

import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const NewProducts = () => {
    const navigate = useNavigate();
    const axios = useAxiosPrivate();
    const { auth } = useAuth();
    const ID = auth?.ID;
    const [product, setProduct] = useState({
        productName: "",
        manofacturerCode: "",
        companyCode: "",
        brand: "",
        model: "",
        retailPrice: "",
        wholesalePrice: "",
        satProductCode: "",
        satUnitCode: "",
        unitMeasurement: ""
    });

    const [variable, setVariable] = useState('Nuevo producto');
    const imageProd = React.useRef(null);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState(false);
    const [isInputDisabled, setIsInputDisabled] = useState(false);
    const params = useParams();

    const handleInputChange = (event) => {
        setProduct({
            ...product,
            [event.target.name]: event.target.value
        });
    }

    const handleImageChange = (e) => {
        setImagePreview(URL.createObjectURL(e.target.files[0]));
        setImage(e.target.files[0]);
    }
    const prod = {
        productName: product.productName,
        manofacturerCode: product.manofacturerCode,
        companyCode: product.companyCode,
        brand: product.brand,
        model: product.model,
        retailPrice: product.retailPrice,
        wholesalePrice: product.wholesalePrice,
        satProductCode: product.satProductCode,
        satUnitCode: product.satUnitCode,
        unitMeasurement: product.unitMeasurement
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (product.productName === "") {
            toast.error('El nombre del producto es requerido', {
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

        if (product.productName.length < 3 || product.productName.length > 100) {
            toast.error('El nombre del producto debe tener entre 3 y 100 caracteres', {
                position: "bottom-right",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                autoClose: 10000,
                theme: "colored",
            });
            return;
        }

        if (product.manofacturerCode === "") {
            toast.error('El código del fabricante es requerido', {
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

        if (product.manofacturerCode.length < 3 || product.manofacturerCode.length > 100) {
            toast.error('El código del fabricante debe tener entre 3 y 100 caracteres', {
                position: "bottom-right",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                autoClose: 10000,
                progress: undefined,
                theme: "colored",
            });
            return;
        }
        if (product.companyCode === "") {
            toast.error('El código de la empresa es requerido', {
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

        if (product.companyCode.length < 3 || product.companyCode.length > 100) {
            toast.error('El código de la empresa debe tener entre 3 y 100 caracteres', {
                position: "bottom-right",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                autoClose: 10000,
                progress: undefined,
                theme: "colored",
            });
            return;
        }
        if (product.brand === "") {
            toast.error('La marca es requerida', {
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

        if (product.brand.length < 3 || product.brand.length > 100) {
            toast.error('La marca debe tener entre 3 y 100 caracteres', {
                position: "bottom-right",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                autoClose: 10000,
                progress: undefined,
                theme: "colored",
            });
            return;
        }

        if (product.model === "") {
            toast.error('El modelo es requerido', {
                position: "top-right",
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

        if (product.model.length < 3 || product.model.length > 100) {
            toast.error('El modelo debe tener entre 3 y 100 caracteres', {
                position: "top-right",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                autoClose: 10000,
                progress: undefined,
                theme: "colored",
            });
            return;
        }

        if (product.retailPrice === "") {
            toast.error('El precio al público es requerido', {
                position: "top-right",
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

        if (product.retailPrice < 0) {
            toast.error('El precio al público debe ser mayor a 0', {
                position: "top-right",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                autoClose: 10000,
                progress: undefined,
                theme: "colored",
            });
            return;
        }

        if (product.wholesalePrice === "") {
            toast.error('El precio al mayoreo es requerido', {
                position: "top-right",
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

        if (product.wholesalePrice < 0) {
            toast.error('El precio al mayoreo debe ser mayor a 0', {
                position: "top-right",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                autoClose: 10000,
                progress: undefined,
                theme: "colored",
            });
            return;
        }

        if (product.satProductCode === "") {
            toast.error('El código del producto SAT es requerido', {
                position: "top-right",
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

        if (product.satProductCode.length < 3 || product.satProductCode.length > 100) {
            toast.error('El código del producto SAT debe tener entre 3 y 100 caracteres', {
                position: "top-right",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                autoClose: 10000,
                progress: undefined,
                theme: "colored",
            });
            return;
        }
        if (product.satUnitCode === "") {
            toast.error('El código de unidad SAT es requerido', {
                position: "top-right",
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
        if (product.unitMeasurement === "") {
            toast.error('La unidad de medida es requerida', {
                position: "top-right",
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
        setLoading(true);

        if (editing) {
            try {
                await submitImage();
                await axios.put(`/products/update/${params.id}`, prod,
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then((response) => {
                        toast.success('Producto actualizado', {
                            position: "bottom-right",
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            autoClose: 5000,
                            theme: "colored",
                        });
                        navigate('/products');
                        setLoading(false);
                    }
                    ).catch((error) => {
                        if (error.response.status === 400) {
                            toast.error('Error al actualizar el producto', {
                                position: "bottom-right",
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                autoClose: 5000,
                                theme: "colored",
                            });
                            setLoading(false);
                        }
                        if (error.response.status === 500) {
                            toast.error('Error del servidor', {
                                position: "bottom-right",
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                autoClose: 5000,
                                theme: "colored",
                            });
                            setLoading(false);
                        }
                    });
            } catch (error) {
                console.log(error);
                setLoading(false);
            }


        } else {
            try {
                await axios.post(`/products/create/${ID}`, product,
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then((response) => {
                        if (response.status === 200) {
                            submitImage(response.data.id);
                            toast.success('Producto creado', {
                                position: "bottom-right",
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                autoClose: 5000,
                                theme: "colored",
                            });
                            setLoading(false);
                            navigate('/products');
                        }

                        }
                    ).catch((error) => {
                            if (error.response.status === 400) {
                                toast.error('Error al crear el producto', {
                                    position: "bottom-right",
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    autoClose: 5000,
                                    theme: "colored",
                                });
                                setLoading(false);
                            }
                            if (error.response.status === 500) {
                                toast.error('Error del servidor', {
                                    position: "bottom-right",
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    autoClose: 5000,
                                    theme: "colored",
                                });
                                setLoading(false);
                            }
                        });
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
    }


    const submitImage = async (idprd) => {
        const idpd = idprd || params.id;
        const imgsubmit = image;
        console.log('img', imgsubmit, 'id', idpd);
        if (imgsubmit) {
            try {
                const formData = new FormData();
                formData.append('image', image);
                await axios.put(`/products/image/${idpd}`, formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }).then((response) => {
                        if (response.status === 200) {
                            console.log('imagen actualizada');
                        }
                    }
                    ).catch((error) => {
                        console.log(error);
                    });
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log('no se selecciono imagen');
        }
    }

    const getImage = async () => {
        await axios.get(`/products/image/${params.id}`, {
            responseType: 'blob',
        }).then(response => {
            console.log(response);
            if (response.data.size !== 0) {
                const imageBlob = response.data;
                if (imageBlob.size > 0) {
                    const imageUrl = URL.createObjectURL(imageBlob);
                    setImage(imageUrl);
                }
            }
        }).catch(error => {
            console.log(error);
            setLoading(false);
            console.log(error.response);
        });
    };

    const loadProduct = async () => {
        await getImage();
        const response = await axios.get(`/products/get/${params.id}`);
        setProduct({
            productName: response.data.productName,
            manofacturerCode: response.data.manofacturerCode,
            companyCode: response.data.companyCode,
            brand: response.data.brand,
            model: response.data.model,
            retailPrice: response.data.retailPrice,
            wholesalePrice: response.data.wholesalePrice,
            satProductCode: response.data.satProductCode,
            satUnitCode: response.data.satUnitCode,
            unitMeasurement: response.data.unitMeasurement
        });
        setEditing(true);
        let url = window.location.pathname;
        let arr = url.split('/');
        if (arr[2] === 'Edit') {
            setVariable('Editar producto');
            setIsInputDisabled(false);
        }
        if (arr[2] === 'View') {
            setVariable('Ver producto');
            setIsInputDisabled(true);
        }
    };

    useEffect(() => {
        if (params.id) {
            loadProduct(params.id);
        } else {
            setEditing(false);
        }
    }, [params.id]);

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
                        <Link
                            className="text-foreground"
                            underline="hover"
                            sx={{ display: "flex", alignItems: "center" }}
                            color="foreground"
                            href="#"
                            onClick={() => navigate(`/products`)}
                        >
                            <MdSettings sx={{ mr: 0.5 }} fontSize="inherit" />
                            Productos
                        </Link>
                        <Typography
                            sx={{ display: "flex", alignItems: "center" }}
                            className="text-foreground"
                        >
                            <MdShoppingCart sx={{ mr: 0.5 }} fontSize="inherit" />
                            {variable}
                        </Typography>
                    </Breadcrumbs>
                </div>
            </div>
            {loading ? (
                <div className="flex justify-center items-center w-full h-full">
                    <CircularProgress color="primary" />
                </div>
            ) : (
                <div className='flex flex-col justify-center text-center items-center w-full h-full lg:flex-row'>
                    <div className="lg:mt-10 lg:mb-10 lg:mr-10 mb-10 mt-10 flex flex-col justify-center items-center w-2/4 h-full lg:ml-10">
                        <img
                            className="w-96 h-96 rounded-full object-cover mt-4"
                            src={imagePreview || image || ba}
                            alt="Imagen del producto"
                            ref={imageProd}
                        />
                        {!isInputDisabled && (
                            <input
                                className="w-96 bg-transparent p-2 rounded"
                                type="file"
                                name="image"
                                ref={imageProd}
                                onChange={handleImageChange}
                                disabled={isInputDisabled}
                            />
                        )}
                    </div>
                    <div className='flex flex-col justify-center items-center w-2/4 h-full mr-10'>
                        <div className="flex text-center justify-center my-5">
                            <label className="text-foreground font-bold text-lg text-center mt-4">Datos Generales</label>
                        </div>
                        <div className="flex items-center">
                            <Input
                                className="w-60 mr-4 mt-4"
                                label='Nombre del producto'
                                labelPlacement='outside'
                                placeholder='Nombre del producto'
                                name="productName"
                                value={product.productName}
                                onChange={handleInputChange}
                                disabled={isInputDisabled}
                            />
                            <Input
                                className="w-60 mr-4 mt-4"
                                label='Código de la empresa'
                                labelPlacement='outside'
                                placeholder='Código de la empresa'
                                name="companyCode"
                                value={product.companyCode}
                                onChange={handleInputChange}
                                disabled={isInputDisabled}
                            />
                            <Input
                                className="w-60 mr-4 mt-4"
                                label='Código del fabricante'
                                labelPlacement='outside'
                                placeholder='Código del fabricante'
                                name="manofacturerCode"
                                value={product.manofacturerCode}
                                onChange={handleInputChange}
                                disabled={isInputDisabled}
                            />
                        </div>
                        <div className="flex items-center">
                            <Input
                                className="w-60 mr-4 mt-4"
                                label='Marca'
                                labelPlacement='outside'
                                placeholder='Marca'
                                name="brand"
                                value={product.brand}
                                onChange={handleInputChange}
                                disabled={isInputDisabled}
                            />
                            <Input
                                className="w-60 mr-4 mt-4 inline-flex"
                                label='Modelo'
                                labelPlacement='outside'
                                placeholder='Modelo'
                                name="model"
                                value={product.model}
                                onChange={handleInputChange}
                                disabled={isInputDisabled}
                            />
                        </div>
                        <div className="flex align-middle justify-center">
                            <label className="text-foreground font-bold text-lg my-5 text-center mt-4">Precios</label>
                        </div>
                        <div className="flex items-center">
                            <Input
                                className="w-60 mr-4 mt-4"
                                type='number'
                                label='Precio al público'
                                labelPlacement='outside'
                                placeholder='Precio al público'
                                name="retailPrice"
                                value={product.retailPrice}
                                onChange={handleInputChange}
                                disabled={isInputDisabled}
                            />
                            <Input
                                className="w-60 mr-4 mt-4"
                                label='Precio al mayoreo'
                                type='number'
                                labelPlacement='outside'
                                name="wholesalePrice"
                                placeholder='Precio al mayoreo'
                                value={product.wholesalePrice}
                                onChange={handleInputChange}
                                disabled={isInputDisabled}
                            />
                        </div>
                        <div className="flex align-middle justify-center">
                            <label className="text-foreground font-bold text-lg my-5 text-center mt-4">Regulaciones</label>
                        </div>
                        <div className="flex items-center">
                            <Input
                                className="w-60 mr-4 mt-4"
                                label='Código SAT del producto'
                                labelPlacement='outside'
                                name="satProductCode"
                                placeholder='Código SAT del producto'
                                value={product.satProductCode}
                                onChange={handleInputChange}
                                disabled={isInputDisabled}
                            />
                            <Input
                                className="w-60 mr-4 mt-4"
                                label='Código SAT de unidad'
                                labelPlacement='outside'
                                placeholder='Código SAT de unidad'
                                name="satUnitCode"
                                value={product.satUnitCode}
                                onChange={handleInputChange}
                                disabled={isInputDisabled}
                            />
                            <Input
                                className="w-60 mr-4 mt-4"
                                label='Unidad de medida'
                                labelPlacement='outside'
                                name="unitMeasurement"
                                placeholder='Unidad de medida'
                                value={product.unitMeasurement}
                                onChange={handleInputChange}
                                disabled={isInputDisabled}
                            />
                        </div>
                        {!isInputDisabled && (
                            <div className="flex justify-center mt-4">
                                <Button
                                    auto
                                    startContent={<MdSave />}
                                    variant="success"
                                    className="bg-primary hover:bg-red-700  text-white font-bold p-3 w-72 h-12 mt-10"
                                    size="sm"
                                    onClick={handleSubmit}
                                    disabled={loading}
                                >
                                    Guardar
                                </Button>
                            </div>
                        )}
                        {isInputDisabled && (
                            <Button
                                auto
                                startContent={<MdArrowBack />}
                                variant="success"
                                className="bg-primary hover:bg-red-700  text-white font-bold p-3 w-72 h-12 mt-10"
                                size="sm"
                                onClick={() => navigate('/products')}
                                disabled={loading}
                            >
                                Volver
                            </Button>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default NewProducts
