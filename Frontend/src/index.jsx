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
import TenantBoarding from './Tenant/TenantBoarding'
import Dashboard from './Dashboard/Dashboard'
import DashboardSidebar from './Dashboard/DashboardSidebar'
import Accountantlist from './Dashboard/Accountantlist';
import Teanantlist from './Dashboard/Teanantlist';
import Maintainencelist from './Dashboard/Maintainencelist';
import Projectmanager from './Dashboard/Projectmanagerlist';
import RequestForm from "./Maintenance/RequestForm";
import Payment from "./Payment/Payment";
import TenantSidebar from "./Tenant/TenantSidebar";
import TenantDashboard from './Tenant/TenantDashboard';
import TenanteditProfile from './Tenant/TenanteditProfile';
import TenantOffboarding from './Tenant/TenantOffboarding';
import TenantAdmin from './Tenant/TenantAdmin';

const App=()=>{
  const location = useLocation();
  const dashboardPages = [
    "/user/dashboard",
    "/user/Acountantlist",
    "/user/tenantlist",
    "/user/maintainencelist",
    "/user/projectmanagerlist",
    "/user/tenantAdmin",
    "/user/tenantBoarding",
  ];

  const tenantPages = [
    "/user/tenantProfile",
    "/user/tenantdashboard",
    "/user/tenanteditProfile",
    "/user/tenantOffboarding",
  ];

  return(
    <div className='flex'>
        {dashboardPages.includes(location.pathname) && <DashboardSidebar />}
        {tenantPages.includes(location.pathname) && <TenantSidebar />}
        {!dashboardPages.includes(location.pathname) &&
        !tenantPages.includes(location.pathname) && <Sidemenu />}
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
  { path: "requestform", 
    element: <RequestForm /> 
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
        path:"tenantBoarding",
        element:<TenantBoarding/>
     },
     {
        path :"tenantDashboard",
        element:<TenantDashboard/>
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
        path: "tenantlist",
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
      {
        path: "payment",
        element: <Payment />,
      },
      {  path: "tenanteditProfile",
        element: <TenanteditProfile />,
      },
      {
        path:"tenantOffboarding",
        element:<TenantOffboarding/>
     },
     {
      path:"tenantAdmin",
      element:<TenantAdmin/>
     }
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={Router} />);