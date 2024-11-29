import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {PerfumeList, PerfumeDetails, CreatePerfume, UpdatePerfume} from './components/perfumes/index.js';
import {SellerList, SellerDetails, CreateSeller, UpdateSeller} from './components/sellers/index.js';

function App() {
    return (
        <Router>
            <Routes>
                {/*perfume routes*/}
                <Route path="/" element={<PerfumeList />} />
                <Route path="/perfumes/:id" element={<PerfumeDetails />} />
                <Route path="/perfumes/create" element={<CreatePerfume />} />
                <Route path="/perfumes/:id/update" element={<UpdatePerfume />} />

                {/*seller routes*/}
                <Route path="/sellers" element={<SellerList />} />
                <Route path="/sellers/:id" element={<SellerDetails />} />
                <Route path="/sellers/create" element={<CreateSeller />} />
                <Route path="/sellers/:id/update" element={<UpdateSeller />} />

                {/*/!*order routes*!/*/}
                {/*<Route path="/orders" element={<OrderList />} />*/}
                {/*<Route path="/orders/:id" element={<OrderDetails />} />*/}
                {/*<Route path="/orders/create" element={<CreateOrder />} />*/}
                {/*<Route path="/orders/:id/update" element={<UpdateOrder />} />*/}

                {/*/!*customer routes*!/*/}
                {/*<Route path="/customers" element={<CustomerList />} />*/}
                {/*<Route path="/customers/:id" element={<CustomerDetails />} />*/}
                {/*<Route path="/customers/create" element={<CreateCustomer />} />*/}
                {/*<Route path="/customers/:id/update" element={<UpdateCustomer />} />*/}

                {/*/!*notification routes*!/*/}
                {/*<Route path="/notifications" element={<NotificationList />} />*/}
                {/*<Route path="/notifications/:id" element={<NotificationDetails />} />*/}
                {/*<Route path="/notifications/create" element={<CreateNotification />} />*/}
                {/*<Route path="/notifications/:id/update" element={<UpdateNotification />} />*/}
            </Routes>
        </Router>
    );
}

export default App;
