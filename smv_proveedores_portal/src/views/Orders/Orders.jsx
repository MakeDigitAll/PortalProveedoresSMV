import React, { useState, useEffect } from 'react';
import {
    Dropdown,
    DropdownTrigger,
    DropdownSection,
    DropdownMenu,
    DropdownItem,
    Spacer,
    Divider, link, Checkbox, Card,
} from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, Pagination, Chip } from "@nextui-org/react";
import Header from "../../components/header/headerC/Header";
import { useNavigate, useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { IoMdEye } from "react-icons/io";
import { RiDashboard2Fill, RiPencilLine } from "react-icons/ri";
import { Input, Link, Button, Textarea, User, Spinner, Radio, RadioGroup } from "@nextui-org/react";
import { MdShoppingCart } from "react-icons/md";
import { TbDotsVertical, TbPlus, TbReload, TbTrash } from "react-icons/tb";
import { MdFilterListAlt, MdDelete, MdSearch } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import moment from 'moment';
import useAuth from '../../hooks/useAuth';
import '../../App.css';

import useAxiosPrivate from '../../hooks/useAxiosPrivate';


const Orders = () => {
    const navigate = useNavigate();
    const axios = useAxiosPrivate();
    const { auth } = useAuth();
    const ID = auth?.ID;
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const [order, setOrder] = useState([]);
    const [DelItem, setDelItem] = useState({});
    const [isLoading, setLoading] = useState(true);
    const [searchFolio, setSearchFolio] = useState('');
    const [searchDate, setSearchDate] = useState('');
    const [searchStatus, setSearchStatus] = useState('');

    const columns = [
        {
            key: "folio",
            label: "Folio",
        },
        {
            key: "orderDate",
            label: "Fecha",
        },
        {
            key: "amountPending",
            label: "Pendiente",
        },
        {
            key: "total",
            label: "Total",
        },
        {
            key: "orderStatus",
            label: "estatus",
        },
        {
            key: "facture",
            label: "Factura",
        },
        {
            key: "fulfilled",
            label: "Surtido",
        },
        {
            key: "actions",
            label: "Acciones",
        },
    ];

    //-----------------------------------------------------------------
    //                      Funcion de borrado
    //-----------------------------------------------------------------

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/orders/deleteOrder/${id}/${ID}`);
            window.location.reload();
            toast.success("Pedido eliminado con éxito");
        } catch (error) {
            console.log(error);
            toast.error("Error al eliminar el pedido");
        }
    };


    const handlerDel = (id, folio) => {
        setDelItem({ id, folio });
        onOpen();
    };

    const handleDelClose = () => {
        onClose();
        setDelItem(null);
    };


    const handleDeleteItem = () => {
        handleDelete(DelItem.id);
        onClose();
        setDelItem(null);
    }

    //-----------------------------------------------------------------
    //                      Funcion de busqueda
    //-----------------------------------------------------------------

    const handlerSearch = (order) => {
        if (searchFolio === '' && searchDate === '' && searchStatus === '') {
            return order;
        } else {
            return order.filter((order) => {
                const folioMatch =
                    searchFolio === '' || order.folio.toString().includes(searchFolio);

                const dateMatch =
                    searchDate === '' ||
                    order.orderDate.includes(searchDate);

                const statusMatch =
                    searchStatus === '' || order.orderStatus.toLowerCase().includes(searchStatus.toLowerCase());

                return folioMatch && dateMatch && statusMatch;
            });
        }
    };





    //-----------------------------------------------------------------
    //                      render de tabla
    //-----------------------------------------------------------------

    const statusColorMap = {
        Nuevo: "primary",
        Facturado: "secondary",
        Cerrado: "default",
    };

    const renderCell = React.useCallback((order, column) => {
        const cellValue = order[column];
        switch (column) {
            case "folio":
                return (
                    <div className="flex items-center">
                        <p className='text-base'>{cellValue}</p>
                    </div>
                );
            case "orderDate":
                return (
                    <div className="flex items-center">
                        <p className='text-base'>{moment(cellValue).format('DD/MM/YYYY HH:mm')}</p>
                    </div>
                );
            case "amountPending":
                return (
                    <div className="flex items-center">
                        <p className='text-base'>${cellValue}</p>
                    </div>
                );
            case "total":
                return (
                    <div className="flex items-center">
                        <p className='text-base'>${cellValue}</p>
                    </div>
                );
            case "orderStatus":
                return (
                    <div className="flex items-center">
                        <Chip className='capitalize' color={statusColorMap[cellValue]}>{cellValue}</Chip>
                    </div>
                );
            case "facture":
                return (
                    <div className="flex items-center">
                        <p className='text-base'>{cellValue}</p>
                    </div>
                );
            case "fulfilled":
                return (
                    <div className="flex items-center">
                        <Checkbox
                            className='text-base'
                            color="primary"
                            checked={cellValue}
                            isDisabled
                        />
                    </div>
                );
            case 'actions':
                return (
                    <div className="flex items-center">
                        <Dropdown placement="bottom-start" backdrop="blur">
                            <DropdownTrigger
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    backgroundColor: "inherit",
                                }}
                            >
                                <Button
                                    startContent={<TbDotsVertical />}
                                    size="sm"
                                    className="text-inherit"
                                    variant="success"
                                    color="inherit"
                                    auto
                                />
                            </DropdownTrigger>
                            <DropdownMenu
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            >
                                <DropdownSection title="Acciones"
                                >
                                    <DropdownItem
                                        startContent={<IoMdEye />}
                                        onClick={() => {
                                            navigate(`/Orders/View/${order.id}`)
                                        }}
                                    >
                                        Ver
                                    </DropdownItem>
                                    <DropdownItem
                                        startContent={<RiPencilLine />}
                                        onClick={() => {
                                            navigate(`/Orders/Edit/${order.id}`)
                                        }}
                                    >
                                        Editar
                                    </DropdownItem>
                                </DropdownSection>
                                <DropdownSection title="Eliminar">
                                    <DropdownItem
                                        className='text-danger'
                                        color='danger'
                                        startContent={<MdDelete />}
                                        onPress={() => handlerDel(order.id, order.folio)}
                                    >
                                        Eliminar
                                    </DropdownItem>
                                </DropdownSection>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                );
            default:
                return <p>{value}</p>;
        }
    }, []);


    const getOrders = async () => {
        try {
            const response = await axios.get(`/orders/getOrder/${ID}`);
            const ordersData = response.data;
            setOrder(ordersData);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getOrders();
    }, []);

    return (
        <div className="flex flex-col w-full h-full">
            <Header />
            <ToastContainer />
            <div className="flex justify-between items-center ml-20 mt-10 mb-5 text-sm md:text-base">
                <div className="flex items-center md:sm">
                    <Breadcrumbs aria-label="breadcrumb" color="foreground" className='hidden md:flex'>
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
                            <MdShoppingCart sx={{ mr: 0.5 }} fontSize="inherit" />
                            Pedidos
                        </Typography>
                    </Breadcrumbs>
                </div>
            </div>

            <Modal
                size="xs"
                isOpen={isOpen}
                placement='auto'
                aria-labelledby='modal-delete'
                aria-describedby="modal-description"
                isDismissable={false}
                scrollBehavior="inside"
                onOpenChange={onOpenChange}
                backdrop='blur'
            >
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader>Eliminar pedido</ModalHeader>
                            <ModalBody>
                                <p>¿Está seguro que desea eliminar el pedido <b>{DelItem?.folio}</b>?</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    auto
                                    onClick={handleDeleteItem}
                                    className="text-inherit text-danger bg-transparent hover:bg-danger hover:text-white"
                                >
                                    Eliminar
                                </Button>
                                <Button
                                    auto
                                    onClick={handleDelClose}
                                    className="text-inherit bg-transparent hover:bg-gray-400 hover:text-black">
                                    Cancelar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>


            <div className="flex flex-col lg:flex-row lg:mx-20 mb-10 lg:mt-10 justify-center align-middle text-center items-center">
                <label className="text-base font-bold mr-10">Buscar:</label>
                <Input
                    startContent={<MdSearch />}
                    className='my-10 lg:w-1/5 w-1/2 mr-5'
                    placeholder="Buscar por folio"
                    size="small"
                    width="300px"
                    isClearable
                    onClear={() => setSearchFolio('')}
                    onChange={(e) => setSearchFolio(e.target.value)}
                />
                <Input
                    startContent={<MdSearch />}
                    className='my-10 lg:w-1/5 w-1/2 mr-5'
                    placeholder="Buscar por fecha"
                    type="date"
                    size="small"
                    width="300px"
                    isClearable
                    onClear={() => setSearchDate('')}
                    onChange={(e) => setSearchDate(e.target.value)}
                />

                <Dropdown
                    placement="bottom-start"
                    width="300px"

                >
                    <DropdownTrigger
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            backgroundColor: "inherit",
                        }}
                    >
                        <Button
                            size="sm"
                            variant="bordered"
                            color="inherit"
                            className='my-10 lg:w-1/12 w-1/2 mr-1'
                            auto
                        >
                            {searchStatus === '' ? 'Buscar por estatus' : searchStatus}
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <DropdownSection title="Buscar por estatus">
                            <DropdownItem
                                onClick={() => setSearchStatus('Nuevo')}
                            >
                                Nuevo
                            </DropdownItem>
                            <DropdownItem
                                onClick={() => setSearchStatus('Facturado')}
                            >
                                Facturado
                            </DropdownItem>
                            <DropdownItem
                                onClick={() => setSearchStatus('Cerrado')}
                            >
                                Cerrado
                            </DropdownItem>
                        </DropdownSection>
                    </DropdownMenu>
                </Dropdown>

                <Button
                    auto
                    startContent={<MdFilterListAlt />}
                    className="mr-10 mt-10 text-inherit bg-[#AB6A00] justify-end m-auto"
                    size="small"
                    onPress={() => {
                        setSearchDate('');
                        setSearchFolio('');
                        setSearchStatus('');
                    }
                    }
                >
                    limpiar filtro
                </Button>
                <Button
                    auto
                    startContent={<TbPlus />}
                    className="mr-10 mt-10 text-inherit bg-primary justify-end lg:ml-20 m-auto"
                    size="small"
                    variant="success"
                    onClick={() => navigate(`/Orders/New`)}
                >
                    Nuevo pedido
                </Button>
            </div>
            <div className="flex flex-col lg:mx-20">
                <Table
                    aria-label=" table with pagination"
                    color={'default'}
                    isHeaderSticky
                    classNames={{
                        wrapper: "max-h-[500px]",
                    }}
                >
                    <TableHeader
                        columns={columns}
                        className='text-inherit '
                    >
                        {(column) => <TableColumn key={column.key} align={column.uid === "actions" ? "center" : "start"}>{column.label}</TableColumn>}
                    </TableHeader>
                    <TableBody items={handlerSearch(order)}
                        isLoading={isLoading}
                        emptyContent={
                            order.length === 0 ? (
                                <Spinner label="Cargando" />
                            ) : (
                                "No products found"
                            )
                        }
                    >
                        {(item) => (
                            <TableRow key={item.id}>
                                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default Orders
