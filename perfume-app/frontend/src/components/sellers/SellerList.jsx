import React, { useEffect, useState } from 'react';
import {getSellers, deleteSeller} from '../../services/sellerService';
import { Link } from 'react-router-dom';

const SellerList = () => {
    const [sellers, setSellers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch perfumes when the component mounts
        const fetchSellers = async () => {
            try {
                const data = await getSellers();
                setSellers(data); // API response has "data" field containing the perfumes array
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        void fetchSellers();
    }, []); // Empty dependency array means it runs only on mount

    const handleDelete = async (id) => {
        try {
            const response = await deleteSeller(id);
            alert(response.message);
            setSellers(sellers.filter(seller => seller._id !== id)); // Remove the deleted seller from the state
        } catch (err) {
            alert('Failed to delete seller');
            console.error(err);
        }
    };

    if (loading) return <p>Loading sellers...</p>;
    if (error) return <p>Error fetching sellers: {error}</p>;

    return (
        <div>
            <h2>Sellers List</h2>
            <table>
                <thead>
                <tr>
                    <th>Имя</th>
                    <th>Фамилия</th>
                    <th>Телефон</th>
                    <th>Номер</th>
                </tr>
                </thead>
                <tbody>
                {sellers.map((seller) => (
                    <tr key={seller._id}>
                        <td>{seller.name}</td>
                        <td>{seller.surname}</td>
                        <td>{seller.email}</td>
                        <td>{seller.phone}</td>
                        <td>
                            <Link to={`/sellers/${seller._id}`}>
                                <button>Больше деталей</button>
                            </Link>
                        </td>
                        <td>
                            <Link to={`/sellers/${seller._id}/update`}>
                                <button>Изменить</button>
                            </Link>
                        </td>
                        <td>
                            <button onClick={() => handleDelete(seller._id)}>Удалить</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Link to="/sellers/create">
                <button>Создать новый</button>
            </Link>
            <Link to="/">
                <button>Парфюмы</button>
            </Link>
        </div>
    );
};

export default SellerList;
