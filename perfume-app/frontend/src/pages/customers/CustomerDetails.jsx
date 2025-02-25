import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { deleteCustomer, getCustomerById } from '../../services/customerService.js';
import useFetch from '../../hooks/useFetch.js';
import useDelete from '../../hooks/useDelete.js';

const CustomerDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: customer, loading: fetchLoading, error: fetchError } = useFetch(getCustomerById, id);
    const { handleDelete, loading: deleteLoading} = useDelete(deleteCustomer);

    const [localCustomer, setLocalCustomer] = useState(customer);

    // Update localCustomer when the fetched customer data changes
    React.useEffect(() => {
        setLocalCustomer(customer);
    }, [customer]);

    const handleDeleteSuccess = (id) => {
        // Optimistically remove the customer from the local state
        setLocalCustomer(null);
        navigate('/customers'); // Redirect to the customers list
    };

    const handleDeleteError = (id) => {
        // Revert the optimistic update by resetting the local state
        setLocalCustomer(customer);
        alert('Failed to delete customer');
    };

    if (fetchError) return <p>{fetchError}</p>;
    if (!localCustomer) return <p>Loading...</p>;
    if (fetchLoading) return <p>Loading customer details...</p>;

    return (
        <div>
            <h2>Customer Details</h2>
            <p>{`Name: ${localCustomer.name}`}</p>
            <p>{`Surname: ${localCustomer.surname}`}</p>
            <p>{`Email: ${localCustomer.email}`}</p>
            <p>{`Phone: ${localCustomer.phone}`}</p>
            <button>
                <Link to="/customers">Back to Customers</Link>
            </button>
            <button
                onClick={() => handleDelete(localCustomer._id, handleDeleteSuccess, handleDeleteError)}
                disabled={deleteLoading}
            >
                {deleteLoading ? 'Deleting...' : 'Удалить'}
            </button>
            <button>
                <Link to={`/customers/${localCustomer._id}/update`}>Изменить</Link>
            </button>
        </div>
    );
};

export default CustomerDetails;