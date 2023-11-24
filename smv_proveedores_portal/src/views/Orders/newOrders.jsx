import React, { useState, useEffect } from 'react';
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Checkbox,
} from "@nextui-org/react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure
} from "@nextui-org/react";
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
    Pagination
} from "@nextui-org/react";
import Header from "../../components/header/headerC/Header";
import { useNavigate, useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Input, Link, Button, Textarea, User, Spinner } from "@nextui-org/react";
import { MdShoppingCart } from "react-icons/md";
import { TbPlus, TbTrash } from "react-icons/tb";
import { MdSettings, MdSave } from 'react-icons/md';
import { RiDashboard2Fill } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import useAuth from '../../hooks/useAuth';
import moment from 'moment';
import '../../App.css';

import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const almacenes = [
    { value: 'Informacion de envio 1', label: 'Informacion de envio 1', deliveryData: 'Apodaca \n Monterrey, Nuevo Leon \n Codigo postal: 64000 \n ' },
    { value: 'Informacion de envio 2', label: 'Informacion de envio 2', deliveryData: 'Guadalupe \n Monterrey, Nuevo Leon \n Codigo postal: 64000 \n ' },
    { value: 'Informacion de envio 3', label: 'Informacion de envio 3', deliveryData: 'San Nicolas \n Monterrey, Nuevo Leon \n Codigo postal: 64000 \n ' },
    { value: 'Informacion de envio 4', label: 'Informacion de envio 4', deliveryData: 'Garcia \n Monterrey, Nuevo Leon \n Codigo postal: 64000 \n ' },
    { value: 'Informacion de envio 5', label: 'Informacion de envio 5', deliveryData: 'San Pedro \n Monterrey, Nuevo Leon \n Codigo postal: 64000 \n ' },
    { value: 'Informacion de envio 6', label: 'Informacion de envio 6', deliveryData: 'Santa Catarina \n Monterrey, Nuevo Leon \n Codigo postal: 64000 \n ' },
    { value: 'Informacion de envio 7', label: 'Informacion de envio 7', deliveryData: 'Juarez \n Monterrey, Nuevo Leon \n Codigo postal: 64000 \n ' },
    { value: 'Informacion de envio 8', label: 'Informacion de envio 8', deliveryData: 'Cadereyta \n Monterrey, Nuevo Leon \n Codigo postal: 64000 \n ' },
    { value: 'Informacion de envio 9', label: 'Informacion de envio 9', deliveryData: 'Santiago \n Monterrey, Nuevo Leon \n Codigo postal: 64000 \n ' },
    { value: 'Informacion de envio 10', label: 'Informacion de envio 10', deliveryData: 'Allende \n Monterrey, Nuevo Leon \n Codigo postal: 64000 \n ' },
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
        estimatedDeliveryDate: "",
        orderType: "",
        productsOrder: [],
        subTotal: 0,
        discount: 0,
        total: "",
        orderData: "",
        PONumber: "",
        deliveryData: "",
        fulfilled: false,
        paymentMethod: "" || "Transferencia/Deposito",
        comments: "",
    });

    const [products, setProducts] = useState([]);
    const [productsList, setProductsList] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);
    //const [keysDelete, setKeysDelete] = useState([]);
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
            estimatedDeliveryDate: order.estimatedDeliveryDate,
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

        if (newOrder.estimatedDeliveryDate === "") {
            toast.error("Seleccione la fecha de entrega");
            return;
        }

        if (newOrder.PONumber === "") {
            toast.error("Ingrese la referencia de la compra");
            return;
        }
        


        if (editing) {
            console.log('editando');
        } else {

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
                price1: product.price1,
                manofacturerCode: product.manofacturerCode
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
            case "estimatedDeliveryDate":
                setOrder({
                    ...order,
                    [event.target.name]: moment(event.target.value).format('YYYY-MM-DD'),
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
        setLoading(true);
        try {
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
                id: product.id,
                quantity: 1,
                price1: product.price1,
                manofacturerCode: product.manofacturerCode,
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
            if (product.id === id && quantity > 0) {
                return {
                    ...product,
                    quantity: Number(quantity),
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

    //--------------------------------------------------------------------------------------------------
    //                                PRODUCTOS
    //--------------------------------------------------------------------------------------------------

    const loadOrder = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/orders/getOrderById/${params.id}`);
            console.log(response.data);
            let productsOrder = response.data.productsOrder.map(product => JSON.parse(product));
            setOrder({
                ...order,
                orderDate: moment(response.data.orderDate).format('YYYY-MM-DD'),
                estimatedDeliveryDate: moment(response.data.estimatedDeliveryDate).format('YYYY-MM-DD'),
                orderType: response.data.orderType,
                subTotal: Number(response.data.subtotal),
                discount: Number(response.data.discount),
                productsOrder: productsOrder,
                fulfilled: response.data.fulfilled,
                total: Number(response.data.total),
                orderData: response.data.orderData,
                PONumber: response.data.PONumber,
                deliveryData: response.data.deliveryData,
                paymentMethod: response.data.paymentMethod,
                comments: response.data.comments,
            });
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
            setLoading(false);
        } catch (error) {
            toast.error('Error al cargar la orden');
        }
    }

    // Into order.productsOrder we have the product id, quantity and price
    // obteind rest of the product data from the database and add it to the order.productsOrder with an useEffect

    useEffect(() => {
        if (params.id) {
            loadOrder();
        }
        loadProducts();
    }, []);

    useEffect(() => {
        if (order.productsOrder.length === 0 || products.length === 0) return;
        const updateProductInfo = async () => {
            try {
                const updatedProductsOrder = await Promise.all(
                    order.productsOrder.map(async (product) => {
                        // Busca el producto en el estado 'products'
                        const matchingProduct = products.find((p) => p.id === product.id);

                        if (matchingProduct) {
                            // Si se encuentra el producto, agrega los detalles necesarios
                            return {
                                ...matchingProduct,
                                quantity: product.quantity,
                                price1: product.price1,
                                manofacturerCode: product.manofacturerCode,
                            };
                        }
                    })
                );

                console.log(updatedProductsOrder);
                setProductsList(updatedProductsOrder);

                setOrder((prevOrder) => ({
                    ...prevOrder,
                    subTotal: calculateSubtotal(updatedProductsOrder),
                    total: calculateTotal(updatedProductsOrder, prevOrder.discount),
                }));
            } catch (error) {
                console.log(error);
            }
        };

        const calculateSubtotal = (products) => {
            return products.reduce((acc, product) => acc + Number(product.price1) * Number(product.quantity), 0).toFixed(2);
        };

        const calculateTotal = (products, discount) => {
            const subtotal = calculateSubtotal(products);
            const impuestos = subtotal * 0.16;
            const discountAmount = subtotal * (discount / 100);
            const total = subtotal - impuestos - discountAmount;
            return total.toFixed(2);
        };

        updateProductInfo();
    }
        , [order.productsOrder, order.discount, products]);

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
                                        <Input className='w-full lg:w-1/2 px-10 mb-5' label="Nombre del producto" labelPlacement="outside" value={searchName} onChange={handlesearchNameChange} name="productName" isDisabled={isInputDisabled} />
                                        <Input className='w-full lg:w-1/2 px-10' label="Codigo del fabricante" labelPlacement="outside" value={searchManofacturerCode} onChange={handlesearchManofacturerCodeChange} name="manofacturerCode" isDisabled={isInputDisabled} />
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
                                                isLoading={isLoading}
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


            {isLoading ? (
                <div className="flex flex-col items-center justify-center h-full">
                    <Spinner label="Cargando" />
                </div>
            ) : (
                <div>
                    <div className="flex flex-col mx-10 mt-10 mb-1 lg:flex-row">
                        <Input className='w-full lg:w-1/2 px-10' placeholder="Usuario" label="Responsable" labelPlacement="outside" value={order.profileName} onChange={handleOrderChange} name="user" isDisabled={true} />
                        <Dropdown>
                            <DropdownTrigger>
                                <Input className='lg:w-1/2 px-10' placeholder="Información de envio" label="Información de envio" labelPlacement="outside" value={order.costumer || "Seleccione Información de envio"} name="costumer" isDisabled={isInputDisabled} />
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
                            <Input type='date' className='w-1/3 pl-10' label="Fecha de pedido" labelPlacement="outside" value={order.orderDate} onChange={handleOrderChange} name="orderDate" isDisabled={true} />
                            <Input type='date' className='w-1/3 pl-10' label="Fecha de entrega" labelPlacement="outside" value={order.estimatedDeliveryDate} onChange={handleOrderChange} name="estimatedDeliveryDate" isDisabled={isInputDisabled} />
                            <Dropdown>
                                <DropdownTrigger>
                                    <Input className='w-1/3 pl-10 px-10 lg:mt-0' label="Tipo de pedido" labelPlacement="outside" value={order.orderType || "Seleccione el tipo de entrega"} name="orderType" isDisabled={isInputDisabled} />
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
                            <Button className='w-1/4 mt-6' color="primary" auto onPress={onOpen} startContent={<TbPlus />}>
                                Agregar producto
                            </Button>
                        </div>
                        <div className="flex flex-col w-full">
                        <div className="flex flex-row mt-10 place-content-end">
                            <Input
                                className='w-1/3'
                                label="Referencia de la compra"
                                labelPlacement="outside"
                                value={order.PONumber}
                                onChange={handleOrderChange}
                                name="PONumber"
                                isDisabled={isInputDisabled}
                            />
                        </div>
                        <div className="flex flex-row mt-10 place-content-end">
                                <Checkbox
                                    className='mr-10'
                                    checked={order.fulfilled}
                                    onChange={(event) => {
                                        setOrder({ ...order, fulfilled: event.target.checked });
                                    }}
                                >
                                    Es recurrente
                                </Checkbox>
                                <Dropdown>
                                    <DropdownTrigger>
                                        <Input className='w-1/4' placeholder="Envio" label="Envio" labelPlacement="outside-left" value={order.orderData || "Seleccione el tipo de envio"} name="orderData" isDisabled={isInputDisabled} />
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
                                <label className="text-sm text-gray-500">Descuento</label>
                                <Input
                                    className='w-1/4'
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
                                        className='text-inherit text-center'
                                    >
                                        {(column) => <TableColumn key={column.key} align={column.uid === "actions" ? "center" : "start"}>{column.label}</TableColumn>}
                                    </TableHeader>
                                    <TableBody
                                        isLoading={isLoading}
                                        emptyContent={
                                            products.length === 0 &&
                                            <div className="flex flex-col items-center justify-center h-full">
                                                <p className="text-2xl font-bold text-gray-400"> No orders found</p>
                                            </div>
                                        }
                                    >
                                        {productsList.map((product) => (
                                            <TableRow>
                                                <TableCell>
                                                    <User
                                                        avatarProps={{ radius: "lg", src: product.image }}
                                                        description={product.brand}
                                                        name={product.productName}
                                                    >
                                                        {product.model}
                                                    </User>
                                                </TableCell>
                                                <TableCell className='text-center'>{product.manofacturerCode}</TableCell>
                                                <TableCell className='text-center'>{product.price1}</TableCell>
                                                <TableCell className='text-center'>
                                                    <Input
                                                        type="number"
                                                        value={product.quantity}
                                                        onChange={(event) => handleQuantityChange(product.id, event.target.value)}
                                                        name="quantity"
                                                        isDisabled={isInputDisabled}
                                                    />
                                                </TableCell>
                                                <TableCell className='text-center'>${product.price1 * product.quantity || 0}</TableCell>
                                            </TableRow>
                                        ))}
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
                                <Button className='w-1/2 mt-10 lg:w-1/4' color="primary" auto startContent={<MdSave />} onClick={handleSubmit}>
                                    Guardar Pedido
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default NewOrders;
