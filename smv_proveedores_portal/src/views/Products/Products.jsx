import React from 'react'
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell, 
  Spinner,
  Pagination,
  Input, Button, User,
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
import { TbDotsVertical, TbPlus, TbReload } from "react-icons/tb";
import { MdSearch, MdShoppingCart, MdDelete, MdChecklist } from "react-icons/md";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { IoMdEye } from "react-icons/io";
import { RiDashboard2Fill, RiPencilLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import Header from "../../components/header/headerC/Header";
import { useEffect } from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import useAuth from '../../hooks/useAuth'



const Products = () => {
  const axios = useAxiosPrivate()
  const { auth } = useAuth()
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);

  const [products, setProducts] = React.useState([])
  const [searchName, setSearchName] = React.useState("");
  const [searchCompanyCode, setSearchCompanyCode] = React.useState("");
  const [searchManofacturerCode, setSearchManofacturerCode] = React.useState("");

  const [DelItem, setDelItem] = React.useState(null);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const { isOpen: isOpenAvailability, onOpen: onOpenAvailability, onOpenChange: onOpenChangeAvailability, onClose: onCloseAvailability } = useDisclosure();
  //productStock, productMin, productMax, availabilityCat
  const [availability, setAvailability] = React.useState(null);


  const loadProducts = async () => {
    try {
      const response = await axios.get(`/products/all/${auth.ID}`);
      const images = await Promise.all(
        response.data.map((product) => {
          return axios.get(`/products/image/${product.id}`, { 
            responseType: 'blob'
          })
        })
      )
      const products = response.data.map((product, index) => {
        const isNullBlob = images[index].data.size === 0;
        const image = isNullBlob ? null : URL.createObjectURL(images[index].data);
        return {
          ...product,
          image
        } 
      })
      setProducts(products);
      console.log(products);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const columns = [
    {
      key: "productName",
      label: "Nombre del producto",
    },
    {
      key: "manofacturerCode",
      label: "Codigo del fabricante",
    },
    {
      key: "companyCode",
      label: "Codigo de la empresa",
    },
    {
      key: "retailPrice",
      label: "Precio de venta",
    },
    {
      key: "unitMeasurement",
      label: "Unidad de medida",
    },
    {
      key: "Actions",
      label: "Acciones",
    },
  ];


  //------------------------------------------------------------------------------------------
  //----------------------------Funcion para filtrar productos -------------------------------
  //------------------------------------------------------------------------------------------


  //Funcion para filtrar productos
  const filterProducts = (products) => {
    if (searchName === "" && searchCompanyCode === "" && searchManofacturerCode === "") {
      return products;
    } else {
      return products.filter((product) => {
        return (
          product.productName.toLowerCase().includes(searchName.toLowerCase()) &&
          product.companyCode.toLowerCase().includes(searchCompanyCode.toLowerCase()) &&
          product.manofacturerCode.toLowerCase().includes(searchManofacturerCode.toLowerCase())
        );
      });
    }
  };


  //------------------------------------------------------------------------------------------
  //----------------------------Funcion para eliminar producto --------------------------------
  //-------------------------------------------------------------------------------------------

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/products/delete/${id}`);
      toast.success("Producto eliminado", {
        position: "bottom-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        autoClose: 5000,
        theme: "colored",
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error("Error al eliminar el producto", {
        position: "bottom-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        autoClose: 5000,
        theme: "colored",
      });
    }
  };

  const handlerDel = (id, productName) => {
    setDelItem({ id, productName });
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
  //------------------------------------------------------------------------------------------
  //----------------------------Funcion para eliminar producto -------------------------------
  //------------------------------------------------------------------------------------------



  //-----------------------------------------------------------------------------------------
  //----------------------------Funcion para cargar la disponibilidad del producto ------------
  //-------------------------------------------------------------------------------------------

  const handleAvailabilityChange = (e) => {
    switch (e.target.name) {
      case "productStock":
        if (e.target.value >= 0) {
          setAvailability({
            ...availability,
            productStock: e.target.value,
          });
        }
        break;
      case "productMin":
        if (e.target.value >= 0) {
          setAvailability({
            ...availability,
            productMin: e.target.value,
          });
        }
        break;
      case "productMax":
        if (e.target.value >= 0) {
          setAvailability({
            ...availability,
            productMax: e.target.value,
          });
        }
        break;
      case "availabilityCat":
        setAvailability({
          ...availability,
          availabilityCat: e.target.value,
        });
        break;
      default:
        break;
    }
  };

  const handleAvailability = async (id) => {
    try {
      const avail = await axios.get(`/products/availability/${id}`);
      setAvailability(avail.data);
      onOpenAvailability();
    } catch (error) {
      console.log(error);
    }
  };

  const handlerSaveAvailability = async (id) => {
    try {
      console.log(availability);
      const newAvailability = {
        productId: availability.productId,
        productStock: availability.productStock,
        productMin: availability.productMin,
        productMax: availability.productMax,
        availabilityCat: availability.availabilityCat,
      };
      console.log(newAvailability);

      await axios.put(`/products/availability/${id}`, newAvailability, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("Disponibilidad del producto actualizada", {
        position: "bottom-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        autoClose: 5000,
        theme: "colored",
      });
      onCloseAvailability();
    } catch (error) {
      console.log(error);
      toast.error("Error al actualizar la disponibilidad del producto", {
        position: "bottom-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        autoClose: 5000,
        theme: "colored",
      });
    }
  };


  //------------------------------------------------------------------------------------------
  //----------------------------Funcion para renderizar la tabla -----------------------------------------------------------
  //------------------------------------------------------------------------------------------



  const renderCell = React.useCallback((products, columnKey) => {

    const cellValue = products[columnKey];

    switch (columnKey) {
      case "productName":
        return (
          <User
            avatarProps={{ radius: "lg", src: products.image }}
            description={products.brand}
            name={products.productName}
          >
            {products.model}
          </User>
        );
      case "manofacturerCode":
        return (
          <div className="flex items-center">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "companyCode":
        return (
          <div className="flex items-center">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "retailPrice":
        return (
          <div className="flex items-center">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "unitMeasurement":
        return (
          <div className="flex items-center">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "Actions":
        return (
          <div className="flex items-center">
            <div className="flex items-center">
              <Dropdown placement="bottom-start" backdrop="blur">
                <DropdownTrigger
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    backgroundColor: "#535353",
                  }}
                >
                  <Button
                    startContent={<TbDotsVertical />}
                    size="sm"
                    variant="success"
                    color="foreground"
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
                      startContent={<RiPencilLine />}
                      onClick={() => {
                        navigate(`/Products/Edit/${products.id}`);
                      }}
                    >
                      Editar
                    </DropdownItem>
                    <DropdownItem
                      startContent={<IoMdEye />}
                      onClick={() => {
                        navigate(`/Products/View/${products.id}`);
                      }}
                    >
                      Ver
                    </DropdownItem>
                    <DropdownItem
                      startContent={<MdChecklist />}
                      onClick={() => {
                        handleAvailability(products.id);
                      }}
                    >
                      Disponibilidad
                    </DropdownItem>
                  </DropdownSection>
                  <DropdownSection title="Eliminar">
                    <DropdownItem
                      className='text-danger'
                      color='danger'
                      startContent={<MdDelete />}
                      onPress={() => handlerDel(products.id, products.productName)}
                    >
                      Eliminar
                    </DropdownItem>
                  </DropdownSection>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);


  //Formulario de busqueda
  //Boton de agregar producto

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
              Listado de Productos
            </Typography>
          </Breadcrumbs>
        </div>
      </div>

      <Modal
        size='xs'
        isOpen={isOpen}
        placement='center'
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
              <ModalHeader>Eliminar producto</ModalHeader>
              <ModalBody>
                <p>¿Está seguro que desea eliminar el producto <b>{DelItem?.productName}</b>?</p>
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

      <Modal
        size='3xl'
        isOpen={isOpenAvailability}
        placement='center'
        aria-labelledby="modal-availability"
        aria-describedby="modal-description"
        isDismissable={false}
        scrollBehavior="inside"
        onOpenChange={onOpenChangeAvailability}
        backdrop='blur'
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader>Disponibilidad del producto</ModalHeader>
              <ModalBody>
                <div className="flex flex-row justify-evenly items-center text-center">
                  <div className="flex flex-col mx-5 mt-6">
                    <label className="text-base">Stock</label>
                    <Input
                      className="mr-10"
                      placeholder="Stock del producto"
                      size="large"
                      type="number" min="0"
                      name="productStock"
                      value={availability?.productStock}
                      onChange={handleAvailabilityChange}
                    />
                  </div>
                  {/*productStock, productMin, productMax, availabilityCat */}
                  <div className="flex flex-col mx-5">
                    <label className="text-base">Minimo del producto</label>
                    <Input
                      className="mr-10"
                      placeholder="Minimo del producto"
                      type="number" min="0"
                      size="large"
                      name="deliveryDate"
                      value={availability?.productMin}
                      onChange={handleAvailabilityChange}
                    />
                  </div>
                  <div className="flex flex-col mx-5">
                    <label className="text-base">Maximo del producto</label>
                    <Input
                      className="mr-10"
                      placeholder="Maximo del producto"
                      type="number" min="0"
                      size="large"
                      name="deliveryDate"
                      value={availability?.productMax}
                      onChange={handleAvailabilityChange}
                    />
                  </div>
                  <div className="flex flex-col mx-5">
                    <label className="text-base">Categoria de disponibilidad</label>
                    <Input
                      className="mr-10"
                      placeholder="Categoria de disponibilidad"
                      size="large"
                      name="deliveryDate"
                      value={availability?.availabilityCat}
                      onChange={handleAvailabilityChange}
                    />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  auto
                  onClick={() => handlerSaveAvailability(availability?.productId)}
                  className="text-inherit text-danger bg-transparent hover:bg-danger hover:text-white"
                >
                  Guardar
                </Button>
                <Button auto onClick={onCloseAvailability} className="text-inherit bg-transparent hover:bg-gray-400 hover:text-black">
                  Cancelar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>



      <div className="flex justify-between items-center p-4 w-11/12 ml-20">
        <div className="flex items-center flex-col lg:flex-row">
        <label className="text-base mr-10 mb-10 lg:mb-0">Buscar por:</label>
          <div className="flex items-center">
            <Input
              startContent={<MdSearch />}
              className="mr-10 mb-10 lg:mb-0"
              placeholder="Nombre de producto"
              size="large"
              width="300px"
              onChange={(e) => setSearchName(e.target.value)}
            />
          </div>
          <div className="flex items-center">
            <Input
              startContent={<MdSearch />}
              placeholder="Codigo de la empresa"
              className="mr-10 mb-10 lg:mb-0"
              size="large"
              width="300px"
              onChange={(e) => setSearchCompanyCode(e.target.value)}
            />
          </div>
          <div className="flex items-center">
            <Input
              startContent={<MdSearch />}
              placeholder='Codigo del fabricante'
              className="mr-10 mb-10 lg:mb-0"
              size="large"
              width="300px"
              onChange={(e) => setSearchManofacturerCode(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center flex-row">
          <Button
            auto
            startContent={<TbPlus />}
            className="mr-10 text-inherit bg-primary hover:bg-primary hover:text-white"
            size="md"
            variant="success"
            onClick={() => navigate("/Products/New")}
          >
            Agregar producto
          </Button>
        </div>
      </div>

      <div className="flex justify-between items-center w-11/12 ml-20 mt-20">
        <Table
          aria-label=" table with client async pagination"
          classNames={{
            wrapper: "w-full max-h-[500px]",
          }}
        >
          <TableHeader
            columns={columns}
          >
            {(column) => <TableColumn key={column.key} align={column.uid === "actions" ? "center" : "start"}>{column.label}</TableColumn>}
          </TableHeader>
          <TableBody items={filterProducts(products)}
            isLoading={isLoading && !items.length}
            emptyContent={
              products.length === 0 ? (
                <Spinner label="Cargando" />
              ) : (
                "No products found"
              )
            }
          >
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default Products
