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
import FacturaComponent from '../../components/Invoices/InvoiceComponent';
import { IoMdEye } from "react-icons/io";
import { RiDashboard2Fill, RiPencilLine } from "react-icons/ri";
import { Input, Link, Button, Textarea, User, Spinner, Radio, RadioGroup } from "@nextui-org/react";
import { MdShoppingCart } from "react-icons/md";
import { TbDotsVertical, TbPlus, TbReload, TbTrash } from "react-icons/tb";
import { MdFilterListAlt, MdDelete, MdSearch } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import { ReactToPrint } from 'react-to-print';
import useAuth from '../../hooks/useAuth';
import '../../App.css';

import useAxiosPrivate from '../../hooks/useAxiosPrivate';


const Invoices = () => {
    const { auth } = useAuth();
    const axios = useAxiosPrivate();
    const [invoices, setInvoices] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInvoices = async () => {
            const invoicesData = await getInvoices();
            setInvoices(invoicesData);
        };
        fetchInvoices();
    }, []);

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
                                </DropdownSection>
                                <DropdownSection title="Eliminar">
                                    <DropdownItem
                                        className='text-danger'
                                        color='danger'
                                        startContent={<MdDelete />}
                                        onPress={() => handlerDel(order.id, order.folio)}
                                    >
                                        Imprimir
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
            <FacturaComponent factureData={invoices} />
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
                    <TableBody items={Invoices}
                        isLoading={isLoading}
                        emptyContent={
                            order.length === 0 ? (
                                "No orders found"
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
        </div>
    );
};

export default Invoices;
