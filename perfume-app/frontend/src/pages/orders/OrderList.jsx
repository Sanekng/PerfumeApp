import { getOrders } from '../../services/orderService.js';
import {Link, useNavigate} from 'react-router-dom';
import useFetch from "../../hooks/useFetch.js";
import Table from "../../components/common/Table.jsx";
import detailsIcon from "../../assets/details.png"
import '../../styles/common.css';

const OrderList = () => {
    const {data: orders, loading, error} = useFetch(getOrders);
    let navigate = useNavigate();



    const columns = [
        { key: 'perfume.name', header: 'Perfume' },
        { key: 'quantity', header: 'Quantity' },
        { key: 'customer.fullName', header: 'Customer' },
    ];


    const actions = [
        {
            label: 'View',
            icon: detailsIcon,
            className: 'view',
            handler: (orders) => {
                // Navigate to orders details
                navigate(`/orders/${orders._id}`)

            },
        },
    ];

    return (
        <div>
            <h2>Orders</h2>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && orders.length === 0 && <p>There are no orders at the moment.</p>}
            {!loading && !error && orders.length > 0 && (
                <Table data={orders} columns={columns} actions={actions}/>
            )}
            <button className='addNewButton'>
                <Link to="/orders/create">Add Order</Link>
            </button>
        </div>
    );
};

export default OrderList;
