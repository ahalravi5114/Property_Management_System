import ReactDOM from 'react-dom/client'
import {createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import './index.css'
import Sidemenu from './Sidemenu'
import Login from './Login'
import { Tenant } from './Tenant/Tenant'
import Lease from './Lease/Lease'
import Property from './Property/Property'

const App=()=>{
  return(
    <div className='flex'>
      <Sidemenu/>
      <Outlet/>
    </div>
  )
}

const Router = createBrowserRouter([
  {
      path: "/",
      element: <Login />, 
  },
  {
      path: "/Lease",
      element: <App />, 
      children: [
          {
              path: "", 
              element: <Lease />,
          },
        
      ],
  },{
    path: "/Tenant",
    element: <App />, 
    children: [
        {
            path: "", 
            element: <Tenant />,
        },
      
    ],
  },{
    path: "/Property",
    element: <App />, 
    children: [
        {
            path: "", 
            element: <Property />,
        },
      
    ],
  }
]);


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={Router} />);