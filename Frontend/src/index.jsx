import React from "react";
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import './index.css'
import Sidemenu from './Sidemenu'
import Signin from './Signin'
import { Tenant } from './Tenant/Tenant'
import Lease from './Lease/LeaseManagement'
import Property from "./Property/Property";
import TenantProfile from './Tenant/TenantProfile'
import Homepage from './Homepage/Homepage'
import Maintenance from './Maintenance/Maintenance'
import RequestForm from "./Maintenance/RequestForm";


const App=()=>{
  return(
    <div className='flex'>
      <Sidemenu/>
      <Outlet />
    </div>
  )
}

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />, 
  },
 
  {
    path: "/signin",
    element: <Signin />, 
  },
  {
    path: "/user",
    element: <App />,
    children: [
      
      {
        path: "lease",
        element: <Lease />,
      },
      
      {
        path: "tenant",
        element: <Tenant />,
      },
      {
         path:"tenantProfile",
         element:<TenantProfile/>
      },
      {
        path: "property",
        element: <Property />,
      },
      {
        path: "maintenance",
        element: <Maintenance />,
      },
      { path: "requestform", 
        element: <RequestForm /> 
      },
      
      
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={Router} />);