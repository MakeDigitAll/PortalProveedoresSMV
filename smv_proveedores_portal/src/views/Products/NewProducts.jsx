import React, { useState, useEffect } from 'react';
import Header from "../../components/header/headerC/Header";
import { useNavigate, useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem } from "@nextui-org/react";
import { Input, Link, Button, ButtonGroup, CircularProgress } from "@nextui-org/react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { MdShoppingCart } from "react-icons/md";
import { MdArrowBack, MdSettings, MdSave } from 'react-icons/md';
import { RiDashboard2Fill } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import useAuth from '../../hooks/useAuth';
import '../../App.css';
import ba from '../../../public/Blank-Avatar.png';

import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const productsBrands = {
    "brands": [
        {
            "value": "Acer",
            "label": "Acer"
        },
        {
            "value": "Apple",
            "label": "Apple"
        },
        {
            "value": "Asus",
            "label": "Asus"
        },
        {
            "value": "Dell",
            "label": "Dell"
        },
        {
            "value": "HP",
            "label": "HP"
        },
        {
            "value": "Huawei",
            "label": "Huawei"
        },
        {
            "value": "Lenovo",
            "label": "Lenovo"
        },
    ]
}


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
        price1: "",
        price2: "",
        price3: "",
        price4: "",
        rate1: "",
        rate2: "",
        rate3: "",
        satProductCode: "",
        satUnitCode: "",
        unitMeasurement: ""
    });

    const productUnits = {
        "units": [
            {
                "value": "H87",
                "label": "Pieza"
            },
            {
                "value": "EA",
                "label": "Elemento"
            },
            {
                "value": "E48",
                "label": "Unidad de servicio"
            },
            {
                "value": "ACT",
                "label": "Actividad"
            },
            {
                "value": "KGM",
                "label": "Kilogramo"
            },
            {
                "value": "E51",
                "label": "Trabajo"
            },
            {
                "value": "A9",
                "label": "Tafira"
            },
            {
                "value": "MTR",
                "label": "Metro"
            },
            {
                "value": "AB",
                "label": "Paquete de granel"
            },
            {
                "value": "LTR",
                "label": "Litro"
            },
            {
                "value": "MLT",
                "label": "Miligramo"
            },
            {
                "value": "GRM",
                "label": "Gramo"
            },
            {
                "value": "DCP",
                "label": "Docena de piezas"
            },
            {
                "value": "XUN",
                "label": "Unidad"
            },
            {
                "value": "MLT",
                "label": "Mililitro"
            },
        ]
    }

    const [variable, setVariable] = useState('Nuevo producto');
    const [CardType, setCardType] = useState('general');
    const imageProd = React.useRef(null);
    const [image, setImage] = useState(null);
    const [techinicalSheet, setTechinicalSheet] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState(false);
    const [isInputDisabled, setIsInputDisabled] = useState(false);
    const params = useParams();

    const handleInputChange = (event) => {
        if (event.target.name === 'satUnitCode') {
            const selectedUnit = unitMap.find((item) => item.code === satUnitCode);
            setProduct({ ...product, unitMeasurement: selectedUnit.name });
        }
        setProduct({
            ...product,
            [event.target.name]: event.target.value
        });
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


    const handleImageChange = (e) => {
        setImagePreview(URL.createObjectURL(e.target.files[0]));
        setImage(e.target.files[0]);
    }

    const handleTecnicalSheet = async (event) => {
        setTechinicalSheet(event.target.files[0]);
        console.log('ficha tecnica', techinicalSheet);
        try {
            const formData = new FormData();
            formData.append('techinicalSheet', techinicalSheet);
            console.log('ficha tecnica', techinicalSheet);
        } catch (error) {
            console.log(error);
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
        setTimeout(() => {
            setCardType({ ...CardType, CardType: "general" })
        }, 1);
        if (params.id) {
            loadProduct(params.id);
        } else {
            setEditing(false);
        }
    }, []);

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
                <div className='flex flex-col justify-center text-center items-center w-full lg:flex-row'>
                    <div className="lg:mb-10 mb-10 flex flex-col items-center w-1/2 h-full">
                        <img
                            className="w-96 h-96 lg:rounded-full rounded-sm object-cover mt-4"
                            src={imagePreview || image || ba}
                            alt="Imagen del producto"
                            ref={imageProd}
                        />
                        {!isInputDisabled && (
                            <div>
                                <label className="text-foreground font-bold text-lg my-5 text-center mt-4">Imagen del producto</label>
                                <br />
                                <input
                                    className="w-96 bg-transparent p-2 rounded-lg justify-center"
                                    type='file'
                                    name="image"
                                    ref={imageProd}
                                    onChange={handleImageChange}
                                    disabled={isInputDisabled}
                                />
                            </div>
                        )}
                        {!isInputDisabled && (
                            <div>
                                <label className="text-foreground font-bold text-lg my-5 text-center mt-4">Ficha técnica</label>
                                <br />
                                <input
                                    className="w-96 bg-transparent p-2 rounded-lg justify-center"
                                    type='file'
                                    name="techinicalSheet"
                                    ref={imageProd}
                                    onChange={handleTecnicalSheet}
                                    disabled={isInputDisabled}
                                />
                            </div>
                        )}
                    </div>
                    <Card className="flex flex-col justify-center items-center lg:w-1/3 w-1/2 h-[720px]">
                        <CardHeader className="flex justify-center items-center text-center">
                            <ButtonGroup className="flex justify-center items-center w-full h-12 p-3">
                                {CardType.CardType === "general" ? (
                                    <Button
                                        auto
                                        variant="success"
                                        className="bg-[#3B3B3B] hover:bg-primary text-white font-bold p-3 h-12 w-1/3 mt-1"
                                        size="sm"
                                        onPress={() => setCardType({ ...CardType, CardType: "general" })}
                                        disabled={loading}
                                    >
                                        Datos generales
                                    </Button>
                                ) : (
                                    <Button
                                        auto
                                        variant="success"
                                        className="bg-transparent hover:bg-[#3B3B3B] text-white font-bold p-3 h-12 w-1/3 mt-1"
                                        size="sm"
                                        onPress={() => setCardType({ ...CardType, CardType: "general" })}
                                        disabled={loading}
                                    >
                                        Datos generales
                                    </Button>
                                )}
                                {CardType.CardType === "prices" ? (
                                    <Button
                                        auto
                                        variant="success"
                                        className="bg-[#3B3B3B] hover:bg-primary text-white font-bold p-3 h-12 w-1/3 mt-1"
                                        size="sm"
                                        onPress={() => setCardType({ ...CardType, CardType: "prices" })}
                                        disabled={loading}
                                    >
                                        Precios
                                    </Button>
                                ) : (
                                    <Button
                                        auto
                                        variant="success"
                                        className="bg-transparent hover:bg-[#3B3B3B]  text-white font-bold p-3 h-12 w-1/3 mt-1"
                                        size="sm"
                                        onPress={() => setCardType({ ...CardType, CardType: "prices" })}
                                        disabled={loading}
                                    >
                                        Precios
                                    </Button>
                                )}
                                {CardType.CardType === "regulations" ? (
                                    <Button
                                        auto
                                        variant="success"
                                        className="bg-[#3B3B3B] hover:bg-primary text-white font-bold p-3 h-12 w-1/3 mt-1"
                                        size="sm"
                                        onPress={() => setCardType({ ...CardType, CardType: "regulations" })}
                                        disabled={loading}
                                    >
                                        Regulaciones
                                    </Button>
                                ) : (
                                    <Button
                                        auto
                                        variant="success"
                                        className="bg-transparent hover:bg-[#3B3B3B] text-white font-bold p-3 h-12 w-1/3 mt-1"
                                        size="sm"
                                        onPress={() => setCardType({ ...CardType, CardType: "regulations" })}
                                        disabled={loading}
                                    >
                                        Regulaciones
                                    </Button>
                                )}
                            </ButtonGroup>
                        </CardHeader>
                        <CardBody className="flex flex-col justify-center items-center w-full">
                            {CardType.CardType === "general" && (
                                <div>
                                    <div className="flex text-center justify-center items-center">
                                        <label className="text-foreground font-bold text-lg text-center mt-4">Datos Generales</label>
                                    </div>
                                    <div className="flex items-center">
                                        <Input
                                            className="w-1/2 mr-4 mt-4"
                                            label='Nombre del producto'
                                            labelPlacement='outside'
                                            placeholder='Nombre del producto'
                                            name="productName"
                                            value={product.productName}
                                            onChange={handleInputChange}
                                            disabled={isInputDisabled}
                                        />
                                        <Input
                                            className="w-1/2 mr-4 mt-4"
                                            label='Código de la empresa'
                                            labelPlacement='outside'
                                            placeholder='Código de la empresa'
                                            name="companyCode"
                                            value={product.companyCode}
                                            onChange={handleInputChange}
                                            disabled={isInputDisabled}
                                        />
                                    </div>
                                    <div className="flex items-start">
                                        <Input
                                            className="w-full mr-4 mt-4"
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
                                        <Dropdown>
                                            <DropdownTrigger>
                                                <Input
                                                    className="w-1/2 mr-4 mt-4"
                                                    label='Marca'
                                                    labelPlacement='outside'
                                                    placeholder='Marca'
                                                    name="brand"
                                                    value={product.brand || "selecciona una marca"}
                                                    onChange={handleInputChange}
                                                    disabled={isInputDisabled}
                                                />
                                            </DropdownTrigger>
                                            <DropdownMenu>
                                                <DropdownSection>
                                                    {productsBrands.brands.map((brand) => (
                                                        <DropdownItem
                                                            key={brand.value}
                                                            onClick={() => setProduct({ ...product, brand: brand.value })}
                                                        >
                                                            {brand.label}
                                                        </DropdownItem>
                                                    ))}
                                                </DropdownSection>
                                            </DropdownMenu>
                                        </Dropdown>
                                        <Input
                                            className="w-1/2 mr-4 mt-4 inline-flex"
                                            label='Modelo'
                                            labelPlacement='outside'
                                            placeholder='Modelo'
                                            name="model"
                                            value={product.model}
                                            onChange={handleInputChange}
                                            disabled={isInputDisabled}
                                        />
                                    </div>
                                </div>
                            )}
                            {CardType.CardType === "prices" && (
                                <div>
                                    <div className="flex justify-center items-center text-center">
                                        <label className="text-foreground font-bold text-lg my-5 text-center mt-4">Precios</label>
                                    </div>
                                    <div className="flex items-center">
                                        <Input
                                            className="w-1/2 mr-4 mt-4"
                                            type='number'
                                            label='Precio 1'
                                            labelPlacement='outside'
                                            placeholder='Precio 1'
                                            name="price1"
                                            value={product.price1}
                                            onChange={handleInputChange}
                                            disabled={isInputDisabled}
                                        />
                                        <Input
                                            className="w-1/2 mr-4 mt-4"
                                            type='number'
                                            label='Precio 2'
                                            labelPlacement='outside'
                                            placeholder='Precio 2'
                                            name="price2"
                                            value={product.price2}
                                            onChange={handleInputChange}
                                            disabled={isInputDisabled}
                                        />
                                    </div>
                                    <div className="flex items-center">
                                        <Input
                                            className="w-1/2 mr-4 mt-4"
                                            type='number'
                                            label='Precio 3'
                                            labelPlacement='outside'
                                            placeholder='Precio 3'
                                            name="price3"
                                            value={product.price3}
                                            onChange={handleInputChange}
                                            disabled={isInputDisabled}
                                        />
                                        <Input
                                            className="w-1/2 mr-4 mt-4"
                                            type='number'
                                            label='Precio 4'
                                            labelPlacement='outside'
                                            placeholder='Precio 4'
                                            name="price4"
                                            value={product.price4}
                                            onChange={handleInputChange}
                                            disabled={isInputDisabled}
                                        />
                                    </div>
                                    <div className="flex justify-center items-center text-center">
                                        <label className="text-foreground font-bold text-lg my-5 text-center mt-4">Tarifas</label>
                                    </div>
                                    <div className="flex items-center">
                                        <Input
                                            className="w-1/2 mr-4 mt-4"
                                            type='number'
                                            label='Tarifa 1'
                                            labelPlacement='outside'
                                            placeholder='Tarifa 1'
                                            name="rate1"
                                            value={product.rate1}
                                            onChange={handleInputChange}
                                            disabled={isInputDisabled}
                                        />
                                        <Input
                                            className="w-1/2 mr-4 mt-4"
                                            type='number'
                                            label='Tarifa 2'
                                            labelPlacement='outside'
                                            placeholder='Tarifa 2'
                                            name="rate2"
                                            value={product.rate2}
                                            onChange={handleInputChange}
                                            disabled={isInputDisabled}
                                        />
                                    </div>
                                    <div className="flex items-center">
                                        <Input
                                            className="w-full mr-4 mt-4"
                                            type='number'
                                            label='Tarifa 3'
                                            labelPlacement='outside'
                                            placeholder='Tarifa 3'
                                            name="rate3"
                                            value={product.rate3}
                                            onChange={handleInputChange}
                                            disabled={isInputDisabled}
                                        />
                                    </div>
                                </div>
                            )}
                            {CardType.CardType === "regulations" && (
                                <div>
                                    <div className="flex align-middle justify-center">
                                        <label className="text-foreground font-bold text-lg my-5 text-center mt-4">Regulaciones</label>
                                    </div>
                                    <div className="flex items-center">
                                        <Input
                                            className="w-1/3 mr-4 mt-4"
                                            label='Código SAT del producto'
                                            labelPlacement='outside'
                                            name="satProductCode"
                                            placeholder='Código SAT del producto'
                                            value={product.satProductCode}
                                            onChange={handleInputChange}
                                            disabled={isInputDisabled}
                                        />
                                        <Dropdown
                                            backdrop='blur'
                                        >
                                            <DropdownTrigger>
                                                <Input
                                                    className="w-1/3 mr-4 mt-4"
                                                    label='Código de unidad SAT'
                                                    labelPlacement='outside'
                                                    selectionMode="single"
                                                    name="satUnitCode"
                                                    placeholder='Código de unidad SAT'
                                                    value={product.satUnitCode || "selecciona un código"}
                                                    onChange={handleInputChange}
                                                    isDisabled={isInputDisabled}
                                                />
                                            </DropdownTrigger>
                                            <DropdownMenu>
                                                <DropdownSection>
                                                    {productUnits.units.map((unit) => (
                                                        <DropdownItem
                                                            key={unit.value}
                                                            onClick={() => setProduct({ ...product, satUnitCode: unit.value, unitMeasurement: unit.label })}
                                                        >
                                                            {unit.label}
                                                        </DropdownItem>
                                                    ))}
                                                </DropdownSection>
                                            </DropdownMenu>
                                        </Dropdown>
                                        <Input
                                            className="w-1/3 mr-4 mt-4"
                                            label='Unidad de medida'
                                            labelPlacement='outside'
                                            name="unitMeasurement"
                                            placeholder='Unidad de medida'
                                            value={product.unitMeasurement}
                                            onChange={handleInputChange}
                                            disabled={true}
                                        />
                                    </div>
                                </div>
                            )}
                        </CardBody>
                        <CardFooter className="flex justify-center items-center text-center">
                            {!isInputDisabled && (
                                <div className="flex justify-center mt-4">
                                    <Button
                                        auto
                                        startContent={<MdSave />}
                                        variant="success"
                                        className="bg-primary hover:bg-red-700  text-white font-bold p-3 w-full h-12 mt-10 mb-10"
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
                                    className="bg-primary hover:bg-red-700  text-white font-bold p-3 w-full h-12 mt-10 mb-10"
                                    size="sm"
                                    onClick={() => navigate('/products')}
                                    disabled={loading}
                                >
                                    Volver
                                </Button>
                            )}
                        </CardFooter>
                    </Card>
                </div>
            )
            }
        </div >
    )
}

export default NewProducts
