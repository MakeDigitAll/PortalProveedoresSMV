import React from "react";
import Login from "./views/Inicio/Login";
import Profile from "./views/Inicio/Profile";
import Inicio from "./views/Inicio/Home";
import Register from "./views/Inicio/Register";
import VerifyAccount from "./views/Inicio/verifyAccount";
import RequireAuth from './components/Protection/RequireAuth';
import Users from './views/Users/Users';
import NewUsers from './views/Users/NewUsers';
import UsersPermissions from './views/Users/UsersPermissions';
import Products from './views/Products/Products';
import NewProducts from './views/Products/NewProducts';
import NewOrders from './views/Orders/newOrders';
import Orders from './views/Orders/Orders';
import Invoices from "./views/Finance/Invoices";
import Finances from "./views/Finance/Finances";
import LegalDocuments from "./views/Finance/LegalDocuments";
import Error404 from './views/Error/Error404';
import Unauthorized from './views/Error/Unauthorized';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PersistLogin from "./components/Protection/auth/PersistLogin";
 
const ROLES = {
  PROVIDER: 4444,
  USER: 2000,
  PEDIDOS: 2001,
  FINANZAS: 2002,
  PRODUCTOS: 2003,
  FACTURACION: 2004,
};

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
      errorElement: <Error404 />,
    },
    {
      path: "/register",
      element: <Register />,
      errorElement: <Error404 />,
    },
    {
      path: "/verifications/:id/verify/:token",
      element: <VerifyAccount />,
      errorElement: <Error404 />,
    },
    {
      path: "/unauthorized",
      element: <Unauthorized />,
      errorElement: <Error404 />,
    },
       {
         element: <PersistLogin />,
         children: [
    {
      path: "/",
      element: <RequireAuth allowedRoles={[ROLES.PROVIDER, ROLES.USER, ROLES.PEDIDOS, ROLES.FINANZAS, ROLES.PRODUCTOS, ROLES.FACTURACION]} />,
      children: [
        {
          path: "/Home",
          element: <Inicio />,
          errorElement: <Error404 />,
        },
        {
          path: "/Profile",
          element: <Profile />,
          errorElement: <Error404 />,
        },
      ],
    },
    {
      path: "/",
      element: <RequireAuth allowedRoles={[ROLES.PRODUCTOS, ROLES.PROVIDER]} />,
      children: [
        {
          path: "/Products",
          element: <Products/>,
          errorElement: <Error404 />,
        },
        {
          path: "/Products/New",
          element: <NewProducts />,
          errorElement: <Error404 />,
        },
        {
          path: "/Products/Edit/:id",
          element: <NewProducts />,
          errorElement: <Error404 />,
        },
        {
          path: "/Products/View/:id",
          element: <NewProducts />,
          errorElement: <Error404 />,
        },
      ],
    },
    {
      path: "/",
      element: <RequireAuth allowedRoles={[ROLES.PEDIDOS, ROLES.PROVIDER]} />,
      children: [
        {
          path: "/Orders/New",
          element: <NewOrders />,
          errorElement: <Error404 />,
        },
        {
          path: "/Orders/Edit/:id",
          element: <NewOrders />,
          errorElement: <Error404 />,
        },
        {
          path: "/Orders/View/:id",
          element: <NewOrders />,
        },
        {
          path: "/Orders",
          element: <Orders />,
          errorElement: <Error404 />,
        }
      ],
    },
    {
      path: "/",
      element: <RequireAuth allowedRoles={[ROLES.PROVIDER]} />,
      children: [  
        {
          path: "/users",
          element: <Users />,
          errorElement: <Error404 />,
        },
        { 
          path: "/users/New",
          element: <NewUsers />,
          errorElement: <Error404 />,
        },
        {
          path: "/users/Edit/:id",
          element: <NewUsers />, 
          errorElement: <Error404 />,
        },
        {
          path: "/users/Permissions/:id",
          element: <UsersPermissions />,
          errorElement: <Error404 />,
        },
        {
          path: "/users/View/:id",
          element: <NewUsers />,
          errorElement: <Error404 />,
        },
      ],
    },
    {
      path: "/",
      element: <RequireAuth allowedRoles={[ROLES.FINANZAS, ROLES.FACTURACION, ROLES.PROVIDER]} />,
      children: [  
        {
          path: "/Finances",
          element: <Finances />,
          errorElement: <Error404 />,
        },
      ],
    },
    {
      path: "/",
      element: <RequireAuth allowedRoles={[ROLES.FACTURACION, ROLES.PROVIDER]} />,
      children: [
        {
          path: "/Invoices",
          element: <Invoices />,
          errorElement: <Error404 />,
        },
      ],
    },
    {
      path: "/",
      element: <RequireAuth allowedRoles={[ROLES.FINANZAS, ROLES.PROVIDER]} />,
      children: [
        {
          path: "/LegalDocuments",
          element: <LegalDocuments />,
          errorElement: <Error404 />,
        }
      ],
    },
  ]},
  ]);


return (
  <RouterProvider router={router} />
);
}

export default App;