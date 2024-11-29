import React, { useEffect, useState } from 'react';
import { getPerfumes, deletePerfume } from '../../services/perfumeService';
import { Link } from 'react-router-dom';

const PerfumeList = () => {
    const [perfumes, setPerfumes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch perfumes when the component mounts
        const fetchPerfumes = async () => {
            try {
                const data = await getPerfumes();
                setPerfumes(data.data); // API response has "data" field containing the perfumes array
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        void fetchPerfumes();
    }, []); // Empty dependency array means it runs only on mount

    const handleDelete = async (id) => {
        try {
            const response = await deletePerfume(id);
            alert(response.message);
            setPerfumes(perfumes.filter(perfume => perfume._id !== id)); // Remove the deleted perfume from the state
        } catch (err) {
            alert('Failed to delete perfume');
            console.error(err);
        }
    };

    if (loading) return <p>Loading perfumes...</p>;
    if (error) return <p>Error fetching perfumes: {error}</p>;

    return (
        <div>
            <h2>Perfume List</h2>
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
                {perfumes.map((perfume) => (
                    <tr key={perfume._id}>
                        <td>{perfume.name}</td>
                        <td>{perfume.price}</td>
                        <td>{perfume.quantity}</td>
                        <td>{perfume.seller.name} {perfume.seller.surname}</td>
                        <td>
                            <Link to={`/perfumes/${perfume._id}`}>
                                <button>Больше деталей</button>
                            </Link>
                        </td>
                        <td>
                            <Link to={`/perfumes/${perfume._id}/update`}>
                                <button>Изменить</button>
                            </Link>
                        </td>
                        <td>
                            <button onClick={() => handleDelete(perfume._id)}>Удалить</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Link to="/perfumes/create">
                <button>Создать новый</button>
            </Link>
            <Link to={"/sellers"}>
                <button>Продавцы</button>
            </Link>
        </div>
);
};

export default PerfumeList;
