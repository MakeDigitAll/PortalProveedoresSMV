import React from "react";
import Login from "./views/Inicio/Login";
import Inicio from "./views/Inicio/Home";
import Register from "./views/Inicio/Register";
import VerifyAccount from "./views/Inicio/verifyAccount";
import RequireAuth from './components/Protection/RequireAuth';
import Distributors from './views/Distributors/Distributors';
import NewDistributors from './views/Distributors/NewDistributors';
import DistributorsPermissions from './views/Distributors/DistributorsPermissions';
import Products from './views/Products/Products';
import SettingsDashboard from './views/Settings/SettingsDashboard';
import Error404 from './views/Error/Error404';
import Unauthorized from './views/Error/Unauthorized';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PersistLogin from "./components/Protection/auth/PersistLogin";

const ROLES = {
  PROVIDER: 4444,
  DISTRIBUTOR: 2000,
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
      path: "/users/:id/verify/:token",
      element: <VerifyAccount />,
      errorElement: <Error404 />,
    },
    {
      path: "/unauthorized",
      element: <Unauthorized />,
      errorElement: <Error404 />,
    },
    //   {
    //     element: <PersistLogin />,
    //     children: [
    {
      path: "/",
      element: <RequireAuth allowedRoles={[ROLES.PROVIDER, ROLES.DISTRIBUTOR, ROLES.PEDIDOS, ROLES.FINANZAS, ROLES.PRODUCTOS, ROLES.FACTURACION]} />,
      children: [
        {
          path: "/Home",
          element: <Inicio />,
          errorElement: <Error404 />,
        },
        {
          path: "/Settings",
          element: <SettingsDashboard />,
          errorElement: <Error404 />,
        },
      ],
    },
    {
      path: "/",
      element: <RequireAuth allowedRoles={[ROLES.PROVIDER]} />,
      children: [
        {
          path: "/distributors",
          element: <Distributors />,
          errorElement: <Error404 />,
        },
        {
          path: "/distributors/New",
          element: <NewDistributors />,
        },
        {
          path: "/distributors/Edit/:id",
          element: <NewDistributors />,
        },
        {
          path: "/distributors/Permissions/:id",
          element: <DistributorsPermissions />,
        },
        {
          path: "/distributors/View/:id",
          element: <NewDistributors />,
        },
      ],
    },
    {
      path: "/",
      element: <RequireAuth allowedRoles={[ROLES.PRODUCTOS]} />,
      children: [
        {
          path: "/Products",
          element: <Products/>,
          errorElement: <Error404 />,
        },
      ],
    },
  ]);




return (
  <RouterProvider router={router} />
);
}

export default App;