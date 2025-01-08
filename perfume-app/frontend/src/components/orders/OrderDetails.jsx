import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getOrderById } from '../../services/orderService';

const OrderDetails = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const data = await getOrderById(id);
                setOrder(data);
            } catch (err) {
                setError('Failed to fetch order details');
            }
        };
        void fetchOrder();
    }, [id]);

    if (error) return <p>{error}</p>;
    if (!order) return <p>Loading...</p>;

    return (
        <div>
            <h2>Order Details</h2>
            <p>{`Perfume: ${order.perfume.name}`}</p>
            <p>{`Quantity: ${order.quantity}`}</p>
            <p>{`Customer: ${order.customer.name} ${order.customer.surname}`}</p>
            <p>{`Order Date: ${new Date(order.orderDate).toLocaleString()}`}</p>
            <Link to="/orders">Back to Orders</Link>
        </div>
    );
};

export default OrderDetails;
