import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCustomerById, updateCustomer } from '../../services/customerService';

const UpdateCustomer = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ name: '', surname: '', email: '' });
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const data = await getCustomerById(id);
                setFormData({ name: data.name, surname: data.surname, email: data.email });
            } catch (err) {
                setError('Failed to fetch customer details');
            }
        };
        void fetchCustomer();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateCustomer(id, formData);
            alert('Customer updated successfully!');
            navigate('/customers');
        } catch (err) {
            alert('Failed to update customer');
        }
    };

    if (error) return <p>{error}</p>;

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
                <label>Surname:</label>
                <input name="surname" value={formData.surname} onChange={handleChange} required />
            </div>
            <div>
                <label>Email:</label>
                <input name="email" type="email" value={formData.email} onChange={handleChange} required />
            </div>
            <button type="submit">Update Customer</button>
        </form>
    );
};

export default UpdateCustomer;
