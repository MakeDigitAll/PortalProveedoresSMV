import { Card, Row, Text, Grid, Container, Link } from '@nextui-org/react'
import React from 'react'
import Header from '../../components/header/Header';
import ItemsCards from '../../components/header/headerC/ItemsCards'
import { useNavigate } from "react-router-dom";
import { MdHomeFilled, MdPeopleAlt, MdSettings, MdReceiptLong } from 'react-icons/md'
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
const SettingsDashboard = () => {
    const navigate = useNavigate();
    return (
        <Container justify='center'>
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
                    <MdSettings sx={{ mr: 0.5, }} fontSize="12px" />
                    <Text h5 style={{ marginLeft: '5px', marginTop: '13px', fontSize: '12px' }}> Configuración</Text>
                </Typography>
            </Breadcrumbs>
            <Grid.Container gap={1} >
                <Grid>
                    <Card variant="shadow" isPressable css={{ height: '70px', width: '80px', alignContent: 'center', alignItems: 'center' }} onClick={() => navigate('/Settings/Users')}>
                        <Card.Body css={{ p: 0, marginTop: '15px' }}>
                            <MdPeopleAlt size={"auto"} />
                        </Card.Body>
                        <Card.Footer css={{ alignContent: 'center', alignItems: 'center', textAlign: 'center', display: 'flex' }}>
                            <Row justify="center">
                                <Text size={"11px"} h6>Usuarios</Text>
                            </Row>
                        </Card.Footer>
                    </Card>
                </Grid>
                <Grid>
                    <Card variant="shadow" isPressable css={{ height: '70px', width: '80px', alignContent: 'center', alignItems: 'center' }} onClick={() => navigate('/Settings/Log')}>
                        <Card.Body css={{ p: 0, marginTop: '15px' }}>
                            <MdReceiptLong size={"auto"} />
                        </Card.Body>
                        <Card.Footer css={{ alignContent: 'center', alignItems: 'center', textAlign: 'center', display: 'flex' }}>
                            <Row justify="center">
                                <Text size={"11px"} h6>Bitacora</Text>
                            </Row>
                        </Card.Footer>
                    </Card>
                </Grid>
                </Grid.Container>
        </Container>
    )
}

export default SettingsDashboard