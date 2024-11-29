import React, { useState, useEffect } from 'react';
import { createPerfume } from '../../services/perfumeService';
import { getSellers } from "../../services/sellerService.js";
import {Link, useNavigate} from "react-router-dom";

const CreatePerfume = () => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        quantity: '',
        description: '',
        image: '',
        sellerId: '',
    });
    const [sellers, setSellers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Fetch sellers on component mount
    useEffect(() => {
        const fetchSellers = async () => {
            try {
                const data = await getSellers();
                setSellers(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch sellers');
                setLoading(false);
            }
        };
        void fetchSellers();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createPerfume(formData);
            alert('Perfume created successfully!');
            navigate('/');
        } catch (err) {
            console.error('Error creating perfume:', err);
            alert('Error creating perfume');
        }
    };

    if (loading) return <p>Loading sellers...</p>;
    if (error) return <p>{error}</p>;

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Название</label>
                <input name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
                <label>Цена:</label>
                <input name="price" type="number" value={formData.price} onChange={handleChange} required />
            </div>
            <div>
                <label>Количество:</label>
                <input name="quantity" type="number" value={formData.quantity} onChange={handleChange} required />
            </div>
            <div>
                <label>Описание:</label>
                <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
            </div>
            <div>
                <label>Картинка:</label>
                <input name="image" value={formData.image} onChange={handleChange} />
            </div>
            <div>
                <label>Продавец:</label>
                <select name="sellerId" value={formData.sellerId} onChange={handleChange} required>
                    <option value="">Select a seller</option>
                    {sellers.map((seller) => (
                        <option key={seller._id} value={seller._id}>
                            {seller.name} {seller.surname}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit">Подтвердить</button>
            <Link to="/">
                <button>Назад</button>
            </Link>
        </form>
    );
};

export default CreatePerfume;
