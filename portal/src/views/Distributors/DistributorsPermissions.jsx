import React, { useState, useEffect } from 'react';
import Header from '../../components/header/Header';
import ItemsCards from '../../components/header/headerC/ItemsCards'
import { Button, Container, Spacer } from '@nextui-org/react'
import { Table, Tooltip, User, Text, Link, Grid, Input, Modal, Row, Col, Checkbox } from "@nextui-org/react";
import { IconButton } from "../../components/Home/IconButton";
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { MdAddCircleOutline, MdDelete, MdEdit, MdHomeFilled, MdSettings, MdOutlineVisibility, MdCheckCircle, MdPerson, MdOutlineCheck } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import '../../App.css';

import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { use } from 'i18next';

const DistributorsPermissions = () => {
    const { auth } = useAuth();
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

    const [loading, setLoading] = useState(false);
    const [permisos, setPermisos] = useState([]);

    const fetchData = async () => {

        try {
            setLoading(true);
            const result = await axios.get(`/distributors/permissions/${id}`);
            const cleanedString = result.data.permission.replace(/[{}"]/g, '');
            const rolesArrayWithStrings = cleanedString.split(',');
            const roles = [
                {
                    id: result.data.userId,
                    username: result.data.distributorName,
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
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }
        , []);


    console.log(permisos);

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
                    <Row justify="center">
                        <Checkbox
                            name={2001}
                            isSelected={permisos[0]['pedidos'] === '2001'}
                            onChange={() => handleCheckboxChange('pedidos')}
                        />
                    </Row>
                );
            case 'finanzas':
                return (
                    <Row justify="center">
                        <Checkbox
                            name={2002}
                            isSelected={permisos[0]['finanzas'] === '2002'}
                            onChange={() => handleCheckboxChange('finanzas')}
                        />
                    </Row>
                );
            case 'productos':
                return (
                    <Row justify="center">
                        <Checkbox
                            name={2003}
                            isSelected={permisos[0]['productos'] === '2003'}
                            onChange={() => handleCheckboxChange('productos')}
                        />
                    </Row>
                );
            case 'facturacion':
                return (
                    <Row justify="center">
                        <Checkbox
                            name={2004}
                            isSelected={permisos[0]['facturacion'] === '2004'}
                            onChange={() => handleCheckboxChange('facturacion')}
                        />
                    </Row>
                );
            default:
                return cellValue;
        }
    };




    const handleSave = async () => {
        const data = {
            permission: `{${permisos[0]['pedidos']},${permisos[0]['finanzas']},${permisos[0]['productos']},${permisos[0]['facturacion']},${rolDristribuidor}}`,
        };
        console.log(data);
        const result = await axios.put(`/distributors/permissions/${id}/${auth.referenceCode}`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (result.status === 200) {
            alert('Permisos actualizados');
            navigate('/distributors', { replace: true });
        }
    };

    return (
        <Container fluid>
            <Header />
            <ItemsCards />
            <Spacer y={1} />
            <Container>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/" startIcon={<MdHomeFilled fontSize="small" />}>
                        Inicio
                    </Link>
                    <Typography
                        underline="hover"
                        sx={{ display: 'flex', alignItems: 'center' }}
                        color="inherit"
                        href="/"
                    >
                        <MdPerson sx={{ mr: 0.5, }} fontSize="12px" />
                        <Text h5 style={{ marginLeft: '5px', marginTop: '13px', fontSize: '12px' }}>Distribuidores</Text>
                    </Typography>
                </Breadcrumbs>
                <Spacer y={2} />
                <Text align='center' h3 style={{ marginLeft: '5px', marginTop: '13px', fontSize: '20px' }}>Permisos del distribuidor {permisos[0]?.username}</Text>
                <Spacer y={2} />
                <Row css={{ height: '100px' }}>
                    <Col>
                        {permisos.length === 0 ? (
                            <div>No hay datos disponibles.</div>
                        ) : (
                            <Table
                                compact
                                css={{
                                    minWidth: '100%',
                                }}
                                loading={loading}
                            >
                                <Table.Header columns={columns}>
                                    {(column) => (
                                        <Table.Column
                                            key={column.uid}
                                            align={"center"}
                                        >
                                            {column.name}
                                        </Table.Column>
                                    )}
                                </Table.Header>
                                <Table.Body items={permisos}>
                                    {(item) => (
                                        <Table.Row key={item.id}>
                                            {(columnKey) => (
                                                <Table.Cell>{renderCells(item, columnKey)}</Table.Cell>
                                            )}
                                        </Table.Row>
                                    )}
                                </Table.Body>
                            </Table>
                        )}
                    </Col>
                </Row>
                <Spacer y={2} />
                <Row>
                    <Col css={{height: '100px' }}>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={handleSave}
                        >
                            Guardar
                        </Button>
                        </Col>
                        <Spacer x={1} />
                        <Col css={{ width: '1000000px' }}>
                        <Button
                            color="secondary"
                            variant="contained"
                            onClick={() => navigate('/distributors', { replace: true })}
                        >
                         Atras 
                        </Button>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
};

export default DistributorsPermissions;