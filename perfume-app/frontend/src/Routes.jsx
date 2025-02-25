import {PerfumeList, PerfumeDetails, CreatePerfume, UpdatePerfume} from './pages/perfumes/index.js';
import {SellerList, SellerDetails, CreateSeller, UpdateSeller} from './pages/sellers/index.js';
import {OrderList, OrderDetails, CreateOrder, UpdateOrder} from './pages/orders/index.js';
import {CustomerList, CustomerDetails, CreateCustomer, UpdateCustomer} from './pages/customers/index.js';
import {NotificationList, NotificationDetails, CreateNotification, UpdateNotification} from './pages/notifications/index.js';
import {Summary, Insights, Analytics, Inventory, Activities, Actions} from "./pages/dashboard/index.js";
import {Navigate} from "react-router-dom";

const routes = [
    {path: "*", element:  <Navigate to="/dashboard/summary" replace />},
    {path: "/dashboard/summary", element: <Summary />},
    {path: "/dashboard/insights", element: <Insights />},
    {path: "/dashboard/analytics", element: <Analytics />},
    {path: "/dashboard/inventory", element: <Inventory />},
    {path: "/dashboard/activities", element: <Activities />},
    {path: "/dashboard/actions", element: <Actions />},
    {path: "/perfumes", element: <PerfumeList />},
    {path: "/perfumes/:id", element: <PerfumeDetails />},
    {path: "/perfumes/create", element: <CreatePerfume />},
    {path: "/perfumes/:id/update", element: <UpdatePerfume />},
    {path: "/sellers", element: <SellerList />},
    {path: "/sellers/:id", element: <SellerDetails />},
    {path: "/sellers/create", element: <CreateSeller />},
    {path: "/sellers/:id/update", element: <UpdateSeller />},
    {path: "/orders", element: <OrderList />},
    {path: "/orders/:id", element: <OrderDetails />},
    {path: "/orders/create", element: <CreateOrder />},
    {path: "/orders/:id/update", element: <UpdateOrder />},
    {path: "/customers", element: <CustomerList />},
    {path: "/customers/:id", element: <CustomerDetails />},
    {path: "/customers/create", element: <CreateCustomer />},
    {path: "/customers/:id/update", element: <UpdateCustomer />},
    {path: "/notifications", element: <NotificationList />},
    {path: "/notifications/:id", element: <NotificationDetails />},
    {path: "/notifications/create", element: <CreateNotification />},
    {path: "/notifications/:id/update", element: <UpdateNotification />},
]

export default routes;