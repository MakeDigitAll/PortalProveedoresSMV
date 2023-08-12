import React, { useState, useEffect } from 'react';
import Footer from '../../components/footer/Footer'
import { Text, Grid, Card, Link, Container, Button } from "@nextui-org/react";
import ItemsCards from '../../components/header/headerC/ItemsCards';
import Header from '../../components/header/Header';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { MdDashboard, MdHomeFilled } from 'react-icons/md';
import { useNavigate, useParams } from "react-router-dom";
import  AxiosInstance  from '../../components/axios/axios';

const VerifyAccount = (props) => {
    const navigate = useNavigate();
    const [validUrl, setValidUrl] = useState(false);
    const params = useParams();
 
    useEffect(() => {
        const verifyAccount = async () => {
            try {
                const response = await AxiosInstance.post(`/users/${params.id}/verify/${params.token}`);
                if (response.status === 200) {
                    setValidUrl(true);
                    navigate("/");
                    alert("Su cuenta ha sido verificada exitosamente");
                }
                if (response.status === 400) {
                    setValidUrl(false);
                    navigate("/LinkExpired");
                }
            } catch (error) {
                console.log(error);
            } 
        }
        verifyAccount();
    }, [params])



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
                >
                    <MdHomeFilled sx={{ fontSize: '10px' }} fontSize="12px" />
                    <span style={{ marginLeft: '5px', marginTop: '3px', fontSize: '12px' }}> Inicio</span>
                </Link>
                <Typography
                    underline="hover"
                    sx={{ display: 'flex', alignItems: 'center' }}
                    color="inherit"
                    href="/"
                >
                    <MdDashboard sx={{ mr: 0.5, }} fontSize="12px" />
                    <Text h5 style={{ marginLeft: '5px', marginTop: '13px', fontSize: '12px' }}> Verificación </Text>
                </Typography>
            </Breadcrumbs>
            {validUrl ? <h1>Verificando cuenta...</h1> : <h1>Link expirado</h1>}
            <Grid.Container gap={2} justify="center">
                <Grid xs={4}>
                    <Card css={{ p: "$6", mw: "auto", marginLeft: '100px', mh: "auto" }}>
                        <Card.Header>
                            <Grid.Container css={{ pl: "$6" }}>
                                <Grid xs={12}>
                                    <Text h4>Verificación de cuenta</Text>
                                    <Button onClick={navigate("/")}>Volver a inicio</Button>
                                </Grid>
                            </Grid.Container>
                        </Card.Header>
                    </Card>
                </Grid>

            </Grid.Container>
            <Footer />
        </Container>
    )
}

export default VerifyAccount