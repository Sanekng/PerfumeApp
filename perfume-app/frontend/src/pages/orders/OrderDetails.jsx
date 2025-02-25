import React, { useState } from 'react';
import {useParams, Link, useNavigate} from 'react-router-dom';
import { getOrderById, deleteOrder } from '../../services/orderService.js';
import useFetch from "../../hooks/useFetch.js";
import useDelete from "../../hooks/useDelete.js";

const OrderDetails = () => {
    const { id } = useParams();
    let navigate = useNavigate();
    const { data: order, loading: fetchLoading, error: fetchError } = useFetch(getOrderById, id);
    const { handleDelete, loading: deleteLoading } = useDelete(deleteOrder);

    const [localOrder, setLocalOrder] = useState(order);

    // Update localOrder when the fetched order data changes
    React.useEffect(() => {
        setLocalOrder(order);
    }, [order]);

    const handleDeleteSuccess = (id) => {
        // Optimistically remove the customer from the local state
        setLocalOrder(null);
        navigate('/orders'); // Redirect to the customers list
    };

    const handleDeleteError = (id) => {
        // Revert the optimistic update by resetting the local state
        setLocalOrder(order);
        alert('Failed to delete customer');
    };


    if (fetchError) return <p>{fetchError}</p>;
    if (!localOrder) return <p>Loading...</p>;
    if (fetchLoading) return <p>Loading order details...</p>;


    return (
        <div>
            <h2>Order Details</h2>
            <p>{`Perfume: ${order.perfume.name}`}</p>
            <p>{`Quantity: ${order.quantity}`}</p>
            <p>{`Customer: ${order.customer.name} ${order.customer.surname}`}</p>
            <p>{`Order Date: ${new Date(order.orderDate).toLocaleString()}`}</p>
            <button><Link to="/orders">Back to Orders</Link></button>
            <button
                onClick={() => handleDelete(localOrder._id, handleDeleteSuccess, handleDeleteError)}
                disabled={deleteLoading}
            >{deleteLoading ? 'Deleting...' : 'Delete'}
            </button>
            <button><Link to={`/orders/${order._id}/update`}>Update Order</Link></button>
        </div>
    );
};

export default OrderDetails;
