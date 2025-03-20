import ReactDOM from 'react-dom/client'
import {createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import './index.css'
import Sidemenu from './Sidemenu'
import Signin from './Signin'
import { Tenant } from './Tenant/Tenant'
import Lease from './Lease/LeaseManagement'
import Property from './Property/Property'
import TenantProfile from './Tenant/TenantProfile'
import Homepage from './Homepage/Homepage'
import Maintenance from './Maintenance/Maintenance'
import TenantBoarding from './Tenant/TenantBoarding'

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
    element: <Signin />, 
  },
  {
    path: "/user",
    element: <App />,
    children: [
      {
        index: true, 
        element: <Homepage />, 
      },
      {
        path: "lease",
        element: <Lease />,
      },
      {
        path: "tenant",
        element: <Tenant />,
      },{
         path:"tenantProfile",
         element:<TenantProfile/>
      },
      {
        path:"tenantBoarding",
        element:<TenantBoarding/>
     },
      {
        path: "property",
        element: <Property />,
      },
      {
        path: "maintenance",
        element: <Maintenance />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={Router} />);