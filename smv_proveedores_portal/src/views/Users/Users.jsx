import React, { useEffect } from 'react'
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
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Link from "@mui/material/Link";
import { RiDashboard2Fill, RiPencilLine } from "react-icons/ri";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { IoMdEye } from "react-icons/io";
import { TbDotsVertical, TbPlus, TbReload } from "react-icons/tb";
import { MdArrowDropDown, MdSearch, MdShoppingCart, MdDelete, MdChecklist } from "react-icons/md";

import Header from "../../components/header/headerC/Header";
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import useAuth from '../../hooks/useAuth'

const Users = () => {
  
  const axios = useAxiosPrivate()
  const { auth } = useAuth()
  const pvId = auth.ID
  const [isLoading, setIsLoading] = React.useState(true);
  const [users, setUsers] = React.useState([]);
  const navigate = useNavigate()
  const [searchName, setSearchName] = React.useState("");
  const [searchPhone, setSearchPhone] = React.useState("");
  const [searchCity, setSearchCity] = React.useState("");
  
  const [DelItem, setDelItem] = React.useState(null);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  
  useEffect(() => {
    async function fetch() {
      try {
        const response = await axios.get(`/users/all/${pvId}`);
        const images = await Promise.all(
          response.data.map((user) => {
            return axios.get(`/users/image/${user.profileId}`, {
              responseType: "blob",
            });
          })
          );
          const users = response.data.map((users, index) => {
            const isNullBlob = images[index].data.size === 0;
            const image = isNullBlob ? null : URL.createObjectURL(images[index].data);
            return {
              ...users,
              image,
            }; 
          });
          setUsers(users);
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
        }
      }
      fetch();
  }, []);
  
  
  const columns = [
    {
      key: 'profileName',
      label: 'Nombre del usuario',
    },
    {
      key: 'address',
      label: 'Dirección',
    },
    {
      key: 'city',
      label: 'Ciudad',
    },
    {
      key: 'state',
      label: 'Estado',
    },
    {
      key: 'phone',
      label: 'Teléfono',
    },
    {
      key: 'Actions',
      label: 'Acciones',
    },
  ];


  const handleDelete = async (id) => {
    try {
      await axios.delete(`/users/decline/${id}/${pvId}`);
      window.location.reload();
      toast.success("usuario eliminado con éxito", {
        position: "bottom-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        autoClose: 10000,
        theme: "colored",
      });
    } catch (error) {
      console.log(error);
      toast.error("Error al eliminar el usuario", {
        position: "bottom-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        autoClose: 10000,
        theme: "colored",
      });
    }
  };

  const handlerDel = (id, userName) => {
    setDelItem({ id, userName });
    onOpen();
  };

  const handleDelClose = () => {
    onClose();
    setDelItem(null);
  };

  const handleDeleteItem = () => {
    handleDelete(DelItem.id);
    onClose();
    setDelItem(null);
  }

  const filterUsers = (users) => {
    if (searchName === "" && searchPhone === "" && searchCity === "") {
      return users;
    } else {
      return users.filter((user) => {
        return (
          user.profileName.toLowerCase().includes(searchName.toLowerCase()) &&
          user.phone.toLowerCase().includes(searchPhone.toLowerCase()) &&
          user.city.toLowerCase().includes(searchCity.toLowerCase())
        );
      });
    }
  };


  const renderCell = React.useCallback((users, columnKey) => {

    const cellValue = users[columnKey];

    switch (columnKey) {
      case 'profileName':
        return (
          <User
            avatarProps={{ radius: "lg", src: users.image }}
            description={users.email}
            name={users.profileName}
          >
            {users.country}
          </User>
        )
      case 'address':
        return (
          <div className="flex items-center">
            <p className='text-base'>{cellValue}</p>
          </div>
        );
      case 'city':
        return (
          <div className="flex items-center">
            <p className='text-base'>{cellValue}</p>
          </div>
        );
      case 'state':
        return (
          <div className="flex items-center">
            <p className='text-base'>{cellValue}</p>
          </div>
        );
      case 'phone':
        return (
          <div className="flex items-center">
            <p className='text-base'>{cellValue}</p>
          </div>
        );
      case 'Actions':
        return (
          <div className="flex items-center">
            <Dropdown placement="bottom-start" backdrop="blur">
              <DropdownTrigger
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  backgroundColor: "inherit",
                }}
              >
                <Button
                  startContent={<TbDotsVertical />}
                  size="sm"
                  variant="success"
                  color="inherit"
                  auto
                />
              </DropdownTrigger>
              <DropdownMenu
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  backgroundColor: "#292831",
                }}
              >
                <DropdownSection title="Acciones"
                >
                  <DropdownItem
                    startContent={<IoMdEye />}
                    onClick={() => {
                      navigate(`/users/View/${users.profileId}`)
                    }}
                  >
                    Ver
                  </DropdownItem>
                  <DropdownItem
                    startContent={<RiPencilLine />}
                    onClick={() => {
                      navigate(`/users/Edit/${users.profileId}`)
                    }}
                  >
                    Editar
                  </DropdownItem>
                  <DropdownItem
                    startContent={<MdChecklist />}
                    onClick={() => {
                      navigate(`/users/Permissions/${users.profileId}`)
                    }}
                  >
                    Permisos
                  </DropdownItem>

                </DropdownSection>
                <DropdownSection title="Eliminar">
                  <DropdownItem
                    className='text-danger'
                    color='danger'
                    startContent={<MdDelete />}
                    onPress={() => handlerDel(users.profileId, users.profileName)}
                  >
                    Eliminar
                  </DropdownItem>
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
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
            <Typography
              sx={{ display: "flex", alignItems: "center" }}
              className="text-foreground"
            >
              <MdShoppingCart sx={{ mr: 0.5 }} fontSize="inherit" />
              Listado de usuarios
            </Typography>
          </Breadcrumbs>
        </div>
      </div>
      <Modal
        size='xs'
        isOpen={isOpen}
        placement='auto'
        aria-labelledby="modal-delete"
        aria-describedby="modal-description"
        isDismissable={false}
        scrollBehavior="inside"
        onOpenChange={onOpenChange}
        backdrop='blur'
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader>Eliminar usuario</ModalHeader>
              <ModalBody>
                <p>¿Está seguro que desea eliminar al usuario <b>{DelItem?.userName}</b>?</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  auto
                  onClick={handleDeleteItem}
                  className="text-inherit text-danger bg-transparent hover:bg-danger hover:text-white"
                >
                  Eliminar
                </Button>
                <Button auto onClick={handleDelClose} className="text-inherit bg-transparent hover:bg-gray-400 hover:text-black">
                  Cancelar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <div className="flex justify-between items-center p-4 w-11/12 ml-20">
        <div className="flex items-center">
          <div className="flex items-center">
            <label className="text-base mr-10">Buscar por:</label>
            <Input
              startContent={<MdSearch />}
              className="mr-10"
              placeholder="Nombre del usuario"
              value={searchName}
              size="large"
              width="300px"
              onChange={(e) => setSearchName(e.target.value)}
            />
          </div>
          <div className="flex items-center">
            <Input
              startContent={<MdSearch />}
              className="mr-10"
              value={searchPhone}
              placeholder="Teléfono"
              size="large"
              width="300px"
              onChange={(e) => setSearchPhone(e.target.value)}
            />
          </div>
          <div className="flex items-center">
            <Input
              startContent={<MdSearch />}
              className="mr-10"
              value={searchCity}
              placeholder="Ciudad"
              size="large"
              width="300px"
              onChange={(e) => setSearchCity(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center">
          <Button
            auto
            startContent={<TbPlus />}
            className="mr-10 text-inherit bg-primary"
            size="small"
            variant="success"
            onClick={() => navigate(`/users/New`)}
          >
            Nuevo usuario
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center w-11/12 ml-20 mt-20">
          <Spinner label="Cargando" />
        </div>
      ) : (
        <div className="flex justify-between items-center w-11/12 ml-20 mt-20">
          <Table aria-label="Example table with dynamic content" color="foreground" 
          classNames={{
            wrapper: "w-full max-h-[500px]",
          }}>
            <TableHeader
              columns={columns}
            >
              {(column) => <TableColumn key={column.key} align={column.uid === "actions" ? "center" : "start"}>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody items={filterUsers(users)}
              emptyContent={
                users.length === 0 ? (
                  "No users found" 
                ) : (
                  <Spinner label="Cargando" />
                )
              }
            >
              {(item) => (
                <TableRow key={item.profileId}>
                  {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}

export default Users;