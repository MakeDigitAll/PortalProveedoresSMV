import '../../../App.css';
import React, { useState, useEffect } from 'react';
import Header from '../../../components/header/Header';
import ItemsCards from '../../../components/header/headerC/ItemsCards';
import { Container, Spacer } from '@nextui-org/react';
import { Table, Row, Col, Tooltip, Text, Link, Grid, Input} from "@nextui-org/react";
import { IconButton } from '../Usuarios/IconButton';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { MdHomeFilled, MdSettings, MdOutlineVisibility, MdReceiptLong } from 'react-icons/md';
import moment from 'moment';
import axiosInstance from '../../../components/axios/axios';
import { useNavigate } from "react-router-dom";

const ProvidersLog = () => {
  const navigate = useNavigate();
  const columns = [
    { name: "Usuario responsable", uid: "responsibleUser" },
    { name: "Operacion", uid: "action" },
    { name: "Fecha de modificacion", uid: "created_At" },
    { name: "ACTIONS", uid: "actions" },
  ];

  const [data, setData] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchAction, setSearchAction] = useState("");
  const [searchDate, setSearchDate] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await axiosInstance.get('/log');
      const formattedData = result.data.map(item => {
        const formattedCreatedAt = moment(item.created_At).format('YYYY-MM-DD HH:mm:ss');
        const formattedUpdatedAt = moment(item.updated_At).format('YYYY-MM-DD HH:mm:ss');
        const uppercaseAction = item.action.toUpperCase();
        
        return {
          ...item,
          created_At: formattedCreatedAt,
          updated_At: formattedUpdatedAt,
          action: uppercaseAction
        };
      });

      formattedData.sort((a, b) => {
        return moment(b.created_At).valueOf() - moment(a.created_At).valueOf();
      });
      
      setData(formattedData);
    };
  
    fetchData();
  }, []);

  const handleSearchName = (e) => {
    setSearchName(e.target.value);
  };

  const handleSearchAction = (e) => {
    setSearchAction(e.target.value);
  };

  const handleSearchDate = (e) => {
    setSearchDate(e.target.value);
  };

  const handleSearch = data.filter((data) => {
    return (
      data.responsibleUser.toLowerCase().includes(searchName.toLowerCase()) &&
      data.action.toLowerCase().includes(searchAction.toLowerCase()) &&
      data.created_At.toLowerCase().includes(searchDate.toLowerCase())
    );
  });

  const setColorActions = (action) => {
    if (action === 'INSERT') {
      return 'success';
    } else if (action === 'UPDATE') {
      return 'warning';
    } else if (action === 'DELETE') {
      return 'error';
    }
  };

  const renderCell = (item, columnKey) => {
    const cellValue = item[columnKey];
    switch (columnKey) {
      case "responsibleUser":
        return (
          <Text> {cellValue} </Text>
        );
      case "action":
         return <Text color={setColorActions(cellValue)}>{cellValue}</Text>;
      case "created_At":
        return <Text>{cellValue}</Text>;
      case "actions":
        return (
          <Row justify="center" align="center">
            <Col css={{ d: "flex" }}>
              <Tooltip content="Ver Detalles">
                <IconButton onClick={() => navigate(`/Settings/Log/Providers/${item.id}`)}>
                  <MdOutlineVisibility size={20} fill="#979797" />
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
          href="/Home"
        >
          <MdHomeFilled sx={{ fontSize: '10px' }} fontSize={"12px"} />
          <span style={{ marginLeft: '5px', marginTop: '3px', fontSize: '12px' }}> Inicio</span>
        </Link>
        <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit"
          onClick={() => navigate("/Settings")}
          href="/Settings"
        >
          <MdSettings sx={{ fontSize: '10px' }} fontSize={"12px"} />
          <span style={{ marginLeft: '5px', marginTop: '3px', fontSize: '12px' }}>Ajustes</span>
        </Link>
        <Typography
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit"
          href="/"
        >
          <MdReceiptLong sx={{ mr: 0.5, }} fontSize={"12px"} />
          <Text h5 style={{ marginLeft: '5px', marginTop: '13px', fontSize: '12px' }}> Bitacora de proveedores </Text>
        </Typography>
      </Breadcrumbs>
      <Grid.Container gap={2} justify="center">
        <Grid xs={3}>
          <Input
            onChange={handleSearchName}
            type='text'
            value={searchName}
            size="sm"
            width="520px"
            label="Nombre"
            color="default"
          />
        </Grid>
        <Grid xs={3}>
          <Input
            onChange={handleSearchAction}
            type='text'
            value={searchAction}
            size="sm"
            width="520px"
            label="Accion"
            color="default"
          />
        </Grid>
        <Grid xs={3}>
          <Input
            onChange={handleSearchDate}
            type='Date'
            value={searchDate}
            size="sm"
            width="520px"
            label="Fecha"
            color="default"
          />
        </Grid>
      </Grid.Container>
      <Spacer y={2} />
      <Table
        compact
        css={{
          height: "auto",
          minWidth: "100%",
        }}
        selectionMode="single"
      >
        <Table.Header>
          {columns.map((column) => (
            <Table.Column
              key={column.uid}
              hideHeader={column.uid === "actions"}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </Table.Column>
          ))}
        </Table.Header>
        <Table.Body items={handleSearch} maxHeight={400}>
          {(item) => (
            <Table.Row key={item.id}>
              {columns.map((column) => (
                <Table.Cell key={column.uid}>{renderCell(item, column.uid)}</Table.Cell>
              ))}
            </Table.Row>
          )}
        </Table.Body>
        <Table.Pagination
          align="center"
          rowsPerPage={10}
          onPageChange={(page) => console.log(page)}
          count={data?.length}
        />
      </Table>
    </Container>
  );
};

export default ProvidersLog;
