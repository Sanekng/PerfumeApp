import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOrderById, updateOrder } from '../../services/orderService';
import { getPerfumes } from '../../services/perfumeService';
import { getCustomers } from '../../services/customerService';

const UpdateOrder = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ perfume: '', quantity: '', customer: '' });
    const [perfumes, setPerfumes] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [orderData, perfumeData, customerData] = await Promise.all([
                    getOrderById(id),
                    getPerfumes(),
                    getCustomers(),
                ]);
                setFormData({
                    perfume: orderData.perfume._id,
                    quantity: orderData.quantity,
                    customer: orderData.customer._id,
                });
                setPerfumes(perfumeData);
                setCustomers(customerData);
            } catch (err) {
                setError('Failed to fetch data');
            }
        };
        void fetchData();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateOrder(id, formData);
            alert('Order updated successfully!');
            navigate('/orders');
        } catch (err) {
            alert('Failed to update order');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Perfume:</label>
                <select name="perfume" value={formData.perfume} onChange={handleChange} required>
                    {perfumes.map((perfume) => (
                        <option key={perfume._id} value={perfume._id}>
                            {perfume.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Quantity:</label>
                <input name="quantity" type="number" value={formData.quantity} onChange={handleChange} required />
            </div>
            <div>
                <label>Customer:</label>
                <select name="customer" value={formData.customer} onChange={handleChange} required>
                    {customers.map((customer) => (
                        <option key={customer._id} value={customer._id}>
                            {customer.name} {customer.surname}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit">Update Order</button>
        </form>
    );
};

export default UpdateOrder;
