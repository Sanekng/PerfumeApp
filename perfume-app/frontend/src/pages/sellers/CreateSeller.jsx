import React, { useState } from 'react';
import { useSellers } from '../../context/SellerContext.jsx';
import { useNavigate } from 'react-router-dom';

const CreateSeller = () => {
    const [formData, setFormData] = useState({ name: '', surname: '', phone: '', email: '' });
    const navigate = useNavigate();
    const { addSeller } = useSellers();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addSeller(formData);
            alert('Seller created successfully!');
            navigate('/sellers');
        } catch (err) {
            alert('Error creating seller');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Имя:</label>
                <input name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
                <label>Фамилия:</label>
                <input name="surname" value={formData.surname} onChange={handleChange} required />
            </div>
            <div>
                <label>Телефон:</label>
                <input name="phone" value={formData.phone} onChange={handleChange} required />
            </div>
            <div>
                <label>Email:</label>
                <input name="email" type="email" value={formData.email} onChange={handleChange} required />
            </div>
            <button type="submit">Создать</button>
            <button type="button" onClick={() => navigate('/sellers')}>Назад</button>
        </form>
    );
};

export default CreateSeller;
