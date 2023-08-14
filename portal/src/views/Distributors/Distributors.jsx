import React, { useState, useEffect } from 'react';
import Header from '../../components/header/Header';
import ItemsCards from '../../components/header/headerC/ItemsCards'
import { Button, Container, Dropdown, Spacer } from '@nextui-org/react'
import { Table, Tooltip, User, Text, Link, Grid, Input, Modal, Row, Col } from "@nextui-org/react";
import { IconButton } from "../../components/Home/IconButton";
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { MdAddCircleOutline, MdDelete, MdEdit, MdHomeFilled, MdSettings, MdOutlineVisibility, MdCheckCircle, MdPerson, MdOutlineCheck } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import '../../App.css';

import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const Distributors = () => {
    const { auth } = useAuth();
    const navigate = useNavigate();
    const axios = useAxiosPrivate();


    const columns = [
        { name: 'Nombre', uid: 'distributorName' },
        { name: 'Direccion', uid: 'address' },
        { name: 'city', uid: 'city' },
        { name: 'Estado', uid: 'state' },
        { name: 'Telefono', uid: 'phone' },
        { name: 'Acciones', uid: 'actions' },
    ];

    const [data, setData] = useState([]);
    const [dataWaiting, setDataWaiting] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchName, setSearchName] = useState('');
    const [searchPhone, setSearchPhone] = useState('');
    const [searchCity, setSearchCity] = useState('');

    const [DelItem, setDelItem] = useState(null);
    const [openDel, setOpenDel] = React.useState(false);

    const [openWaiting, setOpenWaiting] = React.useState(false);

    const fetchData = async () => {
        const result = await axios.get(`/distributors/ref/${auth.referenceCode}`);
        setData(result.data);
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);


    const handleDelete = async (id) => {
        await axios.delete(`/distributors/decline/${id}/${auth.referenceCode}`);
        setData(data.filter((item) => item.id !== id));
    }

    const handleSearchName = (e) => {
        setSearchName(e.target.value);
    }

    const handleSearchPhone = (e) => {
        setSearchPhone(e.target.value);
    }

    const handleSearchCity = (e) => {
        setSearchCity(e.target.value);
    }

    const filteredDistributors = data.filter((data) => {
        return data.distributorName.toLowerCase().includes(searchName.toLowerCase()) &&
            data.phone.toLowerCase().includes(searchPhone.toLowerCase()) &&
            data.city.toLowerCase().includes(searchCity.toLowerCase())
    })


    //--------------------Eliminar--------------------
    const handlerDel = (id) => {
        setDelItem({ id, userName: data.find((item) => item.id === id).distributorName });
        setOpenDel(true);
    };

    const handleDelClose = () => {
        setOpenDel(false);
        setDelItem(null);
    };

    const handleDeleteItem = () => {
        handleDelete(DelItem.id);
        setOpenDel(false);
        setDelItem(null);
    }

    const renderCells = (item, columnKey) => {
        const cellValue = item[columnKey];
        switch (columnKey) {
            case 'distributorName':
                return (
                    <User squared src={'avatar'} name={cellValue} css={{ p: 0 }} >
                        <Text>{item.email}</Text>
                    </User>
                );
            case 'address':
                return (
                    <Text align={"center"}>{cellValue}</Text>
                );
            case 'city':
                return (
                    <Text align={"center"}>{cellValue}</Text>
                );
            case 'state':
                return (
                    <Text align={"center"}>{cellValue}</Text>
                );
            case 'phone':
                return (
                    <Text align={"center"}>{cellValue}</Text>
                );
            case 'actions':
                return (
                    <Row justify="center" align="center">
                        <Col css={{ d: "flex" }}>
                            <Dropdown>
                                <Dropdown.Button flat color="secundary" size='sm' width='100%'>
                                    <MdSettings size={20} fill="#979797" />
                                </Dropdown.Button>
                                <Dropdown.Menu
                                    aria-label='Dropdown menu'
                                    css={{ minWidth: '150px' }}
                                    align='center'
                                    color='primary'
                                    selectionMode='single'
                                    closeOnSelect
                                    onAction={(selected) => handleOptions(selected, item.id)}
                                >
                                    <Dropdown.Item key='View' icon={<MdOutlineVisibility size={20} fill="#979797" />}>
                                        Ver
                                    </Dropdown.Item>
                                    <Dropdown.Item key='Edit' icon={<MdEdit size={20} fill="#979797" />}>
                                        Editar
                                    </Dropdown.Item>
                                    <Dropdown.Item key='Permissions' icon={<MdOutlineCheck size={20} fill="#979797" />}>
                                        Permisos
                                    </Dropdown.Item>
                                    <Dropdown.Item withDivider key='Delete' color='error' icon={<MdDelete size={20} fill="#979797" />}>
                                        Eliminar
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>
                );
            default:
                return cellValue;
        }
    };

    const handleOptions = (selected, id) => {
        switch (selected) {
            case 'View':
                navigate(`/distributors/View/${id}`);
                break;
            case 'Edit':
                navigate(`/distributors/Edit/${id}`);
                break;
            case 'Permissions':
                navigate(`/distributors/Permissions/${id}`);
                break;
            case 'Delete':
                handlerDel(id);
                break;
            default:
                break;
        }
    };

        


    //--------------------Distribuidores Pendientes--------------------

    const handlerWaiting = () => {
        setOpenWaiting(true);
        const fetchData = async () => {
            setLoading(true);
            const result = await axios.get(`/distributors/waiting/${auth.referenceCode}`);
            setDataWaiting(result.data);
            setLoading(false);
        }
        fetchData();
    };



    const handleWaitingClose = () => {
        setOpenWaiting(false);
    };

    const handleWaitingConfirm = (id) => {
        handleConfirmDistributor(id);
        fetchData();

    }

    const handleWaitingDecline = (id) => {
        handleDeclineDistributor(id);
        fetchData();
    }

    //--------------------Confirmar Distribuidor--------------------

    const handleConfirmDistributor = async (id) => {
        const estatus = 'Activo';
        await axios.put(`/distributors/confirm/${id}/${estatus}/${auth.referenceCode}`);
        setDataWaiting((dataWaiting) => dataWaiting.filter((item) => item.id !== id));
    }

    //--------------------Rechazar Distribuidor--------------------

    const handleDeclineDistributor = async (id) => {
        await axios.delete(`/distributors/decline/${id}/${auth.referenceCode}`);
        setDataWaiting((dataWaiting) => dataWaiting.filter((item) => item.id !== id));

    }
    const renderCellsWaiting = (item, columnKey) => {
        const cellValue = item[columnKey];
        switch (columnKey) {
            case 'distributorName':
                return (
                    <User squared src={'avatar'} name={cellValue} css={{ p: 0 }} >
                        <Text align="center">{cellValue}</Text>
                    </User>
                );
            case 'actions':
                return (
                    <Row justify="center" align="center">
                        <Col css={{ d: "flex" }}>
                            <Tooltip content="Confirmar">
                                <IconButton onClick={() => handleWaitingConfirm(item.id)} >
                                    <MdCheckCircle size={20} fill="#979797" />
                                </IconButton>
                            </Tooltip>
                        </Col>
                        <Col css={{ d: "flex" }}>
                            <Tooltip content="Rechazar" color="error" onClick={() => handleWaitingDecline(item.id)}>
                                <IconButton>
                                    <MdDelete size={20} fill="#979797" />
                                </IconButton>
                            </Tooltip>
                        </Col>
                    </Row>
                );
            default:
                return cellValue;
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
                <Spacer y={1} />
                <Grid.Container gap={1} justify="center">
                    <Grid xs={3}>
                        <Input
                            width="100%"
                            type="text"
                            size="sm"
                            label="Buscar distribuidor"
                            placeholder="Nombre"
                            color="default"
                            value={searchName}
                            onChange={handleSearchName}
                        />
                    </Grid>
                    <Grid xs={3}>
                        <Input
                            width="100%"
                            type="Number"
                            css={{ marginTop: '23px' }}
                            size="sm"
                            placeholder='Telefono'
                            color="default"
                            value={searchPhone}
                            onChange={handleSearchPhone}
                        />
                    </Grid>
                    <Grid xs={3}>
                        <Input
                            width="100%"
                            type="text"
                            css={{ marginTop: '23px' }}
                            size="sm"
                            placeholder='Ciudad'
                            color="default"
                            value={searchCity}
                            onChange={handleSearchCity}
                        />
                    </Grid>
                    <Grid xs={3}>
                        <Button
                            color="success"
                            css={{ marginTop: '23px' }}
                            size="sm"
                            width="100%"
                            auto
                            icon={<MdAddCircleOutline />}
                            onClick={() => navigate('/distributors/New')}
                        >
                            Nuevo distribuidor
                        </Button>
                    </Grid>
                    <Grid xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Button
                            color="success"
                            css={{ marginTop: '23px' }}
                            size="sm"
                            auto
                            icon={<MdSettings />}
                            onClick={handlerWaiting}
                        >
                            Distribuidores pendientes
                        </Button>
                    </Grid>

                    {/* MODAL ELIMINACION */}

                    <Modal
                        closeButton
                        open={openDel}
                        onClose={handleDelClose}
                        aria-labelledby='modal-title'
                    >
                        <Modal.Header>
                            <Text size={18} id='modal-title'>
                                <Text b size={18}>Eliminar distribuidor</Text>
                            </Text>
                        </Modal.Header>
                        <Modal.Body>
                            <Text b size={16} align='center'>¿Está seguro que desea eliminar el distribuidor</Text>
                            <Text size={18} align='center'> {DelItem?.userName}?</Text>
                            <Text size={14} align='center'>Esta acción no se puede deshacer.</Text>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                color="error"
                                size="large"
                                auto
                                icon={<MdDelete />}
                                onClick={handleDeleteItem}
                            >
                                Eliminar
                            </Button>
                            <Button
                                color="secondary"
                                size="large"
                                auto
                                icon={<MdSettings />}
                                onClick={handleDelClose}
                            >
                                Cancelar
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    {/* fIN MODAL ELIMINACION */}

                    {/* MODAL DISTRIBUIDORES PENDIENTES */}

                    <Modal
                        open={openWaiting}
                        onClose={handleWaitingClose}
                        aria-labelledby='modal-title'
                        closeButton
                        css={{ minWidth: '500px', height: 'auto' }}
                    >
                        <Modal.Header>
                            <Text size={18} id='modal-title'>
                                <Text b size={18}>Distribuidores pendientes</Text>
                            </Text>
                        </Modal.Header>
                        <Modal.Body>
                            {dataWaiting.length === 0 ? (
                                <div>No tienes distribuidores pendientes</div>
                            ) : (
                                <Container css={{ height: 'auto', minWidth: '300px' }}>
                                    <Table
                                        compact
                                        css={{
                                            height: 'auto',
                                            minWidth: '100%',
                                        }}
                                        selectionMode='single'
                                        loading={loading}
                                    >
                                        <Table.Header columns={columns}>
                                            {(column) => (
                                                <Table.Column
                                                    key={column.uid}
                                                    hideHeader={column.uid === 'actions'}
                                                    align={"center"}
                                                >
                                                    {column.name}
                                                </Table.Column>
                                            )}
                                        </Table.Header>
                                        <Table.Body items={dataWaiting}>
                                            {(item) => (
                                                <Table.Row>
                                                    {(columnKey) => (
                                                        <Table.Cell>{renderCellsWaiting(item, columnKey)}</Table.Cell>
                                                    )}
                                                </Table.Row>
                                            )}
                                        </Table.Body>
                                    </Table>
                                </Container>
                            )}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                color="secondary"
                                size="large"
                                auto
                                icon={<MdSettings />}
                                onClick={handleWaitingClose}
                            >
                                Cerrar
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    {/* FIN MODAL DISTRIBUIDORES PENDIENTES */}

                </Grid.Container>
                <Spacer y={2} />
                <Row>
                    <Col>
                        {data.length === 0 ? (
                            <div>No hay datos disponibles.</div>
                        ) : (
                            <Table
                                compact
                                css={{
                                    height: 'auto',
                                    minWidth: 'auto',
                                }}
                                selectionMode='none'
                                loading={loading}
                            >
                                <Table.Header columns={columns}>
                                    {(column) => (
                                        <Table.Column
                                            key={column.uid}
                                            hideHeader={column.uid === 'actions'}
                                            align={"center"}
                                        >
                                            {column.name}
                                        </Table.Column>
                                    )}
                                </Table.Header>
                                <Table.Body items={filteredDistributors}>
                                    {(item) => (
                                        <Table.Row>
                                            {(columnKey) => (
                                                <Table.Cell>{renderCells(item, columnKey)}</Table.Cell>
                                            )}
                                        </Table.Row>
                                    )}
                                </Table.Body>
                                <Table.Pagination
                                    align='center'
                                    rowsPerPage={10}
                                    onPageChange={(page) => console.log(page)}
                                    count={data?.length}
                                />
                            </Table>
                        )}

                    </Col>
                </Row>
            </Container>
        </Container>
    );
}

export default Distributors;