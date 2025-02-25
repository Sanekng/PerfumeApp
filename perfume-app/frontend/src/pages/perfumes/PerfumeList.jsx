import { getPerfumes, deletePerfume } from '../../services/perfumeService.js';
import { Link, useNavigate } from 'react-router-dom';
import useFetch from "../../hooks/useFetch.js";
import detailsIcon from '../../assets/details.png';
import Table from "../../components/common/Table.jsx";
import "../../styles/common.css"

const PerfumeList = () => {
    const {data: perfumes, loading, error} = useFetch(getPerfumes);
    let navigate = useNavigate();

    const handleDelete = async (id) => {
        try {
            const response = await deletePerfume(id);
            alert(response.message);
            setPerfumes(perfumes.filter(perfume => perfume._id !== id)); // Remove from state
        } catch (err) {
            alert(err.response?.data?.message || err.message || "Error Deleting Perfume");
        }
    };

    const columns = [
        {key: "name", header: "Name"},
        {key: "price", header: "Price"},
        {key: "quantity", header: "Quantity"},
    ]

    const actions = [
        {
            label: 'View',
            icon: detailsIcon,
            className: 'view',
            handler: (perfume) => {
                // Navigate to perfume details
                navigate(`/perfumes/${perfume._id}`)

            },
        },
    ];

    return (
        <div>
            <h2>Perfume List</h2>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && perfumes.length === 0 && <p>There are no perfumes at the moment.</p>}
            {!loading && !error && perfumes.length > 0 && (
            <Table data={perfumes} columns={columns} actions={actions}/>
                )}
            <button className="addNewButton">
                <Link to="/perfumes/create">Add Perfume</Link>
            </button>
        </div>
    );
};

export default PerfumeList;
