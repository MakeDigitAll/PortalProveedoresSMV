import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Spacer,
  Divider, link,
} from "@nextui-org/react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import Header from "../../components/header/headerC/Header";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAuth from '../../hooks/useAuth';
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const r = auth.roles;
  const permissions = r.split(",");

  return (
    <>
      <Header />
      <Spacer y={1} />
      <div className="full-width mt-10">
        <Card shadow className="w-11/12 justify-center ml-20">
          <CardHeader className="justify-center">
            <h1>Bienvenido a la plataforma de proveedores de SMV</h1>
          </CardHeader>
          <CardBody className="text-center">
            <h1>Bienvenido <b>{auth.username?.toUpperCase()}</b></h1>
          </CardBody>
        </Card>
      </div>
      <div className="w-full flex flex-col mt-10 lg:flex-row">
        <div className="w-full p-10 flex flex-row items-center justify-evenly">
          {permissions.includes("2001") && (
            <div>
              <Card shadow>
                <CardHeader>
                  <h1>Pedidos</h1>
                </CardHeader>
                <Divider />
                <CardBody>
                  <Dropdown placement="bottom-start">
                    <DropdownTrigger>
                      <p>En esta sección podrás revisar tus pedidos.</p>
                    </DropdownTrigger>
                    <DropdownMenu>
                      <DropdownItem
                        onClick={() => {
                          navigate("/orders/New");
                        }}
                      >
                        Nuevo pedido
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => {
                          navigate("/orders");
                        }}
                      >
                        Mis pedidos
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                  <Divider />
                </CardBody>
                <CardFooter>
                  <Button
                    className="bg-primary"
                    auto
                    onClick={() => {
                      navigate("/orders/New");
                    }
                    }
                  >
                    Nuevo pedido
                  </Button>
                  <Spacer x={0.5} />
                  <Button
                    className="ml-10 bg-primary"
                    auto
                    onClick={() => {
                      navigate("/orders");
                    }
                    }
                  >
                    Mis pedidos
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}
          <Spacer x={1} />
          {permissions.includes("2003") && (
            <div>
              <Card shadow>
                <CardHeader>
                  <h1>Productos</h1>
                </CardHeader>
                <Divider />
                <CardBody>
                  <Dropdown placement="bottom-start">
                    <DropdownTrigger>
                      <p>En esta sección podrás revisar tus productos.</p>
                    </DropdownTrigger>
                    <DropdownMenu>
                      <DropdownItem
                        onClick={() => {
                          navigate("/products/New");
                        }
                        }
                      >
                        Nuevo producto
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => {
                          navigate("/products");
                        }
                        }
                      >
                        Mis productos
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                  <Divider />
                </CardBody>
                <CardFooter>
                  <Button
                    className="bg-primary"
                    auto
                    onClick={() => {
                      navigate("/products/New");
                    }
                    }
                  >
                    Nuevo producto
                  </Button>
                  <Spacer x={0.5} />
                  <Button
                    className="ml-10 bg-primary"
                    auto
                    onClick={() => {
                      navigate("/products");
                    }
                    }
                  >
                    Mis productos
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}
          <Spacer x={1} />
          {permissions.includes("4444") && (
            <div className="flex flex-col lg:flex-row justify-evenly">
              <Card shadow className="m-10">
                <CardHeader>
                  <h1>Pedidos</h1>
                </CardHeader>
                <Divider />
                <CardBody>
                  <Dropdown placement="bottom-start">
                    <DropdownTrigger>
                      <p>En esta sección podrás revisar tus pedidos.</p>
                    </DropdownTrigger>
                    <DropdownMenu>
                      <DropdownItem
                        onClick={() => {
                          navigate("/orders/New");
                        }}
                      >
                        Nuevo pedido
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => {
                          navigate("/orders");
                        }}
                      >
                        Mis pedidos
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                  <Divider />
                </CardBody>
                <CardFooter>
                  <Button
                    className="bg-primary"
                    auto
                    onClick={() => {
                      navigate("/orders/New");
                    }
                    }
                  >
                    Nuevo pedido
                  </Button>
                  <Spacer x={0.5} />
                  <Button
                    className="ml-10 bg-primary"
                    auto
                    onClick={() => {
                      navigate("/orders");
                    }
                    }
                  >
                    Mis pedidos
                  </Button>
                </CardFooter>
              </Card>
              <Card shadow className="m-10">
                <CardHeader>
                  <h1>Distribuidores</h1>
                </CardHeader>
                <Divider />
                <CardBody>
                  <Dropdown placement="bottom-start">
                    <DropdownTrigger>
                      <p>En esta sección podrás revisar tus distribuidores.</p>
                    </DropdownTrigger>
                    <DropdownMenu>
                      <DropdownItem
                        onClick={() => {
                          navigate("/distributors/New");
                        }
                        }
                      >
                        Nuevo distribuidor
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => {
                          navigate("/distributors");
                        }
                        }
                      >
                        Mis distribuidores
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                  <Divider />
                </CardBody>
                <CardFooter>
                  <Button
                    className="bg-primary"
                    auto
                    onClick={() => {
                      navigate("/distributors/New");
                    }
                    }
                  >
                    Nuevo distribuidor
                  </Button>
                  <Spacer x={0.5} />
                  <Button
                    className="ml-10 bg-primary"
                    auto
                    onClick={() => {
                      navigate("/distributors");
                    }
                    }
                  >
                    Mis distribuidores
                  </Button>
                </CardFooter>
              </Card>
              <Card shadow className="m-10">
                <CardHeader>
                  <h1>Productos</h1>
                </CardHeader>
                <Divider />
                <CardBody>
                  <Dropdown placement="bottom-start">
                    <DropdownTrigger>
                      <p>En esta sección podrás revisar tus productos.</p>
                    </DropdownTrigger>
                    <DropdownMenu>
                      <DropdownItem
                        onClick={() => {
                          navigate("/products/New");
                        }
                        }
                      >
                        Nuevo producto
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => {
                          navigate("/products");
                        }
                        }
                      >
                        Mis productos
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                  <Divider />
                </CardBody>
                <CardFooter>
                  <Button
                    className="bg-primary"
                    auto
                    onClick={() => {
                      navigate("/products/New");
                    }
                    }
                  >
                    Nuevo producto
                  </Button>
                  <Spacer x={0.5} />
                  <Button
                    className="ml-10 bg-primary"
                    auto
                    onClick={() => {
                      navigate("/products");
                    }
                    }
                  >
                    Mis productos
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;



