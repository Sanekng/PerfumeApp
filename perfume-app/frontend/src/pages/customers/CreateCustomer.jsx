import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCustomer } from '../../services/customerService.js';

const CreateCustomer = () => {
    const [formData, setFormData] = useState({ name: '', surname: '', phone: '', email: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createCustomer(formData);
            alert('Customer created successfully!');
            navigate('/customers');
        } catch (err) {
            alert('Failed to create customer');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input name="name" value={formData.name} onChange={handleChange} required/>
            </div>
            <div>
                <label>Surname:</label>
                <input name="surname" value={formData.surname} onChange={handleChange} required/>
            </div>
            <div>
                <label>Phone:</label>
                <input name="phone" value={formData.phone} onChange={handleChange} required/>
            </div>
            <div>
                <label>Email:</label>
                <input name="email" type="email" value={formData.email} onChange={handleChange} required/>
            </div>
            <button type="submit">Create Customer</button>
        </form>
    );
};

export default CreateCustomer;
