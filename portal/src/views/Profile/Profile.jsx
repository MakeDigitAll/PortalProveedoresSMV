import React, { useState, useEffect } from 'react';
import { Container, Col, Row, Spacer, Image, Input, Button, Grid, Dropdown } from '@nextui-org/react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer'
import { useNavigate, useParams } from 'react-router-dom';
import { IconButton } from "../../components/Home/IconButton";
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { MdHomeFilled, MdSettings, MdSave, MdPerson } from 'react-icons/md';
import useAuth from '../../hooks/useAuth';
import '../../App.css';

const Profile = () => {

    return (
        <>
            <Header />
            <Container>
                <Row justify="center">
                    <Col>
                        <Spacer y={2} />
                        <Breadcrumbs aria-label="breadcrumb">
                            <IconButton href="/" aria-label="home">
                                <MdHomeFilled />
                            </IconButton>
                            <Typography color="textPrimary">Perfil</Typography>
                        </Breadcrumbs>
                        <Spacer y={2} />
                    </Col>
                </Row>
                <Row justify="center">
                    <Col>
                        <Typography variant="h4" align="center">Perfil</Typography>
                        <Spacer y={2} />
                    </Col>
                </Row>
                <Row justify="center">
                    <Col>
                        <Typography variant="h6" align="center">Datos personales</Typography>
                        <Spacer y={2} />
                    </Col>
                </Row>
                <Row justify="center">
                    <Col>
                        <Typography variant="h6" align="center">Datos de la empresa</Typography>
                        <Spacer y={2} />
                    </Col>
                </Row>
                <Row justify="center">
                    <Col>
                        <Typography variant="h6" align="center">Datos de contacto</Typography>
                        <Spacer y={2} />
                    </Col>
                </Row>
        </Container>
        <Footer />
        </>
    )
}

export default Profile