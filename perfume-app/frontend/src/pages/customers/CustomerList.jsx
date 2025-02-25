import { Link, useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch.js';
import { getCustomers } from '../../services/customerService.js';
import Table from "../../components/common/Table.jsx";
import detailsIcon from "../../assets/details.png";
import '../../styles/common.css';

const CustomerList = () => {
    const { data: customers, loading, error } = useFetch(getCustomers);
    let navigate = useNavigate();

    const columns = [
        { key: 'name', header: 'Name' },
        { key: 'surname', header: 'Surname' },
        { key: 'email', header: 'Email' },
        { key: 'phone', header: 'Phone' },
    ];

    const actions = [
        {
            label: 'View',
            icon: detailsIcon,
            className: 'view',
            handler: (customer) => {
                // Navigate to customer details
                navigate(`/customers/${customer._id}`)

            },
        },
    ];

    return (
        <div>
            <h2>Customers</h2>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && customers.length === 0 && <p>There are no customers at the moment.</p>}
            {!loading && !error && customers.length > 0 && (
                <Table data={customers} columns={columns} actions={actions}/>
            )}
            <button className="addNewButton">
                <Link to="/customers/create">Add Customer</Link>
            </button>
        </div>
    );
};

export default CustomerList;