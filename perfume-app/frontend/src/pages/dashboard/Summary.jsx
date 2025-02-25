import React from 'react';
import useFetch from "../../hooks/useFetch.js";
import {viewSummary} from "../../services/dashboardService.js";
import '../../styles/components/Summary.css';
import {Link} from "react-router-dom";

const Summary = () => {
    const { data, loading, error } = useFetch(viewSummary);

    if (loading) return <p>Loading dashboard...</p>;
    if (error) return <p>Error: {error}</p>;

    const formatCurrency = (value) => new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(value);

    return (
        <div className="summary-container">
            <h1>Dashboard Summary</h1>
            <div className="stats-grid">
                <div className="stat-card listing-summary cell4">
                    <h2>Recent Orders</h2>
                    <ul>
                        {data.recentOrders.map((order, index) => (
                            <li key={index}>
                                <Link to={`/orders?highlightId=${order._id}`}>
                                    {order.perfume.name}: {order.quantity === 0 ? "0x" : order.quantity + "x"} by {order.customer.fullName} - {order.orderDate.substring(0, 10)}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="stat-card listing-summary cell5">
                    <h2>Low Stock Perfumes</h2>
                    {data.lowStockPerfumes.length === 0 ? (
                        <p>All stocks are alright</p>
                    ) : (
                        <ul>
                            {data.lowStockPerfumes.map((perfume, index) => (
                                <li key={index}>{perfume.name} - {perfume.stock} left</li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="stat-card cell2">
                    <h2>Total Orders</h2>
                    <p>{data.totalOrders}</p>
                </div>
                <div className="stat-card cell3">
                    <h2>Total Customers</h2>
                    <p>{data.totalCustomers}</p>
                </div>
                <div className="stat-card cell1">
                    <h2>Total Sales</h2>
                    <p>{formatCurrency(data.totalSales)}</p>
                </div>
            </div>
        </div>
    );
};

export default Summary;
