import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {getPerfumeById} from '../../services/perfumeService.js';
import { Link } from 'react-router-dom';

const PerfumeDetails = () => {
    const { id } = useParams();
    const [perfume, setPerfume] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPerfume = async () => {
            try {
                const data = await getPerfumeById(id);
                setPerfume(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        void fetchPerfume();
    }, [id]);
    // Only re-fetch when the id changes

    if (loading) return <p>Loading perfume details...</p>;
    if (error) return <p>Error fetching perfume details: {error}</p>;

    return (
        <div>
            <h2>Perfume Details</h2>
            {perfume ? (
                <table>
                    <thead>
                    <tr>
                        <th>Название</th>
                        <th>Цена</th>
                        <th>Количество</th>
                        <th>Продавец</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr key={perfume._id}>
                        <td>{perfume.name}</td>
                        <td>{perfume.price}</td>
                        <td>{perfume.quantity}</td>
                        <td>{perfume.seller.name} {perfume.seller.surname}</td>
                        <td>
                            <img src={perfume.image} alt="Check Internet Connection"/>
                        </td>
                    </tr>
                    </tbody>
                </table>
            ) : (
                <p>Perfume not found</p>
            )}
            <Link to="/perfumes">
                <button>Назад</button>
            </Link>
            <Link to={`/perfumes/${perfume._id}/update`}>
                <button>Изменить</button>
            </Link>
        </div>
    );
};

export default PerfumeDetails;
