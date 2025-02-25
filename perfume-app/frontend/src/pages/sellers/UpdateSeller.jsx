import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSellers } from '../../context/SellerContext.jsx';
import useForm from '../../hooks/useForm.js';

const UpdateSeller = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Use SellerContext to access seller-related functions and state
    const { editSeller, fetchSellerById, loading, error } = useSellers();

    // Initialize form state
    const { formData, handleChange, setFormData } = useForm({
        name: '',
        surname: '',
        phone: '',
        email: '',
    });

    // Fetch seller data and update form state
    useEffect(() => {
        const fetchSeller = async () => {
            try {
                const seller = await fetchSellerById(id);
                if (seller) {
                    setFormData({
                        name: seller.name || '',
                        surname: seller.surname || '',
                        phone: seller.phone || '',
                        email: seller.email || '',
                    });
                }
            } catch (err) {
                console.error('Failed to fetch seller data:', err);
            }
        };
        void fetchSeller();
    }, [id, fetchSellerById, setFormData]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await editSeller(id, formData);
            alert('Seller updated successfully!');
            navigate('/sellers');
        } catch (err) {
            alert('Failed to update seller');
        }
    };

    // Display loading or error states
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Surname:</label>
                <input
                    name="surname"
                    value={formData.surname}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Phone:</label>
                <input
                    name="phone"
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
            <button type="submit">Update Seller</button>
            <button type="button" onClick={() => navigate('/sellers')}>Cancel</button>
        </form>
    );
};

export default UpdateSeller;