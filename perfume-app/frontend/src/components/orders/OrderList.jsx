import React, { useState, useEffect } from 'react';
import { getOrders } from '../../services/orderService';
import { Link } from 'react-router-dom';

const OrderList = () => {
    const [orders, setOrders] = useState([]); // Initialize as an empty array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getOrders();
                setOrders(data);// Use response directly if it's an array
                setLoading(false);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        void fetchOrders();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Orders</h2>
            <ul>
                {[orders].map((order) =>
                    <li key={order._id}>
                        <Link to={`/orders/${order._id}`}>
                            {`Order ID: ${order._id} - ${order.quantity || 0} x ${order.perfume?.name || 'Unknown Perfume'}`}
                        </Link>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default OrderList;
