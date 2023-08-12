import { Container, Checkbox, Col, Row, Spacer, Image, Input, Button } from '@nextui-org/react'
import React from 'react'
import Header from '../../../components/header/Header';
import Footer from '../../../components/footer/Footer'
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Text, Link } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { MdHomeFilled, MdPeople, MdPerson, MdSave, MdSettings } from 'react-icons/md';
const Usuario = () => {
    const navigate = useNavigate();
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
                <Link
                    underline="hover"
                    sx={{ display: 'flex', alignItems: 'center' }}
                    color="inherit"
                    onClick={() => navigate("/Settings")}
                >
                    <MdSettings sx={{ fontSize: '10px' }} fontSize="12px" />
                    <span style={{ marginLeft: '5px', marginTop: '3px', fontSize: '12px' }}> Ajustes</span>
                </Link>
                <Link
                    underline="hover"
                    sx={{ display: 'flex', alignItems: 'center' }}
                    color="inherit"
                    onClick={() => navigate("/Settings/Users")}
                >
                    <MdPeople sx={{ mr: 0.5, }} fontSize="12px" />
                    <Text h5 style={{ marginLeft: '5px', marginTop: '13px', fontSize: '12px' }}> Usuarios</Text>
                </Link>
                <Typography
                    underline="hover"
                    sx={{ display: 'flex', alignItems: 'center' }}
                    color="inherit"
                    href="/"
                >
                    <MdPerson sx={{ mr: 0.5, }} fontSize="12px" />
                    <Text h5 style={{ marginLeft: '5px', marginTop: '13px', fontSize: '12px' }}> Crear usuario</Text>
                </Typography>
            </Breadcrumbs>

            <Row gap={1}>
                <Col>
                    <Image
                        showSkeleton
                        width={440}
                        height={440}
                        maxDelay={500}
                        src="https://app.requestly.io/delay/10000/https://github.com/nextui-org/nextui/blob/next/apps/docs/public/nextui-banner.jpeg?raw=true"
                        alt="Default Image"
                    />
                </Col>
                <Col>
                    <Spacer y={3} />
                    <Container gap={0}>
                        <Row gap={1}>
                            <Col>
                                <Input label="Nombre(s)" size='sm' width='360px' />
                            </Col>
                            <Col>
                                <Input label="Apellido(s)" size='sm' width='360px' />
                            </Col>
                        </Row>
                        <Spacer y={1} />
                        <Row gap={1}>
                            <Col>
                                <Input label="Correo electronico" size='sm' width='360px' />
                            </Col>
                        </Row>
                        <Spacer y={1} />
                        <Row gap={1}>
                            <Col>
                                <Input label="Contraseña" size='sm' width='360px' />
                            </Col>
                            <Col>
                                <Input label="Verificar contraseña" size='sm' width='360px' />
                            </Col>
                        </Row>
                        <Spacer y={1} />
                        <Row gap={1}>
                            <Col>
                                <Input label="Perfil de seguridad" size='sm' width='360px' />
                            </Col>
                            <Col>
                                <Input label="Vendedor" size='sm' width='360px' />
                            </Col>
                        </Row>
                        <Spacer y={1} />
                    </Container>
                </Col>
            </Row>
            <Row gap={1}>
                <Col>
                    <Checkbox.Group
                        color="secondary"
                        defaultValue={["buenos-aires"]}
                        label="Acceso a sucursales"
                        size='sm'
                    >
                        <Checkbox value="buenos-aires">Principal</Checkbox>
                    </Checkbox.Group>
                </Col>
                <Col>
                    <Row gap={1}>
                        <Col>
                            <Text h4>Datos adicionales</Text>
                        </Col>
                    </Row>
                    <Container gap={0}>
                        <Row gap={1}>
                            <Col>
                                <Input label="Dirección" size='sm' width='360px' />
                            </Col>
                            <Col>
                                <Input label="Colonia" size='sm' width='360px' />
                            </Col>
                        </Row>
                        <Spacer y={1} />
                        <Row gap={1}>
                            <Col>
                                <Input label="Ciudad" size='sm' width='260px' />
                            </Col>
                            <Col>
                                <Input label="Estado" size='sm' width='260px' />
                            </Col>
                            <Col>
                                <Input label="CP" size='sm' width='200px' />
                            </Col>
                        </Row>
                        <Spacer y={1} />
                        <Row gap={1}>
                            <Col>
                                <Input label="Telefono de contacto" size='sm' width='326px' />
                            </Col>
                            <Col>
                                <Input label="Telefono celular" size='sm' width='360px' />
                            </Col>
                        </Row>
                        <Spacer y={1}/>
                        <Row gap={1}>
                            <Col>

                            </Col>
                            <Col>
                                <Button auto size={'sm'} iconRight={<MdSave fill="currentColor" />}>
                                    Guardar
                                </Button>
                            </Col>
                        </Row>

                    </Container>
                </Col>
            </Row>

            <Footer />
        </Container>
    )
}

export default Usuario;