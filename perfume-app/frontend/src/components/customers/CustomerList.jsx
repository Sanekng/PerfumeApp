import React, { useState, useEffect } from 'react';
import { getCustomers } from '../../services/customerService';
import { Link } from 'react-router-dom';

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const data = await getCustomers();
                setCustomers(data);
            } catch (err) {
                console.error('Error details:', err); // Capture full error
                setError('Failed to fetch customers');
            }
        };
        void fetchCustomers();
    }, []);


    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Customers</h2>
            <ul>
                {[customers].map((customer) => (
                    <li key={customer._id}>
                        <Link to={`/customers/${customer._id}`}>{`${customer.name} ${customer.surname}`}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CustomerList;
