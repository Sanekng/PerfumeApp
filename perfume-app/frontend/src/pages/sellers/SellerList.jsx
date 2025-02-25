import React from 'react';
import { useSellers } from '../../context/SellerContext.jsx';
import { Link } from 'react-router-dom';

const SellerList = () => {
    const { sellers, loading, error, removeSeller } = useSellers();

    return (
        <div>
            <h2>Sellers List</h2>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {sellers.length === 0 && !loading && !error && <p>No sellers available.</p>}
            {sellers.length > 0 && (
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {sellers.map((seller) => (
                        <tr key={seller._id}>
                            <td>{seller.name}</td>
                            <td>{seller.surname}</td>
                            <td>{seller.phone}</td>
                            <td>{seller.email}</td>
                            <td>
                                <Link to={`/sellers/${seller._id}`}>
                                    <button>View</button>
                                </Link>
                                <Link to={`/sellers/${seller._id}/update`}>
                                    <button>Update</button>
                                </Link>
                                <button onClick={() => removeSeller(seller._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
            <Link to="/sellers/create">
                <button>Add Seller</button>
            </Link>
        </div>
    );
};

export default SellerList;
