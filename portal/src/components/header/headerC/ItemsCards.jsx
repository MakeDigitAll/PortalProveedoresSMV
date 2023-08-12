import { Card, Container, Grid, Row, Text } from "@nextui-org/react";
import React from 'react'
import { MdAdminPanelSettings, MdHome, MdPeople, MdPersonPinCircle, MdPriceCheck, MdProductionQuantityLimits, MdSell, MdSettings, MdWeb } from "react-icons/md";
import { RiBox1Fill, RiSpeakFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
const ItemsCards = () => {
    const navigate = useNavigate();
    return (
        <Container>
        <Grid.Container gap={1} justify="center">
            <Grid>
                <Card variant="shadow" isPressable css={{ height: '70px', width: '80px', alignContent: 'center', alignItems: 'center' }} onClick={() => navigate('/home')}>
                    <Card.Body css={{ p: 0, marginTop: '15px' }}>
                        <MdHome size={"auto"} />
                    </Card.Body>
                    <Card.Footer>
                        <Row justify="center">
                            <Text size={"11px"} h6>Home</Text>
                        </Row>
                    </Card.Footer>
                </Card>
            </Grid>
            <Grid>
                <Card variant="shadow" isPressable css={{ height: '70px', width: '80px', alignContent: 'center', alignItems: 'center' }}>
                    <Card.Body css={{ p: 0, marginTop: '15px' }}>
                        <MdSell size={"auto"} />
                    </Card.Body>
                    <Card.Footer css={{ alignContent: 'center', alignItems: 'center', textAlign: 'center', display: 'flex' }}>
                        <Row justify="center">
                            <Text size={"11px"} h6>Ventas</Text>
                        </Row>
                    </Card.Footer>
                </Card>
            </Grid>
            <Grid>
                <Card variant="shadow" isPressable css={{ height: '70px', width: '80px', alignContent: 'center', alignItems: 'center' }}>
                    <Card.Body css={{ p: 0, marginTop: '15px' }}>
                        <MdPriceCheck size={"auto"} />
                    </Card.Body>
                    <Card.Footer css={{ alignContent: 'center', alignItems: 'center', textAlign: 'center', display: 'flex' }}>
                        <Row justify="center">
                            <Text size={"11px"} h6>Facturación</Text>
                        </Row>
                    </Card.Footer>
                </Card>
            </Grid>
            <Grid>
                <Card variant="shadow" isPressable css={{ height: '70px', width: '80px', alignContent: 'center', alignItems: 'center' }}>
                    <Card.Body css={{ p: 0, alignContent: 'center', alignItems: 'center', marginTop: '20px' }} >
                        <MdAdminPanelSettings size={"auto"} />
                    </Card.Body>
                    <Card.Footer css={{ alignContent: 'center', alignItems: 'center', textAlign: 'center', display: 'flex' }}>
                        <Row justify="center">
                            <Text size={"11px"} h6>Administración</Text>
                        </Row>
                    </Card.Footer>
                </Card>
            </Grid>
            <Grid>
                <Card variant="shadow" isPressable css={{ height: '70px', width: '80px', alignContent: 'center', alignItems: 'center' }}>
                    <Card.Body css={{ p: 0, marginTop: '15px' }}>
                        <MdPeople size={"auto"} />
                    </Card.Body>
                    <Card.Footer css={{ alignContent: 'center', alignItems: 'center', textAlign: 'center', display: 'flex' }}>
                        <Row justify="center">
                            <Text size={"11px"} h6>Clientes</Text>
                        </Row>
                    </Card.Footer>
                </Card>
            </Grid>
            <Grid>
                <Card variant="shadow" isPressable css={{ height: '70px', width: '80px', alignContent: 'center', alignItems: 'center' }}>
                    <Card.Body css={{ p: 0, marginTop: '15px' }}>
                        <MdPersonPinCircle size={"auto"} />
                    </Card.Body>
                    <Card.Footer css={{ alignContent: 'center', alignItems: 'center', textAlign: 'center', display: 'flex' }}>
                        <Row justify="center">
                            <Text size={"11px"} h6>Vendedores</Text>
                        </Row>
                    </Card.Footer>
                </Card>
            </Grid>
            <Grid>
                <Card variant="shadow" isPressable css={{ height: '70px', width: '80px', alignContent: 'center', alignItems: 'center' }} onPress={() => navigate('/Productos')}>
                    <Card.Body css={{ p: 0, marginTop: '15px' }}>
                        <MdProductionQuantityLimits size={"auto"} />
                    </Card.Body>
                    <Card.Footer css={{ alignContent: 'center', alignItems: 'center', textAlign: 'center', display: 'flex' }}>
                        <Row justify="center">
                            <Text size={"11px"} h6>Productos</Text>
                        </Row>
                    </Card.Footer>
                </Card>
            </Grid>
            <Grid>
                <Card variant="shadow" isPressable css={{ height: '70px', width: '80px', alignContent: 'center', alignItems: 'center' }} onClick={() => navigate('/Almacen')}>
                    <Card.Body css={{ p: 0, marginTop: '15px' }}>
                        <RiBox1Fill size={"auto"} />
                    </Card.Body>
                    <Card.Footer css={{ alignContent: 'center', alignItems: 'center', textAlign: 'center', display: 'flex' }}>
                        <Row justify="center">
                            <Text size={"11px"} h6>Almacén</Text>
                        </Row>
                    </Card.Footer>
                </Card>
            </Grid>
            <Grid>
                <Card variant="shadow" isPressable css={{ height: '70px', width: '80px', alignContent: 'center', alignItems: 'center' }}>
                    <Card.Body css={{ p: 0, marginTop: '15px' }}>
                        <RiSpeakFill size={"auto"} />
                    </Card.Body>
                    <Card.Footer css={{ alignContent: 'center', alignItems: 'center', textAlign: 'center', display: 'flex' }}>
                        <Row justify="center">
                            <Text size={"11px"} h6>Mercadotecnia</Text>
                        </Row>
                    </Card.Footer>
                </Card>
            </Grid>
            <Grid>
                <Card variant="shadow" isPressable css={{ height: '70px', width: '80px', alignContent: 'center', alignItems: 'center' }}>
                    <Card.Body css={{ p: 0, marginTop: '15px' }}>
                        <MdPersonPinCircle size={"auto"} />
                    </Card.Body>
                    <Card.Footer css={{ alignContent: 'center', alignItems: 'center', textAlign: 'center', display: 'flex' }}>
                        <Row justify="center">
                            <Text size={"11px"} h6>Punto de Venta</Text>
                        </Row>
                    </Card.Footer>
                </Card>
            </Grid>
            <Grid>
                <Card variant="shadow" isPressable css={{ height: '70px', width: '80px', alignContent: 'center', alignItems: 'center' }}>
                    <Card.Body css={{ p: 0, marginTop: '15px' }}>
                        <MdWeb size={"auto"} />
                    </Card.Body>
                    <Card.Footer css={{ alignContent: 'center', alignItems: 'center', textAlign: 'center', display: 'flex' }}>
                        <Row justify="center">
                            <Text size={"11px"} h6>Web</Text>
                        </Row>
                    </Card.Footer>
                </Card>
            </Grid>
            <Grid>
                <Card variant="shadow" isPressable css={{ height: '70px', width: '80px', alignContent: 'center', alignItems: 'center' }} onClick={() => navigate('/settings')}>
                    <Card.Body css={{ p: 0, marginTop: '15px' }}>
                        <MdSettings size={"auto"} />
                    </Card.Body>
                    <Card.Footer css={{ alignContent: 'center', alignItems: 'center', textAlign: 'center', display: 'flex' }}>
                        <Row justify="center">
                            <Text size={"11px"} h6>Ajustes</Text>
                        </Row>
                    </Card.Footer>
                </Card>
            </Grid>
        </Grid.Container>
        </Container>
    );
}
export default ItemsCards;