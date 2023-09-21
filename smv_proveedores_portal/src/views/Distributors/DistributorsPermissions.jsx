import React, { useState, useEffect } from 'react';
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
    Spinner,
    Input, Checkbox, Button, User,
} from "@nextui-org/react";
import Header from "../../components/header/headerC/Header";
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { ToastContainer, toast } from "react-toastify";
import { RiDashboard2Fill, RiUserSharedFill } from "react-icons/ri";
import { MdArrowDropDown, MdSearch, MdShoppingCart } from "react-icons/md";
import Link from "@mui/material/Link";
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import '../../App.css';

import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const DistributorsPermissions = () => {
    const { auth } = useAuth();
    const pvId = auth.ID;
    const navigate = useNavigate();
    const axios = useAxiosPrivate();
    const { id } = useParams();
    const rolDristribuidor = 2000;


    const columns = [
        { name: 'Pedidos', uid: 'pedidos' },
        { name: 'Finanzas', uid: 'finanzas' },
        { name: 'Productos', uid: 'productos' },
        { name: 'Facturacion', uid: 'facturacion' }
    ];

    const [loading, setLoading] = useState(true);
    const [permisos, setPermisos] = useState([]);

    const fetchData = async () => {

        try {
            const result = await axios.get(`/distributors/permissions/${id}`);
            const cleanedString = result.data.permission.replace(/[{}"]/g, '');
            const rolesArrayWithStrings = cleanedString.split(',');
            const roles = [
                {
                    id: result.data.userId,
                    username: result.data.distributorName,
                    avatar: result.data.avatar ? result.data.avatar : 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png',
                    pedidos: rolesArrayWithStrings[0],
                    finanzas: rolesArrayWithStrings[1],
                    productos: rolesArrayWithStrings[2],
                    facturacion: rolesArrayWithStrings[3],
                }
            ];
            setPermisos(roles);
            setLoading(false);
        } catch (error) {
            console.log(error);
            toast.error('Error al cargar los permisos', {
                position: "bottom-right",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                autoClose: 10000,
                theme: "colored",
            });

            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }
        , []);

    //los objetos pedidos, finanzas, productos, facturacion cambian de estado al cambiar el valor de permisos a uno no valido
    //entonces quiero cambiar el valor de permisos[0] a uno valido al marcar la casilla de verificacion
    // y al desmarcarlo que se cambie a uno no valido

    const handleCheckboxChange = (permiso) => {
        const updatedPermisos = { ...permisos[0] };

        if (permiso === 'pedidos') {
            updatedPermisos[permiso] = updatedPermisos[permiso] === '2001' ? '0' : '2001';
        }

        if (permiso === 'finanzas') {
            updatedPermisos[permiso] = updatedPermisos[permiso] === '2002' ? '0' : '2002';
        }

        if (permiso === 'productos') {
            updatedPermisos[permiso] = updatedPermisos[permiso] === '2003' ? '0' : '2003';
        }

        if (permiso === 'facturacion') {
            updatedPermisos[permiso] = updatedPermisos[permiso] === '2004' ? '0' : '2004';
        }

        setPermisos([updatedPermisos]);
    };


    const renderCells = (item, columnKey) => {
        const cellValue = item[columnKey];
        switch (columnKey) {
            case 'pedidos':
                return (
                    <div className='flex items-center justify-center'>
                        <Checkbox
                            name='2001'
                            size='sm'
                            isSelected={permisos[0]['pedidos'] === '2001'}
                            onChange={() => handleCheckboxChange('pedidos')}
                        />
                    </div>
                );
            case 'finanzas':
                return (
                    <div className='flex items-center justify-center'>
                        <Checkbox
                            name='2002'
                            isSelected={permisos[0]['finanzas'] === '2002'}
                            onChange={() => handleCheckboxChange('finanzas')}
                        />
                    </div>
                );
            case 'productos':
                return (
                    <div className='flex items-center justify-center'>
                        <Checkbox
                            name='2003'
                            isSelected={permisos[0]['productos'] === '2003'}
                            onChange={() => handleCheckboxChange('productos')}
                        />
                    </div>
                );
            case 'facturacion':
                return (
                    <div className='flex items-center justify-center'>
                        <Checkbox
                            name='2004'
                            isSelected={permisos[0]['facturacion'] === '2004'}
                            onChange={() => handleCheckboxChange('facturacion')}
                        />
                    </div>
                );
            default:
                return cellValue;
        }
    };




    const handleSave = async () => {
        try {
            const data = {
                permission: `{${permisos[0]['pedidos']},${permisos[0]['finanzas']},${permisos[0]['productos']},${permisos[0]['facturacion']},${rolDristribuidor}}`,
            };
            const result = await axios.put(`/distributors/permissions/${id}/${pvId}`, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (result.status === 200) {
                toast.success('Permisos actualizados correctamente', {
                    position: "bottom-right",
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    autoClose: 10000,
                    theme: "colored",
                });

                navigate('/distributors', { replace: true });
            }
        } catch (error) {
            console.log(error);
            toast.error('Error al actualizar los permisos', {
                position: "bottom-right",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                autoClose: 10000,
                theme: "colored",
            });

        }
    };

    return (
        <div className="flex flex-col w-full h-full">
            <Header />
            <ToastContainer />
            <div className="flex justify-between items-center ml-20 mt-10 mb-10">
                <div className="flex items-center">
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
                            onClick={() => navigate(`/distributors`)}
                        >
                            <RiUserSharedFill sx={{ mr: 0.5 }} fontSize="inherit" />
                            Distribuidores
                        </Link>
                        <Typography
                            sx={{ display: "flex", alignItems: "center" }}
                            className="text-foreground"
                        >
                            <MdShoppingCart sx={{ mr: 0.5 }} fontSize="inherit" />
                            Permisos del distribuidor
                        </Typography>
                    </Breadcrumbs>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-between items-center p-4 w-11/12 ml-20">
                    <Spinner color="primary" />
                </div>
            ) : (
                <><div className="flex justify-between items-center p-4 w-11/12 ml-20 mt-20">
                    <div className="flex items-center mt-1">
                        <Typography variant="h5" className="text-foreground">
                            Permisos del distribuidor
                            <User
                                name={permisos[0].username} 
                                description={permisos[0].id}
                                avatarProps={{src: permisos[0].avatar }}
                                size="lg"
                                className="ml-20"
                            />
                        </Typography>
                    </div>
                    <div className="flex items-center">
                        <Table aria-label="Example table with dynamic content">
                            <TableHeader
                                columns={columns}
                                className="bg-background"
                                style={{ width: '100%' }}
                            >
                                {columns.map((column) => (
                                    <TableColumn key={column.uid} align="center">
                                        {column.name}
                                    </TableColumn>
                                ))}
                            </TableHeader>
                            <TableBody items={permisos} className="bg-background">
                                {(item) => (
                                    <TableRow key={item.id}>
                                        {columnKey => <TableCell align="center">{renderCells(item, columnKey)}</TableCell>}
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div><div className="flex justify-center items-center mt-10">
                        <Button
                            auto
                            shadow
                            className="bg-primary hover:bg-primary-dark w-60 h-10"
                            onClick={handleSave}
                        >
                            Guardar
                        </Button>
                    </div></>
            )}
        </div>
    );
};

export default DistributorsPermissions;




