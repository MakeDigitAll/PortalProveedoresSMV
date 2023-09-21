import { Accordion, AccordionItem, Card, CardBody } from "@nextui-org/react";
import {
  RiAdminFill,
  RiDashboard2Fill,
  RiGroup2Line,
  RiGroupFill,
  RiLightbulbFill,
  RiStore3Line,
  RiUser2Fill,
} from "react-icons/ri";
import { TbReport, TbReportAnalytics, TbWorld } from "react-icons/tb";
import { MdSettings, MdShoppingCart, MdStorefront } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const items = [
  {
    id: 1,
    name: "Dashboard",
    icon: RiDashboard2Fill,
    address: "Home",
  },
  {
    id: 2,
    name: "Ventas",
    icon: TbReport,
    address: "Sells",
  },
  {
    id: 3,
    name: "Facturación",
    icon: TbReportAnalytics,
    address: "Facturation",
    roleId: "0",
  },
  {
    id: 4,
    name: "Administración",
    icon: RiAdminFill,
    address: "Administration",
    roleId: "0",
  },
  {
    id: 5,
    name: "Clientes",
    icon: RiGroupFill,
    address: "Customers",
    roleId: "0",
  },
  {
    id: 6,
    name: "Vendedores",
    icon: RiUser2Fill,
    address: "Sellers",
    roleId: "0",
  },
  {
    id: 7,
    name: "Proveedores",
    icon: RiGroup2Line,
    address: "Providers",
    roleId: "0",
  },
  {
    id: 8,
    name: "Productos",
    icon: MdShoppingCart,
    address: "Products/ProductList",
    roleId: "0",
  },
  {
    id: 9,
    name: "Almacén",
    icon: MdStorefront,
    address: "Store",
    roleId: "0",
  },
  {
    id: 10,
    name: "Mercadotecnia",
    icon: RiLightbulbFill,
    address: "Marketing",
    roleId: "0",
  },
  {
    id: 11,
    name: "Punto de venta",
    icon: RiStore3Line,
    address: "POS",
    roleId: "0",
  },
  { id: 12, name: "Web", icon: TbWorld, address: "WEB", roleId: "0" },
  {
    id: 13,
    name: "Ajustes",
    icon: MdSettings,
    address: "Settings",
    roleId: "0",
  },
];
const ItemsHeader = () => {
  const navigate = useNavigate();
  const [selectedKeys, setSelectedKeys] = useState(new Set(["1"]));

  return (
    <div className="place-content-center">
      <Accordion
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        variant="light"
      >
        <AccordionItem key="1" aria-label="Menu">
          <div className="gap-2 sm:grid-cols-13 flex flex-wrap justify-center">
            {items.map((item, index) => (
              <Card
                className="w-[100px] h-[60px] col-span-15 sm:col-span-7"
                shadow="sm"
                key={index}
                isPressable
                onPress={() => navigate(`/${item.address}`)}
              >
                <CardBody className="overflow-visible py-2">
                  <div
                    className="flex justify-center items-center"
                  >
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div className="text-center" style={{ marginTop: "3px" }}>
                    <h6 style={{fontSize:'9px'}}>{item.name}</h6>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ItemsHeader;