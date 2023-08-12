import React from 'react'
import Footer from '../../components/footer/Footer'
import { Text, Grid, Card, Link, Container, Button, Spacer } from "@nextui-org/react";
import Header from '../../components/header/Header';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { MdDashboard, MdHomeFilled } from 'react-icons/md';
import { useNavigate } from "react-router-dom";
import useAuth from '../../hooks/useAuth';


const Inicio = () => {
    const navigate = useNavigate();
    const { auth } = useAuth();

    return (
        <Container>
            <Header />
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
                    <Text h5 style={{ marginLeft: '5px', marginTop: '13px', fontSize: '12px' }}> Dashhboard</Text>
                </Typography>
            </Breadcrumbs>
            <Grid.Container gap={2} justify="center">
                <Grid xs={4}>
                    <Card css={{ p: "$6", mw: "auto", marginLeft: '100px', mh: "auto" }}>
                        <Card.Header>
                            <Grid.Container css={{ pl: "$6" }}>
                                <Grid xs={12}>
                                    <Text h4 css={{ lineHeight: "$xs" }}>
                                        Pedidos
                                    </Text>
                                </Grid>
                            </Grid.Container>
                        </Card.Header>
                        <Card.Body css={{ py: "$2" }}>
                            <Link color="primary">
                                <Button
                                    auto
                                    size="sm"
                                    color="primary"
                                    variant="contained"
                                    onClick={() => navigate("/orders")}
                                    style={{ width: '100%' }}
                                >
                                    Mis Pedidos
                                </Button>
                            </Link>
                            <Spacer y={1} />
                            <Link color="primary">
                                <Button
                                    auto
                                    size="sm"
                                    color="primary"
                                    variant="contained"
                                    onClick={() => navigate("/distributors/Permissions/9")}
                                    style={{ width: '100%' }}
                                >
                                    Permisos
                                </Button>
                            </Link>
                            <Spacer y={1} />
                            <Link color="primary">
                                <Button
                                    auto
                                    size="sm"
                                    color="primary"
                                    variant="contained"
                                    onClick={() => navigate("/returns")}
                                    style={{ width: '100%' }}
                                >
                                    Devoluciones
                                </Button>
                            </Link>
                            <Spacer y={1} />
                            <Link color="primary">
                                <Button
                                    auto
                                    size="sm"
                                    color="gradient"
                                    variant="contained"
                                    onClick={() => navigate("/Pedidos")}
                                    style={{ width: '100%' }}
                                >
                                    Visor de Notas de entrada
                                </Button>
                            </Link>
                            <Spacer y={1} />
                        </Card.Body>
                        <Card.Footer />
                    </Card>
                </Grid>
                <Grid xs={4}>
                    <Card css={{ p: "$6", mw: "auto", marginLeft: '100px', mh: "auto" }}>
                        <Card.Header>
                            <Grid.Container css={{ pl: "$6" }}>
                                <Grid xs={12}>
                                    <Text h4 css={{ lineHeight: "$xs" }}>
                                        Factución
                                    </Text>
                                </Grid>
                            </Grid.Container>
                        </Card.Header>
                        <Card.Body css={{ py: "$2" }}>
                            <Link color="primary">
                                <Button
                                    auto
                                    size="sm"
                                    color="primary"
                                    variant="contained"
                                    onClick={() => navigate("/sendbills")}
                                    style={{ width: '100%' }}
                                >
                                    Enviar Factura
                                </Button>
                            </Link>
                            <Spacer y={1} />
                            <Link color="primary">
                                <Button
                                    auto
                                    size="sm"
                                    color="error"
                                    variant="contained"
                                    onClick={() => navigate("/incidentsdashboard")}
                                    style={{ width: '100%' }}
                                >
                                    Incidencias
                                </Button>
                            </Link>
                        </Card.Body>
                        <Card.Footer />
                    </Card>
                </Grid>
                <Grid xs={4}>
                    <Card css={{ p: "$6", mw: "auto", marginLeft: '100px', mh: "auto" }}>
                        <Card.Header>
                            <Grid.Container css={{ pl: "$6" }}>
                                <Grid xs={12}>
                                    <Text h4 css={{ lineHeight: "$xs" }}>
                                        Catalogo de productos
                                    </Text>
                                </Grid>
                            </Grid.Container>
                        </Card.Header>
                        <Card.Body css={{ py: "$2" }}>
                            <Link color="primary">
                                <Button
                                    auto
                                    size="sm"
                                    color="primary"
                                    variant="contained"
                                    onClick={() => navigate("/productSheet")}
                                    style={{ width: '100%' }}
                                >
                                    Folios de producto
                                </Button>
                            </Link>
                            <Spacer y={1} />
                            <Link color="primary">
                                <Button
                                    auto
                                    size="sm"
                                    color="success"
                                    variant="contained"
                                    onClick={() => navigate("/myproducts")}
                                    style={{ width: '100%' }}
                                >
                                    Mis productos
                                </Button>
                            </Link>
                            <Spacer y={1} />
                        </Card.Body>
                        <Card.Footer />
                    </Card>
                </Grid>
                <Grid xs={4}>
                    <Card css={{ p: "$6", mw: "auto", marginLeft: '100px', mh: "auto" }}>
                        <Card.Header>
                            <Grid.Container css={{ pl: "$6" }}>
                                <Grid xs={12}>
                                    <Text h4 css={{ lineHeight: "$xs" }}>
                                        Finanzas
                                    </Text>
                                </Grid>
                            </Grid.Container>
                        </Card.Header>
                        <Card.Body css={{ py: "$2" }}>
                            <Link color="primary">
                                <Button
                                    auto
                                    size="sm"
                                    color="primary"
                                    variant="contained"
                                    onClick={() => navigate("/paymentplan")}
                                    style={{ width: '100%' }}
                                >
                                    Plan de pago
                                </Button>
                            </Link>
                            <Spacer y={1} />
                            <Link color="primary">
                                <Button
                                    auto
                                    size="sm"
                                    color="primary"
                                    variant="contained"
                                    onClick={() => navigate("/statementOfaccount")}
                                    style={{ width: '100%' }}
                                >
                                    Estado de cuenta
                                </Button>
                            </Link>
                            <Spacer y={1} />
                            <Link color="primary">
                                <Button
                                    auto
                                    size="sm"
                                    color="gradient"
                                    variant="contained"
                                    onClick={() => navigate("/termsAndconditions")}
                                    style={{ width: '100%' }}
                                >
                                    Terminos y condiciones
                                </Button>
                            </Link>
                            <Spacer y={1} />
                        </Card.Body>
                        <Card.Footer />
                    </Card>
                </Grid>
                <Grid xs={4}>
                    <Card css={{ p: "$6", mw: "auto", marginLeft: '100px', mh: "auto" }}>
                        <Card.Header>
                            <Grid.Container css={{ pl: "$6" }}>
                                <Grid xs={12}>
                                    <Text h4 css={{ lineHeight: "$xs" }}>
                                        Distribuidores
                                    </Text>
                                </Grid>
                            </Grid.Container>
                        </Card.Header>
                        <Card.Body css={{ py: "$2" }}>
                            <Link color="primary">
                                <Button
                                    auto
                                    size="sm"
                                    color="secondary"
                                    variant="contained"
                                    onClick={() => navigate("/Distributors")}
                                    style={{ width: '100%' }}
                                >
                                    Distribuidores
                                </Button>
                            </Link>
                        </Card.Body>
                        <Card.Footer />
                    </Card>
                </Grid>
            </Grid.Container>
            <Footer />
        </Container>
    );
};

export default Inicio;