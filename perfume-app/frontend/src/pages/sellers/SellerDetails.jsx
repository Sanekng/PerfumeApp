import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {useSellers} from "../../context/SellerContext.jsx";

const SellerDetails = () => {
    const { id } = useParams();
    const [seller, setSeller] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { fetchSellerById } = useSellers();

    useEffect(() => {
        const fetchSeller = async () => {
            try {
                const data = await fetchSellerById(id);
                setSeller(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        void fetchSeller();
    }, [id, fetchSellerById]);


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
