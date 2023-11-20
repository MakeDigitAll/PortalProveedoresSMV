import React, { useState, useEffect } from 'react';
import {
    Dropdown,
    DropdownTrigger,
    DropdownSection,
    DropdownMenu,
    DropdownItem,
} from "@nextui-org/react";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, Pagination, Chip } from "@nextui-org/react";
import Header from "../../components/header/headerC/Header";
import { useNavigate, useParams } from 'react-router-dom';
import { GiCash } from "react-icons/gi";
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import FacturaComponent from '../../components/Invoices/InvoiceComponent';
import { IoMdEye } from "react-icons/io";
import { RiDashboard2Fill} from "react-icons/ri";
import { Link, Button, Spinner} from "@nextui-org/react";
import { MdShoppingCart } from "react-icons/md";
import { TbDotsVertical } from "react-icons/tb";
import {  MdDelete,} from "react-icons/md";
import { IoIosPrint } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import { ReactToPrint } from 'react-to-print';
import useAuth from '../../hooks/useAuth';
import moment from 'moment';
import '../../App.css';

import useAxiosPrivate from '../../hooks/useAxiosPrivate';


const Invoices = () => {
    const { auth } = useAuth();
    const axios = useAxiosPrivate();
    const [invoices, setInvoices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInvoices = async () => {
            const invoicesData = await axios.get(`/invoices/all`);
            console.log(invoicesData.data);
            setInvoices(invoicesData.data);
            setIsLoading(false);
        };
        fetchInvoices();
    }, []);

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
            key: "actions",
            label: "Acciones",
        },
    ];

    const renderCell = React.useCallback((invoice, column) => {
        const cellValue = invoice[column];
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
            case "estimatedDeliveryDate":
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
            case "facture":
                return (
                    <div className="flex items-center">
                        <p className='text-base'>{cellValue}</p>
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
                                            navigate(`/Orders/View/${invoices.id}`)
                                        }}
                                    >
                                        Ver Pedido
                                    </DropdownItem>
                                </DropdownSection>
                                <DropdownSection title="Opciones">
                                    <DropdownItem
                                        className='text-inherit'
                                        color='success'
                                        startContent={<IoIosPrint />}
                                        onPress={() => handlerDel(invoices.id, invoice)}
                                    >
                                        Imprimir
                                    </DropdownItem>
                                </DropdownSection>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                );
            default:
                return <p>{cellValue}</p>;
        }
    }, []);


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
                            onClick={() => navigate(`/Finances`)}
                        >
                            <GiCash sx={{ mr: 0.5 }} fontSize="inherit" />
                            Finanzas
                        </Link>
                        <Typography
                            sx={{ display: "flex", alignItems: "center" }}
                            className="text-foreground"
                        >
                            <GiCash sx={{ mr: 0.5 }} fontSize="inherit" />
                            Facturas
                        </Typography>
                    </Breadcrumbs>
                </div>
            </div> 
            {isLoading ? (
                <div> <Spinner label="Cargando" /></div>
            ) : (
            <div className="flex p-4 ml-20">
                <div className="flex w-full mr-20 p-4 flex-col items-center text-center justify-center full-w">
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
                    <TableBody items={invoices}
                        isLoading={isLoading}
                        emptyContent={
                            invoices.length === 0 ? (
                                "No Invoices found"
                            ) : (
                                <Spinner label="Cargando" />
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
            )}

        </div>
    );
};

export default Invoices;
