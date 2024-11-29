import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getSellerById, updateSeller } from '../../services/sellerService';

const UpdateSeller = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        phone: '',
        email: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch seller data on component mount
    useEffect(() => {
        const fetchSeller = async () => {
            try {
                const seller = await getSellerById(id);
                setFormData({
                    name: seller.name || '',
                    surname: seller.surname || '',
                    phone: seller.phone || '',
                    email: seller.email || '',
                });
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch seller data');
                setLoading(false);
            }
        };

        void fetchSeller();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await updateSeller(id, formData);
            alert('Seller updated successfully!');
            navigate('/');
        } catch (err) {
            console.error('Error updating seller:', err);
            alert('Error updating seller');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Имя:</label>
                <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Фамилия:</label>
                <input
                    name="surname"
                    value={formData.surname}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Телефон:</label>
                <input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit">Подтвердить</button>
            <Link to="/sellers">
                <button type="button">Назад</button>
            </Link>
        </form>
    );
};

export default UpdateSeller;
