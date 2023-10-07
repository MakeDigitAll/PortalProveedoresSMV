import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Spacer,
  Divider, link,
} from "@nextui-org/react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardBody, CardFooter, Image } from "@nextui-org/react";
import { MdShoppingCart } from "react-icons/md";
import { BiBaguette, BiReceipt } from 'react-icons/bi';
import { PiUserFill } from 'react-icons/pi';
import { FaDollarSign, FaBalanceScale } from 'react-icons/fa';
import { Button } from "@nextui-org/react";
import Header from "../../components/header/headerC/Header";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAuth from '../../hooks/useAuth';
import "react-toastify/dist/ReactToastify.css";
import ba from "../../../dist/Blank-Avatar.png";
const Home = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const r = auth.roles;
  const permissions = r.split(",");

  //interfaz principal, del proveedor
  // Se encuentra el menú de opciones, que se despliega al dar click en el botón de opciones
  // Se encuentran la barra de navegacion en la parte superior, con el logo de SMV y el nombre del proveedor
  // Se encuentra el botón de cerrar sesión, que al dar click, se cierra la sesión del proveedor
  // se encuentra la barra de tareas a la izquierda con las opciones de pedidos, productos y usuarios (dependiendo del rol del proveedor)
  // se utiliza la libreria motion para darle animación a los componentes
  return (
    <>
      <Header />
      <Spacer y={1} />
      <div className="w-full h-full lg:h-unit-9xl flex flex-row justify-end items-center">
        {/* Barra de navegacion (izquierda), usar el componente de nextui, y la propiedad gesture de motion para darle animación y sea visible al pasar el mouse por encima */}
        <div className=" w-1/6 ml-10 flex flex-col justify-evenly items-center mt-52">

          <motion.div
            className="w-full h-5/6 flex"
            whileHover={{ scale: 1.1 }}
          >
            <Spacer y={1} />
            <Button
              startContent={<MdShoppingCart />}
              className="w-full py-10 my-5 text-2xl"
              color="primary"
              onClick={() => navigate("/orders")}
              disabled={permissions.includes("2002") || permissions.includes("4444") ? false : true}
            >
              Pedidos
            </Button>
          </motion.div>
          <motion.div
            className="w-full h-5/6 flex"
            whileHover={{ scale: 1.1 }}
          >

            <Spacer y={1} />
            <Button
              startContent={<BiBaguette />}
              className="w-full py-10 my-5 text-2xl"
              color="primary"
              onClick={() => navigate("/products")}
              disabled={permissions.includes("2001") || permissions.includes("4444") ? false : true}
            >
              Productos
            </Button>
          </motion.div>
          <motion.div
            className="w-full h-5/6 flex"
            whileHover={{ scale: 1.1 }}
          >
            <Spacer y={1} />
            <Button
              startContent={<PiUserFill />}
              className="w-full py-10 my-5 text-2xl"
              color="primary"
              onClick={() => navigate("/users")}
              disabled={permissions.includes("4444") ? false : true}
            >
              Usuarios
            </Button>
          </motion.div>
          <motion.div
            className="w-full h-5/6 flex"
            whileHover={{ scale: 1.1 }}
          >
            <Spacer y={1} />
            <Button
              startContent={<BiReceipt />}
              className="w-full py-10 my-5 text-2xl"
              color="primary"
              onClick={() => navigate("/Facturacion")}
              disabled={permissions.includes("4444") ? false : true}
            >
              Facturación
            </Button>
          </motion.div>
          <motion.div
            className="w-full h-5/6 flex"
            whileHover={{ scale: 1.1 }}
          >
            <Spacer y={1} />
            <Button
              startContent={<FaDollarSign />}
              className="w-full py-10 my-5 text-2xl"
              color="primary"
              onClick={() => navigate("/Finanzas")}
              disabled={permissions.includes("4444") ? false : true}
            >
              Finanzas
            </Button>
          </motion.div>
          <motion.div
            className="w-full h-5/6 flex"
            whileHover={{ scale: 1.1 }}
          >
            <Spacer y={1} />
            <Button
              startContent={<FaBalanceScale />}
              className="w-full py-10 my-5 text-2xl"
              color="primary"
              onClick={() => navigate("/Legales")}
              disabled={permissions.includes("4444") ? false : true}
            >
              Legales
            </Button>
          </motion.div>
        </div>
        {/* Se utiliza el componente de nextui, card, para mostrar la interfaz principal del proveedor */}
        <div className=" w-5/6 ml-10 flex flex-col">
          <motion.div
            className="w-full flex-col justify-center items-center hidden lg:flex" 
            whileHover={{ scale: 1.1 }}
          >
            <Card className="w-5/6 h-5/6">
              <CardHeader>
                <h2 className="text-2xl font-bold">Bienvenido al portal de proveedores SMV</h2>
              </CardHeader>
              <CardBody>
                <div className="flex flex-row">
                  <Image
                    src={auth.imgURL ? auth.imgURL : ba }
                    alt=""
                    width={50}
                    height={40}
                    className="rounded-full"
                  />
                  <h3 className="text-xl font-bold  mt-6 ml-10">{auth.username}</h3>
                </div>
              </CardBody>
              <CardFooter>
                <Button
                  color="error"
                  className="w-1/2"
                  onClick={() => {
                    navigate("/Profile");
                  }}
                >
                  Perfil
                </Button>
                <Button
                  color="error"
                  className="w-1/2"
                  onClick={() => {
                    toast.success("Sesión cerrada");
                  }}
                >
                  Cerrar sesión
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
          <Spacer y={1} />
          <div className="flex lg:flex-row flex-col justify-evenly items-center ml-32 mt-10">
          <motion.div
            className="w-1/6 flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
          >
            <Card
              className="w-full h-5/6"
            >
              <CardHeader>
                <h2 className="text-2xl font-bold">Ultimos pedidos hechos</h2>
              </CardHeader>
              <CardBody>
                <div className="flex flex-col">
                  <p>1. Pedido 1</p>
                  <p>2. Pedido 2</p>
                  <p>3. Pedido 3</p>
                  <p>4. Pedido 4</p>
                  <p>5. Pedido 5</p>
                </div>
              </CardBody>
            </Card>
          </motion.div>
          <motion.div
            className="w-1/6 flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
          >
            <Card
              className="w-full h-5/6"
            >
              <CardHeader>
                <h2 className="text-2xl font-bold">Top productos del mes</h2>
              </CardHeader>
              <CardBody>
                <div className="flex flex-col">
                  <p>1. Producto 1</p>
                  <p>2. Producto 2</p>
                  <p>3. Producto 3</p>
                  <p>4. Producto 4</p>
                  <p>5. Producto 5</p>
                </div>
              </CardBody>
            </Card>
          </motion.div>
          <motion.div
            className="w-1/6 flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
          >
            <Card
              className="w-full h-5/6"
            >
              <CardHeader>
                <h2 className="text-2xl font-bold">Ultimos usuarios agregados</h2>
              </CardHeader>
              <CardBody>
                <div className="flex flex-col">
                  <p>1. Usuario 1</p>
                  <p>2. Usuario 2</p>
                  <p>3. Usuario 3</p>
                  <p>4. Usuario 4</p>
                  <p>5. Usuario 5</p>
                </div>
              </CardBody>
            </Card>
          </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;