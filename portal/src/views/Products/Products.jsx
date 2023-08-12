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
        { name: 'Nombre', uid: 'productName' },
        { name: 'Codigo de fabricante', uid: 'manofacturerCode' },
        { name: 'Codigo de la empresa', uid: 'companyCode' },
        { name: 'Precio al Detal', uid: 'retailPrice' },
        { name: 'Unidad de medida', uid: 'unitMeasurement' }
    ];

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchName, setSearchName] = useState('');
    const [searchCompanyCode, setSearchCompanyCode] = useState('');
    const [searchManofacturerCode, setSearchManofacturerCode] = useState('');

    const [isDel, setIsDel] = useState(false);
    const [openDelModal, setOpenDelModal] = useState(false);

return (
    <div>
        <text>hola</text>
    </div>
)
}

export default Distributors;





