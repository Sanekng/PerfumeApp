import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSellerById } from '../../services/sellerService';

const SellerDetails = () => {
    const { id } = useParams();
    const [seller, setSeller] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSeller = async () => {
            console.log(`Fetching details for seller with ID: ${id}`);
            try {
                const data = await getSellerById(id);
                console.log('Seller fetched successfully:', data);
                setSeller(data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching seller details:', err);
                setError(err.message);
                setLoading(false);
            }
        };

        void fetchSeller();
    }, [id]); // Re-fetch only when the ID changes

    if (loading) return <p>Loading seller details...</p>;
    if (error) return <p>Error fetching seller details: {error}</p>;

    return (
        <div>
            <h2>Seller Details</h2>
            {seller ? (
                <table>
                    <thead>
                    <tr>
                        <th>Имя</th>
                        <th>Фамилия</th>
                        <th>Email</th>
                        <th>Телефон</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{seller.name}</td>
                        <td>{seller.surname}</td>
                        <td>{seller.email}</td>
                        <td>{seller.phone}</td>
                    </tr>
                    </tbody>
                </table>
            ) : (
                <p>Seller not found</p>
            )}
            <Link to="/sellers">
                <button>Назад</button>
            </Link>
            <Link to={`/sellers/${seller._id}/update`}>
                <button>Изменить</button>
            </Link>
        </div>
    );
};

export default SellerDetails;
