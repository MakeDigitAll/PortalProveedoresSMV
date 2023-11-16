import React, { useState, useEffect } from 'react';
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
    Spinner,
    Input, Button, User
} from "@nextui-org/react";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownSection,
    DropdownItem
} from "@nextui-org/react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { GiCash } from "react-icons/gi";
import { RiDashboard2Fill } from "react-icons/ri";
import { MdChecklist } from "react-icons/md";
import Header from "../../components/header/headerC/Header";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import useAuth from '../../hooks/useAuth'

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
            <div className="flex p-4 ml-20">
                <div className="flex w-full mr-20 p-4 flex-col items-center text-center justify-center full-w">
                    </div>

            </div>
        </div>
    );
};

export default Invoices;
