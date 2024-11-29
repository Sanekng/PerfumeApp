import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getPerfumeById, updatePerfume } from '../../services/perfumeService';
import { getSellers } from '../../services/sellerService';

const UpdatePerfume = () => {
    const { id } = useParams();
    const navigate = useNavigate();

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

    // Fetch the perfume and seller data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [perfumeData, sellersData] = await Promise.all([
                    getPerfumeById(id),
                    getSellers(),
                ]);
                setFormData({
                    name: perfumeData.name || '',
                    price: perfumeData.price || '',
                    quantity: perfumeData.quantity || '',
                    description: perfumeData.description || '',
                    image: perfumeData.image || '',
                    sellerId: perfumeData.seller?._id || '',
                });
                setSellers(sellersData);
            } catch (err) {
                setError('Failed to fetch perfume or seller data');
            } finally {
                setLoading(false);
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
            await updatePerfume(id, formData);
            alert('Perfume updated successfully!');
            navigate('/');
        } catch (err) {
            console.error('Error submitting update:', err);
            alert('Error updating perfume');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Название:</label>
                <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Цена:</label>
                <input
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Количество:</label>
                <input
                    name="quantity"
                    type="number"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Описание:</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                ></textarea>
            </div>
            <div>
                <label>Картинка:</label>
                <input
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Продавец:</label>
                <select
                    name="sellerId"
                    value={formData.sellerId}
                    onChange={handleChange}
                    required
                >
                    <option value="">Выберите продавца</option>
                    {sellers.map((seller) => (
                        <option key={seller._id} value={seller._id}>
                            {seller.name} {seller.surname}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit">Подтвердить</button>
            <Link to="/">
                <button type="button">Назад</button>
            </Link>
        </form>
    );
};

export default UpdatePerfume;
