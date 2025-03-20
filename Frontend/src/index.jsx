import React from "react";
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import './index.css'
import Sidemenu from './Sidemenu'
import Signin from './Signin'
import { Tenant } from './Tenant/Tenant'
import Lease from './Lease/LeasePage'
import LeaseNotifications from "./Lease/LeaseNotifications";
import Property from "./Property/Property";
import TenantProfile from './Tenant/TenantProfile'
import Homepage from './Homepage/Homepage'
import Maintenance from './Maintenance/Maintenance'
import Dashboard from './Dashboard/Dashboard'
import DashboardSidebar from './Dashboard/DashboardSidebar'
import Accountantlist from './Dashboard/Accountantlist';
import Teanantlist from './Dashboard/Teanantlist';
import Maintainencelist from './Dashboard/Maintainencelist';
import Projectmanager from './Dashboard/Projectmanagerlist';
import RequestForm from "./Maintenance/RequestForm";


const App=()=>{
  const location = useLocation();
  const dashboardPages = [
    "/user/dashboard",
    "/user/Acountantlist",
    "/user/teanantlist",
    "/user/maintainencelist",
    "/user/projectmanagerlist",
  ];
  return(
    <div className='flex'>
        {dashboardPages.includes(location.pathname) ? <DashboardSidebar /> : <Sidemenu />}
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
        path: "leasenotifications",
        element: <LeaseNotifications />,
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
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "accountantlist",   
        element: <Accountantlist />,
      },
      {
        path: "teanantlist",
        element: <Teanantlist />,    
      },
      {
        path: "maintainencelist",
        element: <Maintainencelist />,
      },
      {
        path: "projectmanagerlist",
        element: <Projectmanager />,
      },
      { path: "requestform", 
        element: <RequestForm /> 
      },
      
      
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={Router} />);