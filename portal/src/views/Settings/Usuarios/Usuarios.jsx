import React from 'react'
import Header from '../../../components/header/Header';
import ItemsCards from '../../../components/header/headerC/ItemsCards'
import { Button, Container, Spacer } from '@nextui-org/react'
import { Table, Row, Col, Tooltip, User, Text, Link, Grid, Input } from "@nextui-org/react";
import { IconButton } from "./IconButton";
import { StyledBadge } from "./StyledBadge";
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { MdAddCircleOutline, MdDelete, MdEdit, MdHomeFilled, MdPeople, MdSettings } from 'react-icons/md';
import { useNavigate } from "react-router-dom";
const Usuarios = () => {
    const navigate = useNavigate();
    const columns = [
        { name: "Nombre", uid: "name" },
        { name: "Correo electronico", uid: "role" },
        { name: "Grupo", uid: "status" },
        { name: "Sucursales", uid: "status" },
        { name: "ACTIONS", uid: "actions" },
    ];
    const users = [
        {
            id: 1,
            name: "Tony Reichert",
            role: "CEO",
            team: "Management",
            status: "active",
            age: "29",
            avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
            email: "tony.reichert@example.com",
        },
        {
            id: 2,
            name: "Zoey Lang",
            role: "Technical Lead",
            team: "Development",
            status: "paused",
            age: "25",
            avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
            email: "zoey.lang@example.com",
        },
        {
            id: 3,
            name: "Jane Fisher",
            role: "Senior Developer",
            team: "Development",
            status: "active",
            age: "22",
            avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
            email: "jane.fisher@example.com",
        },
        {
            id: 4,
            name: "William Howard",
            role: "Community Manager",
            team: "Marketing",
            status: "vacation",
            age: "28",
            avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
            email: "william.howard@example.com",
        },
        {
            id: 5,
            name: "Kristen Copper",
            role: "Sales Manager",
            team: "Sales",
            status: "active",
            age: "24",
            avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
            email: "kristen.cooper@example.com",
        },
    ];
    const renderCell = (user, columnKey) => {
        const cellValue = user[columnKey];
        switch (columnKey) {
            case "name":
                return (
                    <User squared src={user.avatar} name={cellValue} css={{ p: 0 }}>
                        {user.email}
                    </User>
                );
            case "role":
                return (
                    <Col>
                        <Row>
                            <Text b size={14} css={{ tt: "capitalize" }}>
                                {cellValue}
                            </Text>
                        </Row>
                        <Row>
                            <Text b size={13} css={{ tt: "capitalize", color: "$accents7" }}>
                                {user.team}
                            </Text>
                        </Row>
                    </Col>
                );
            case "status":
                return <StyledBadge type={user.status}>{cellValue}</StyledBadge>;

            case "actions":
                return (
                    <Row justify="center" align="center">
                        <Col css={{ d: "flex" }}>
                            <Tooltip content="Edit user">
                                <IconButton onClick={() => console.log("Edit user", user.id)}>
                                    <MdEdit size={20} fill="#979797" />
                                </IconButton>
                            </Tooltip>
                        </Col>
                        <Col css={{ d: "flex" }}>
                            <Tooltip
                                content="Delete user"
                                color="error"
                                onClick={() => console.log("Delete user", user.id)}
                            >
                                <IconButton>
                                    <MdDelete size={20} fill="#FF0080" />
                                </IconButton>
                            </Tooltip>
                        </Col>
                    </Row>
                );
            default:
                return cellValue;
        }
    };
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
                <Link
                    underline="hover"
                    sx={{ display: 'flex', alignItems: 'center' }}
                    color="inherit"
                    onClick={() => navigate("/Settings")}
                >
                    <MdSettings sx={{ fontSize: '10px' }} fontSize="12px" />
                    <span style={{ marginLeft: '5px', marginTop: '3px', fontSize: '12px' }}> Ajustes</span>
                </Link>
                <Typography
                    underline="hover"
                    sx={{ display: 'flex', alignItems: 'center' }}
                    color="inherit"
                    href="/"
                >
                    <MdPeople sx={{ mr: 0.5, }} fontSize="12px" />
                    <Text h5 style={{ marginLeft: '5px', marginTop: '13px', fontSize: '12px' }}> Usuarios</Text>
                </Typography>
            </Breadcrumbs>
            <Grid.Container gap={2} justify="center">
                <Grid xs={5}>
                    <Input
                        size='sm'
                        width='520px'
                        label="Nombre / Correo"
                        color="default" />
                </Grid>
                <Grid xs={5}>
                <Input
                        size='sm'
                        width='520px'
                        label="Grupo"
                        color="default" />
                </Grid>
                <Grid xs={2}>
                    <Button
                    css={{marginTop:'20px'}}
                        size={'sm'}
                        auto
                        icon={<MdAddCircleOutline fill="currentColor" filled />}
                        color={"success"}
                        onClick={() => navigate("/Settings/AddUser")}
                    >Agregar usuario</Button>
                </Grid>
            </Grid.Container>
            <Spacer y={2}/>
            <Table
                compact
                css={{
                    height: "auto",
                    minWidth: "100%",
                }}
                selectionMode="single"
            >
                <Table.Header columns={columns}>
                    {(column) => (
                        <Table.Column
                            key={column.uid}
                            hideHeader={column.uid === "actions"}
                            align={column.uid === "actions" ? "center" : "start"}
                        >
                            {column.name}
                        </Table.Column>
                    )}
                </Table.Header>
                <Table.Body items={users}>
                    {(item) => (
                        <Table.Row>
                            {(columnKey) => (
                                <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
                            )}
                        </Table.Row>
                    )}
                </Table.Body>
                <Table.Pagination
                    align="center"
                    rowsPerPage={10}
                    onPageChange={(page) => console.log({ page })}
                />
            </Table>
        </Container>
    )
}

export default Usuarios;