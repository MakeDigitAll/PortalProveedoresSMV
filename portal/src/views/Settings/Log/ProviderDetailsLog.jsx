import { Container, Spacer,Table,Text, Link, Button } from '@nextui-org/react'
import Header from '../../../components/header/Header';
import Footer from '../../../components/footer/Footer';
import ItemsCards from '../../../components/header/headerC/ItemsCards';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import axiosInstance from '../../../components/axios/axios';
import { useNavigate, useParams } from 'react-router-dom';
import { MdHomeFilled, MdSettings, MdReceiptLong } from 'react-icons/md';
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import '../../../App.css';

const ProviderDetailsLog = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [data, setData] = useState([]);

    const columns = [
        { name: "Usuario responsable", uid: "responsibleUser" },
        { name: "Operacion", uid: "action" },
        { name: "Fecha de modificacion", uid: "created_At" }
    ];

    const DetailColumns = [
        { name: "ID", uid: "id" },
        { name: "Nombre", uid: "providerName" },
        { name: "Razon social", uid: "socialReason" },
        { name: "Descuento de venta", uid: "discountSale" },
        { name: "Direccion", uid: "address" },
        { name: "Colonia", uid: "col" },
        { name: "RFC", uid: "rfc" },
        { name: "Ciudad", uid: "city" },
        { name: "Estado", uid: "state" },
        { name: "Codigo postal", uid: "postalCode" },
        { name: "Pais", uid: "country" },
        { name: "Contacto", uid: "contact" },
        { name: "Telefono", uid: "phone" },
        { name: "Correo electronico", uid: "email" }
    ];


    useEffect(() => {
        const fetchData = async () => {
            const result = await axiosInstance.get('/log/' + id);
            const formattedData = result.data.map(item => {
                const formattedCreatedAt = moment(item.created_At).format('YYYY-MM-DD HH:mm:ss');
                const formattedUpdatedAt = moment(item.updated_At).format('YYYY-MM-DD HH:mm:ss');
                const uppercaseAction = item.action.toUpperCase();

                return {
                    ...item,
                    created_At: formattedCreatedAt,
                    updated_At: formattedUpdatedAt,
                    action: uppercaseAction
                };
            });

            formattedData.sort((a, b) => {
                return moment(b.created_At).valueOf() - moment(a.created_At).valueOf();
            });

            setData(formattedData);
        };

        fetchData();
    }, []);

    const setColorActions = (action) => {
        if (action === 'INSERT') {
            return 'success';
        } else if (action === 'UPDATE') {
            return 'warning';
        } else if (action === 'DELETE') {
            return 'error';
        }
    };

    const renderCell = (item, columnKey) => {
        const cellValue = item[columnKey];
        switch (columnKey) {
            case "responsibleUser":
                return (
                    <Text align={"center"}> {cellValue} </Text>
                );
            case "action":
                return <Text align={"center"} color={setColorActions(cellValue)}>{cellValue}</Text>;
            case "created_At":
                return <Text align={"center"}>{cellValue}</Text>;
            default:
                return cellValue;
        }
    };

    const renderDetailOld = (item, columnKey) => {
        const cellValue = item[columnKey];
        switch (columnKey) {
            case "id":
                return (
                    <Text align={"center"}> {cellValue} </Text>
                );
            case "providerName":
                return (
                    <Text align={"center"}> {cellValue} </Text>
                );
            case "socialReason":
                return (
                    <Text align={"center"}> {cellValue} </Text>
                );
            case "discountSale":
                return (
                    <Text align={"center"}> {cellValue} </Text>
                );
            case "address":
                return (
                    <Text align={"center"}> {cellValue} </Text>
                );
            case "col":
                return (
                    <Text align={"center"}> {cellValue} </Text>
                );
            case "rfc":
                return (
                    <Text align={"center"}> {cellValue} </Text>
                );
            case "city":
                return (
                    <Text align={"center"}> {cellValue} </Text>
                );
            case "state":
                return (
                    <Text align={"center"}> {cellValue} </Text>
                );
            case "postalCode":
                return (
                    <Text align={"center"}> {cellValue} </Text>
                );
            case "country":
                return (
                    <Text align={"center"}> {cellValue} </Text>
                );
            case "contact":
                return (
                    <Text align={"center"}> {cellValue} </Text>
                );
            case "phone":
                return (
                    <Text align={"center"}> {cellValue} </Text>
                );
            case "email":
                return (
                    <Text align={"center"}> {cellValue} </Text>
                );
            default:
                return cellValue;
        }
    }

    return (
        <Container>
            <Header />
            <ItemsCards />
            <Breadcrumbs aria-label="breadcrumb">
                <Link
                    underline="hover"
                    sx={{ display: 'flex', alignItems: 'center' }}
                    color="inherit"
                    onClick={() => navigate("/Home")}
                    href="/Home"
                >
                    <MdHomeFilled sx={{ fontSize: '10px' }} fontSize={"12px"} />
                    <span style={{ marginLeft: '5px', marginTop: '3px', fontSize: '12px' }}> Inicio</span>
                </Link>
                <Link
                    underline="hover"
                    sx={{ display: 'flex', alignItems: 'center' }}
                    color="inherit"
                    onClick={() => navigate("/Settings")}
                    href="/Settings"
                >
                    <MdSettings sx={{ fontSize: '10px' }} fontSize={"12px"} />
                    <span style={{ marginLeft: '5px', marginTop: '3px', fontSize: '12px' }}>Ajustes</span>
                </Link>
                <Link
                    underline="hover"
                    sx={{ display: 'flex', alignItems: 'center' }}
                    color="inherit"
                    onClick={() => navigate("/Settings/Log/Providers", { replace: true })}
                    href="/Settings"
                >
                    <MdReceiptLong sx={{ fontSize: '10px' }} fontSize={"12px"} />
                    <span style={{ marginLeft: '5px', marginTop: '3px', fontSize: '12px' }}>Bitacora de proveedores</span>
                </Link>
                <Typography
                    underline="hover"
                    sx={{ display: 'flex', alignItems: 'center' }}
                    color="inherit"
                    href="/"
                >
                    <MdReceiptLong sx={{ mr: 0.5, }} fontSize={"12px"} />
                    <Text h5 style={{ marginLeft: '5px', marginTop: '13px', fontSize: '12px' }}>Detalle de los cambios</Text>
                </Typography>
            </Breadcrumbs>
            <Spacer y={1} />
            <Text h3 style={{ marginLeft: '5px', marginTop: '13px', fontSize: '20px' }} align={"center"}>Detalle de los cambios</Text>
            <Table
                compact
                css={{
                    height: "auto",
                    minWidth: "100%",
                }}
                selectionMode="single"
            >
                <Table.Header>
                    {columns.map((column) => (
                        <Table.Column
                            key={column.uid}
                            align={"center"}
                        >
                            {column.name}
                        </Table.Column>
                    ))}
                </Table.Header>
                <Table.Body items={data} maxHeight={100}>
                    {(item) => (
                        <Table.Row key={item.id}>
                            {columns.map((column) => (
                                <Table.Cell key={column.uid}>{renderCell(item, column.uid)}</Table.Cell>
                            ))}
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
            <Spacer y={1} />
            <Text h3 style={{ marginLeft: '5px', marginTop: '13px', fontSize: '20px' }} align={"center"}>Datos anteriores</Text>
            <Table>
                <Table.Header>
                    {DetailColumns.map((column) => (
                        <Table.Column
                            key={column.uid}
                            align={"center"}
                        >
                            {column.name}
                        </Table.Column>
                    ))}
                </Table.Header>
                <Table.Body items={data} maxHeight={100}>
                    {(item) => (
                        <Table.Row key={item.id}>
                            {DetailColumns.map((column) => (
                                <Table.Cell key={column.uid}>{renderDetailOld(item.oldData, column.uid)}</Table.Cell>
                            ))}
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
            <Spacer y={1} />
            <Text h3 style={{ marginLeft: '5px', marginTop: '13px', fontSize: '20px' }} align={"center"}>Nuevos datos</Text>
            <Table>
                <Table.Header>
                    {DetailColumns.map((column) => (
                        <Table.Column
                            key={column.uid}
                            align={"center"}
                        >
                            {column.name}
                        </Table.Column>
                    ))}
                </Table.Header>
                <Table.Body items={data} maxHeight={100}>
                    {(item) => (
                        <Table.Row key={item.id}>
                            {DetailColumns.map((column) => (
                                <Table.Cell key={column.uid}>{renderDetailOld(item.newData, column.uid)}</Table.Cell>
                            ))}
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
            <Button
                style={{ marginTop: '20px', marginLeft: '5px' }}
                color="secondary"
                variant="outlined"
                onClick={() => navigate("/Settings/Log/Providers", { replace: true })}
            >
                Regresar
            </Button>
            <Spacer y={2} />
            <Footer />
        </Container>
    );
};

export default ProviderDetailsLog;