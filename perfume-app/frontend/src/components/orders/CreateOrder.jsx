import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../../services/orderService';
import { getPerfumes } from '../../services/perfumeService';
import { getCustomers } from '../../services/customerService';
import { Link } from 'react-router-dom';

const CreateOrder = () => {
    const [formData, setFormData] = useState({ perfume: '', quantity: '', customer: '' });
    const [perfumes, setPerfumes] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [perfumeData, customerData] = await Promise.all([getPerfumes(), getCustomers()]);
                setPerfumes(perfumeData);
                setCustomers(customerData);
            } catch (err) {
                setError('Failed to load perfumes or customers');
            }
        };
        void fetchData();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createOrder(formData);
            alert('Order created successfully!');
            navigate('/orders');
        } catch (err) {
            alert('Failed to create order');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Perfume:</label>
                <select name="perfume" value={formData.perfume} onChange={handleChange} required>
                    <option value="">Select a perfume</option>
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
                    <option value="">Select a customer</option>
                    {customers.map((customer) => (
                        <option key={customer._id} value={customer._id}>
                            {customer.name} {customer.surname}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit">Create Order</button>
        </form>
    );
};

export default CreateOrder;
