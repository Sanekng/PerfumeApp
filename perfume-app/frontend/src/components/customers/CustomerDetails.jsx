import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCustomerById } from '../../services/customerService';

const CustomerDetails = () => {
    const { id } = useParams();
    const [customer, setCustomer] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const data = await getCustomerById(id);
                setCustomer(data);
            } catch (err) {
                setError('Failed to fetch customer details');
            }
        };
        void fetchCustomer();
    }, [id]);

    if (error) return <p>{error}</p>;
    if (!customer) return <p>Loading...</p>;

    return (
        <div>
            <h2>Customer Details</h2>
            <p>{`Name: ${customer.name}`}</p>
            <p>{`Surname: ${customer.surname}`}</p>
            <p>{`Email: ${customer.email}`}</p>
            <Link to="/customers">Back to Customers</Link>
        </div>
    );
};

export default CustomerDetails;
