import React, { useState, useEffect } from 'react';
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Spacer,
    Divider, link, Checkbox, Card,
} from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, Pagination} from "@nextui-org/react";
import Header from "../../components/header/headerC/Header";
import { useNavigate, useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Input, Link, Button, Textarea, User, Spinner, Radio, RadioGroup } from "@nextui-org/react";
import { MdShoppingCart } from "react-icons/md";
import { TbDotsVertical, TbPlus, TbReload, TbTrash } from "react-icons/tb";
import { MdArrowBack, MdSettings, MdSave } from 'react-icons/md';
import { RiDashboard2Fill } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import useAuth from '../../hooks/useAuth';
import moment from 'moment';
import '../../App.css';

import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const almacenes = [
    { value: 'Almacen 1', label: 'Almacen 1', deliveryData: 'Informacion de envio1' },
    { value: 'Almacen 2', label: 'Almacen 2', deliveryData: 'Informacion de envio2' },
    { value: 'Almacen 3', label: 'Almacen 3', deliveryData: 'Informacion de envio3' },
    { value: 'Almacen 4', label: 'Almacen 4', deliveryData: 'Informacion de envio4' },
    { value: 'Almacen 5', label: 'Almacen 5', deliveryData: 'Informacion de envio5' },
    { value: 'Almacen 6', label: 'Almacen 6', deliveryData: 'Informacion de envio6' },
    { value: 'Almacen 7', label: 'Almacen 7', deliveryData: 'Informacion de envio7' },
    { value: 'Almacen 8', label: 'Almacen 8', deliveryData: 'Informacion de envio8' },
    { value: 'Almacen 9', label: 'Almacen 9', deliveryData: 'Informacion de envio9' },
    { value: 'Almacen 10', label: 'Almacen 10', deliveryData: 'Informacion de envio10' },
];


const NewOrders = () => {
    const navigate = useNavigate();
    const axios = useAxiosPrivate();
    const { auth } = useAuth();
    const ID = auth?.ID;
    const profileName = auth?.username;
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [searchName, setSearchName] = React.useState("");
    const [searchManofacturerCode, setSearchManofacturerCode] = React.useState("");

    const [order, setOrder] = useState({
        providerId: ID,
        profileName: profileName,
        costumer: "",
        orderDate: "" || new Date().toISOString().split('T')[0],
        orderType: "",
        productsOrder: [],
        subTotal: 0,
        discount: 0,
        total: "",
        orderData: "",
        deliveryData: "",
        fulfilled: false,
        paymentMethod: "" || "Transferencia/Deposito",
        comments: "",
    });

    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [keysDelete, setKeysDelete] = useState([]);
    const [variable, setVariable] = useState('Nuevo pedido');
    const [isLoading, setLoading] = useState(false);
    const [editing, setEditing] = useState(false);
    const [isInputDisabled, setIsInputDisabled] = useState(false);
    const params = useParams();

    //--------------------------------------------------------------------------------------------------
    //                                ORDENES
    //--------------------------------------------------------------------------------------------------

    const handleSubmit = async (event) => {
        event.preventDefault();
        const transformedProduct = transformProducts(order.productsOrder);
        const newOrder = {
            ...order,
            providerId: ID,
            orderDate: order.orderDate,
            orderType: order.orderType,
            productsOrder: transformedProduct,
            subTotal: order.subTotal,
            discount: order.discount,
            fulfilled: order.fulfilled,
            total: order.total,
            orderData: order.orderData,
            deliveryData: order.deliveryData,
            paymentMethod: order.paymentMethod,
            comments: order.comments,    
        };

        if (newOrder.orderType === "") {
            toast.error("Seleccione el tipo de pedido");
            return;
        }

        if (newOrder.orderData === "") {
            toast.error("Seleccione el tipo de envio");
            return;
        }

        if (newOrder.productsOrder.length === 0) {
            toast.error("Agregue al menos un producto");
            return;
        }

        if (newOrder.deliveryData === "") {
            toast.error("Seleccione la información de envio");
            return;
        } 


        if(editing){
            console.log('editando');
        }else{

        try {
            await axios.post("/orders/createOrder", newOrder, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                console.log(response.data);
                toast.success("Pedido creado con éxito");
                navigate(`/Orders`); 
            })
            .catch((error) => {
                console.log(error);
                toast.error("Error al crear el pedido");
            });
        } catch (error) {
            console.log(error);
            toast.error("Error al crear el pedido");
        }

        }
    };


    
    const transformProducts = (productsOrder) => {
        const transformedProductsOrder = productsOrder.map((product) => {
            // Crear un nuevo objeto solo con id y quantity
            const transformedProduct = {
              id: product.id,
              quantity: product.quantity,
            };
          
            // Convertir el objeto a una cadena JSON con comillas dobles
            return JSON.stringify(transformedProduct);
          });

            return transformedProductsOrder;
    }


    const handleOrderChange = (event) => {
        switch (event.target.name) {
            case "discount":
                if (event.target.value <= 100 && event.target.value >= 0 && event.target.value.length <= 5) {
                    setOrder({
                        ...order,
                        [event.target.name]: event.target.value,
                    });
                }
                break;
            case "orderType":
                setOrder({
                    ...order,
                    [event.target.name]: event.target.value,
                });
                break;
            default:
                
                setOrder({
                    ...order,
                    [event.target.name]: event.target.value,
                });
                break;
        }
    };

    //--------------------------------------------------------------------------------------------------
    //                                PRODUCTOS
    //--------------------------------------------------------------------------------------------------

    const handlesearchNameChange = (event) => {
        setSearchName(event.target.value);
    };
    const handlesearchManofacturerCodeChange = (event) => {
        setSearchManofacturerCode(event.target.value);
    };
    const filterProducts = (products) => {
        if (searchName === "" && searchManofacturerCode === "") {
            return products;
        } else {
            return products.filter((product) => {
                console.log(product);
                return (
                    product.productName.toLowerCase().includes(searchName.toLowerCase()) &&
                    product.manofacturerCode.toLowerCase().includes(searchManofacturerCode.toLowerCase())
                );
            });
        }
    };

    const loadProducts = async () => {
        try {
            onOpen();
            setLoading(true);
            const response = await axios.get(`/orders/getProductsOrders/${ID}`);
            const images = await Promise.all(
                response.data.map((product) => {
                    return axios.get(`/products/image/${product.id}/${1}`, {
                        responseType: 'blob'
                    })
                })
            )
            const products = response.data.map((product, index) => {
                const isNullBlob = images[index].data.size === 0;
                const image = isNullBlob ? null : URL.createObjectURL(images[index].data);
                return {
                    ...product,
                    image,
                }
            })
            setProducts(products);
            //console.log(products);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

   
    const addProducts = () => {
        const selectedProductsArray = Array.from(selectedProducts);
        const selectedProductIDs = selectedProductsArray.map(Number);
      
        // Filtra los productos seleccionados que no están en el estado "order"
        const newProducts = products.filter((product) => {
          return (
            selectedProductIDs.includes(product.id) &&
            !order.productsOrder.some((orderedProduct) => orderedProduct.id === product.id)
          );
        });
      
        // Mapea los nuevos productos y agrega información adicional

        // Agregar que solo adicione el id y la cantidad
        const newProductsOrder = newProducts.map((product) => {
          return {
            ...product,
            quantity: 1
          };
        });

        // Actualiza el estado "order" solo con los productos nuevos y el subtotal
        const newOrder = {
          ...order,
          productsOrder: [...order.productsOrder, ...newProductsOrder],
        };
      
        // Establece el nuevo estado "order" y limpia la selección
        setOrder(newOrder);
        setSelectedProducts([]);
      };
      

    const handleQuantityChange = (id, quantity) => {
        const newProductsOrder = order.productsOrder.map((product) => {
            if (product.id === id) {
                return {
                    ...product,
                    quantity: quantity,
                };
            } else {
                return product;
            }
        });
        setOrder({
            ...order,
            productsOrder: newProductsOrder,
        });
    };




    const columnsOrder = [
        {
            key: "productName",
            label: "Nombre del producto",
        },
        {
            key: "manofacturerCode",
            label: "Codigo del fabricante",
        },
        {
            key: "price1",
            label: "Precio",
        },
        {
            key: "quantity",
            label: "Cantidad",
        },
        {
            key: "subtotal",
            label: "Subtotal",
        },
    ];

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
            key: "existence",
            label: "Existencia",
        },
        {
            key: "bo",
            label: "B.O",
        },
        {
            key: "price1",
            label: "Precio",
        },
    ];

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
            case "existence":
                return (
                    <div className="flex items-center">
                        <p className="text-bold text-sm capitalize">{cellValue === 0 ? "Agotado" : cellValue}</p>
                    </div>
                );
            case "bo":
                return (
                    <div className="flex items-center">
                        <p className="text-bold text-sm capitalize">{cellValue || "NA"}</p>
                    </div>
                );
            case "price1":
                return (
                    <div className="flex items-center">
                        <p className="text-bold text-sm capitalize">${cellValue}</p>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    const renderCellOrder = React.useCallback((products, columnKey) => {
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
            case "price1":
                return (
                    <div className="flex items-center">
                        <p className="text-bold text-sm capitalize">${cellValue}</p>
                    </div>
                );
            case "quantity":
                return (
                    <div className="flex items-center text-center w-1/2">
                        <Input
                            type="number"
                            value={products.quantity}
                            onChange={(event) => handleQuantityChange(products.id, event.target.value)}
                            name="quantity"
                            isDisabled={isInputDisabled}
                        />
                    </div>
                );
            case "subtotal":
                return (
                    <div className="flex items-center">
                        <p className="text-bold text-sm capitalize">${products.price1 * products.quantity || 0}</p>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);




    const [page, setPage] = React.useState(1);
    const rowsPerPage = 4;

    const pages = Math.ceil(products.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return products.slice(start, end);
    }, [page, rowsPerPage, products]);

    //--------------------------------------------------------------------------------------------------
    //                                PRODUCTOS
    //--------------------------------------------------------------------------------------------------

    const loadOrder = async () => {
        try {
            const response = await axios.get(`/orders/getOrderById/${params.id}`);
            console.log(response.data);
            setOrder({
                ...order,
                costumer: response.data.costumer || "",
                orderDate: moment(response.data.orderDate).format('YYYY-MM-DD'),
                orderType: response.data.orderType,
                subTotal: Number(response.data.subtotal),
                discount: Number(response.data.discount),
                fulfilled: response.data.fulfilled,
                total: Number(response.data.total),
                orderData: response.data.orderData,
                deliveryData: response.data.deliveryData,
                paymentMethod: response.data.paymentMethod,
                comments: response.data.comments,
            });
            let productsOrder = response.data.productsOrder;
            console.log(productsOrder);

            setEditing(true);
            let url = window.location.pathname;
            let arr = url.split('/');
            if (arr[2] === 'Edit') {
                setVariable('Editar pedido');
                setIsInputDisabled(false);
            }
            if (arr[2] === 'View') {
                setVariable('Ver pedido');
                setIsInputDisabled(true);
            }
        } catch (error) {
            toast.error('Error al cargar la orden');
        }
    }

    useEffect(() => {
        const subtotal = order.productsOrder.reduce((acc, product) => {
          return acc + product.price1 * product.quantity;
        }, 0);

        const subtotalfixed = subtotal.toFixed(2);

        const impuestos = subtotal * 0.16;

        const discount = subtotal * (order.discount / 100);
      
        const total = subtotal - impuestos - discount;

        const totalfixed = total.toFixed(2);
      
        setOrder({
          ...order,
          subTotal: subtotalfixed,
          total: totalfixed,
        });
      }, [order.productsOrder, order.discount]);
      
    useEffect(() => {
        if (params.id) {
            loadOrder();
        }
    }, []);

    //console.log(selectedKeys);

    return (
        <div className="flex flex-col w-full h-full">
            <Header />
            <ToastContainer />
            <div className="flex justify-between items-center ml-20 mt-10 mb-5 text-sm md:text-base">
                <div className="flex items-center md:sm">
                    <Breadcrumbs aria-label="breadcrumb" color="foreground" className='hidden md:flex'>
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
                        <Link
                            className="text-foreground"
                            underline="hover"
                            sx={{ display: "flex", alignItems: "center" }}
                            color="foreground"
                            href="#"
                            onClick={() => navigate(`/Orders`)}
                        >
                            <MdSettings sx={{ mr: 0.5 }} fontSize="inherit" />
                            Pedidos
                        </Link>
                        <Typography
                            sx={{ display: "flex", alignItems: "center" }}
                            className="text-foreground"
                        >
                            <MdShoppingCart sx={{ mr: 0.5 }} fontSize="inherit" />
                            {variable}
                        </Typography>
                    </Breadcrumbs>
                </div>
            </div>

            <Modal
                isOpen={isOpen}
                size="5xl"
                placement="auto"
                onOpenChange={onOpenChange}
                scrollBehavior="inside"
                isDismissable={false}
                backdrop="blur"
                motionProps={{
                    variants: {
                        enter: {
                            y: 0,
                            opacity: 1,
                            transition: {
                                duration: 0.3,
                                ease: "easeOut",
                            },
                        },
                        exit: {
                            y: -20,
                            opacity: 0,
                            transition: {
                                duration: 0.2,
                                ease: "easeIn",
                            },
                        },
                    }
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Agregar producto</ModalHeader>
                            <ModalBody>
                                <div className="flex flex-col m-10 w-11/12 h-full">
                                    <div className="flex flex-row h-1/2 lg:min-h-[100px]">
                                        <Input className='w-full lg:w-1/2 px-10 mb-5' placeholder="Nombre del producto" label="Nombre del producto" labelPlacement="outside" value={searchName} onChange={handlesearchNameChange} name="productName" isDisabled={isInputDisabled} />
                                        <Input className='w-full lg:w-1/2 px-10' placeholder="Codigo del fabricante" label="Codigo del fabricante" labelPlacement="outside" value={searchManofacturerCode} onChange={handlesearchManofacturerCodeChange} name="manofacturerCode" isDisabled={isInputDisabled} />
                                    </div>
                                    <div>
                                        {/* al seleccionar un item de la tabla todo el registro se guarda en un state */}
                                        <Table
                                            aria-label=" table with client async pagination"
                                            color={'default'}
                                            selectionMode='multiple'
                                            selectedKeys={selectedProducts}
                                            onSelectionChange={(keys) => {
                                                setSelectedProducts(keys);
                                            }}
                                            isHeaderSticky
                                            bottomContent={
                                                <div className="flex justify-center">
                                                    <Pagination
                                                        isCompact
                                                        showControls
                                                        showShadow
                                                        color="secondary"
                                                        page={page}
                                                        total={pages}
                                                        onChange={(page) => setPage(page)}
                                                    />
                                                </div>
                                            }
                                            classNames={{
                                                wrapper: "max-h-[300px]",
                                            }}
                                        >
                                            <TableHeader
                                                columns={columns}
                                                className='text-inherit '
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
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    auto
                                    onClick={() => {
                                        onClose();
                                    }}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    auto
                                    type="success"
                                    className="bg-green-500 hover:bg-green-600"
                                    onClick={() => {
                                        addProducts();
                                        onClose();
                                    }}
                                >
                                    Agregar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>


            <div className="flex flex-col mx-10 mt-10 mb-1 lg:flex-row">
                <Input className='w-full lg:w-1/2 px-10' placeholder="Usuario" label="Responsable" labelPlacement="outside" value={order.profileName} onChange={handleOrderChange} name="user" isDisabled={true} />
                <Dropdown>
                    <DropdownTrigger>
                        <Input className='lg:w-1/2 px-10' placeholder="Información de envio" label="Información de envio" labelPlacement="outside" value={order.costumer || "Seleccione un almacen"} name="costumer" isDisabled={isInputDisabled} />
                    </DropdownTrigger>
                    <DropdownMenu>
                        {almacenes.map((almacen) => (
                            <DropdownItem
                                key={almacen.value}
                                onClick={() => 
                                    setOrder({ ...order, costumer: almacen.value, deliveryData: almacen.deliveryData })
                                }
                            >
                                {almacen.label}
                            </DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>
            </div>
            <div className="flex flex-col mx-10 lg:flex-row justify-end">
                <Textarea className='w-full lg:w-1/2 px-10' placeholder="Comentarios" maxRows={4} value={order.comments} onChange={handleOrderChange} name="comments" isDisabled={isInputDisabled} />
                <Textarea className='w-full lg:w-1/2 px-10' placeholder="Informacion de envio" maxRows={4} value={order.deliveryData} onChange={handleOrderChange} name="deliveryData" isDisabled={true} />
            </div>

            <div className="flex flex-col lg:flex-row mx-10 mb-5 pr-10 h-full">
                <div className="flex flex-row lg:w-1/2 mt-10">
                    <Input type='date' className='w-1/3 pl-10' placeholder="Fecha de pedido" label="Fecha de pedido" labelPlacement="outside" value={order.orderDate} onChange={handleOrderChange} name="orderDate" isDisabled={true} />
                    <Dropdown>
                        <DropdownTrigger>
                            <Input className='w-1/3 pl-10 px-10 lg:mt-0' placeholder="Tipo de pedido" label="Tipo de pedido" labelPlacement="outside" value={order.orderType || "Seleccione el tipo de entrega"} name="orderType" isDisabled={isInputDisabled} />
                        </DropdownTrigger>
                        <DropdownMenu>
                            <DropdownItem
                                onClick={() => setOrder({ ...order, orderType: "Directo a almacén" })}
                            >
                                Directo a almacén
                            </DropdownItem>
                            <DropdownItem
                                onClick={() => setOrder({ ...order, orderType: "Acordar con el encargado de área" })}
                            >
                                Acordar con el encargado de área
                            </DropdownItem>
                            <DropdownItem
                                onClick={() => setOrder({ ...order, orderType: "Pendiente" })}
                            >
                                Pendiente
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <Button className='w-1/4 mt-6' color="primary" auto onPress={loadProducts} startContent={<TbPlus />}>
                        Agregar producto
                    </Button>
                </div>
                <div className="flex lg:w-1/2 mt-10 items-end justify-start lg:justify-end">
                    <div>
                        <Checkbox
                            className='w-full pl-12 mt-3'
                            checked={order.fulfilled}
                            onChange={(event) => {
                                setOrder({ ...order, fulfilled: event.target.checked });
                            }}
                        >
                            Es recurrente
                        </Checkbox>
                    </div>
                    <div>
                        <Dropdown>
                            <DropdownTrigger>
                                <Input className='w-full px-5 mt-5' placeholder="Envio" label="Envio" labelPlacement="outside-left" value={order.orderData || "Seleccione el tipo de envio"} name="orderData" isDisabled={isInputDisabled} />
                            </DropdownTrigger>
                            <DropdownMenu>
                                <DropdownItem
                                    onClick={() => setOrder({ ...order, orderData: "Directo a almacén" })}
                                >
                                    Directo a almacén
                                </DropdownItem>
                                <DropdownItem
                                    onClick={() => setOrder({ ...order, orderData: "Acordar con el encargado de área" })}
                                >
                                    Acordar con el encargado de área
                                </DropdownItem>
                                <DropdownItem
                                    onClick={() => setOrder({ ...order, orderData: "Pendiente" })}
                                >
                                    Pendiente
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <div>
                        <label className="text-sm text-gray-500">Descuento</label>
                        <Input
                            className='w-full'
                            type="number"
                            endContent="%"
                            placeholder='0 - 100'
                            value={order.discount}
                            onChange={handleOrderChange}
                            name="discount"
                            isDisabled={isInputDisabled}
                        />
                    </div>
                </div>
            </div>
            <div className="flex flex-col mx-10 mb-5 pl-10 lg:flex-row h-full">
                {/* Tabla del pedido */}
                {order.productsOrder.length === 0 ? (
                    <div className="flex flex-col lg:flex-row mt-6 pr-32 lg:pr-24 h-full lg:w-1/2 ">
                        <Table
                            removeWrapper
                            aria-label=" table with client async pagination"
                            classNames={{
                                wrapper: "max-h-[400px]",
                            }}
                        >
                            <TableHeader
                                columns={columnsOrder}
                                className='text-inherit '
                            >
                                {(column) => <TableColumn key={column.key} align={column.uid === "actions" ? "center" : "start"}>{column.label}</TableColumn>}
                            </TableHeader>
                            <TableBody>
                            </TableBody>
                        </Table>
                    </div>

                ) : (
                    <div className="flex flex-col lg:flex-row mt-6 pr-32 lg:pr-24 h-full lg:w-1/2 ">
                        <Table
                            removeWrapper
                            // selectionMode='multiple'
                            // selectedKeys={selectedKeys}
                            // onSelectionChange={(keys) => {
                            //     setSelectedKeys(keys);
                            // }}
                            // aria-label=" table with client async pagination"
                            // classNames={{
                            //     wrapper: "max-h-[100px]",
                            // }}
                        >
                            <TableHeader
                                columns={columnsOrder}
                                className='text-inherit '
                            >
                                {(column) => <TableColumn key={column.key} align={column.uid === "actions" ? "center" : "start"}>{column.label}</TableColumn>}
                            </TableHeader>
                            <TableBody items={order.productsOrder}
                                isLoading={isLoading && !items.length}
                                emptyContent={
                                    products.length === 0 &&
                                    <div className="flex flex-col items-center justify-center h-full">
                                        <p className="text-2xl font-bold text-gray-400"></p>
                                    </div>
                                }
                            >
                                {(item) => (
                                    <TableRow key={item.id}>
                                        {(columnKey) => <TableCell>{renderCellOrder(item, columnKey)}</TableCell>}
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                        {selectedKeys > 0 && (
                            <div>
                                <Button className='w-1/2 mt-10 lg:w-1/4' color="warning" auto startContent={<TbTrash />}>
                                    Eliminar
                                </Button>
                            </div>
                        )}
                    </div>
                )}
                {/* Tabla de los totales */}
                <div className="flex flex-col mt-14 h-full lg:w-1/2">
                    <Table className='' removeWrapper hideHeader selectionMode='none' border={true}>
                        <TableHeader
                            columns={[
                                {
                                    key: "name",
                                    label: "Nombre",
                                },
                                {
                                    key: "value",
                                    label: "Valor",
                                },
                            ]}
                        >
                            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                        </TableHeader>

                        <TableBody>
                            <TableRow>
                                <TableCell className='text-right'>SubTotal</TableCell>
                                <TableCell className='text-center'>${order.subTotal || 0}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className='text-right'>Descuento</TableCell>
                                <TableCell className='text-center'>${(order.subTotal * (order.discount / 100)).toFixed(2) || 0}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className='text-right'>Impuestos (16%)</TableCell>
                                <TableCell className='text-center'>${(order.total * 0.16).toFixed(2) || '0.00'}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className='text-right'>Total</TableCell>
                                <TableCell className='text-center'>${order.total || 0}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <div className="flex flex-row justify-center mt-6 pr-32 lg:pr-0">
                        <Button className='w-1/2 mt-10 lg:w-1/4' color="primary" auto startContent={<MdSave /> } onClick={handleSubmit}>
                            Guardar Pedido
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewOrders;
