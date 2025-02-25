import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../styles/components/Sidebar.css';

const Sidebar = () => {
    const location = useLocation().pathname;
    let navigate = useNavigate();

    const options = {
        "/dashboard": [
            { name: "Summary", link: "/dashboard/summary" },
            { name: "Recent Activities", link: "/dashboard/activities" },
            { name: "Quick Actions", link: "/dashboard/actions" },
            { name: "Sales and Order Analytics", link: "/dashboard/analytics" },
            { name: "Inventory Overview", link: "/dashboard/inventory" },
            { name: "Customer Insights", link: "/dashboard/insights" },
        ],
        "/perfumes": [{ name: "Add Perfume", link: "/perfumes/create" }],
        "/customers": [
            { name: "Add Customer", link: "/customers/create" },
            { name: "View Reports", link: "/customers/reports" }
        ],
        "/orders": [
            { name: "Add Order", link: "/orders/create" },
            { name: "Track Orders", link: "/orders" }
        ],
        "/notifications": [
            { name: "Send Notification", link: "/notifications/create" },
            { name: "View Sent Notifications", link: "/notifications" }
        ],
        "/sellers": [
            { name: "Add Seller", link: "/sellers/create" },
            { name: "View Performance", link: "/sellers/performance" }
        ]
    };

    // Find the first matching key where location starts with the base path
    const currentSection = Object.keys(options).find(key => location.startsWith(key));

    // Get menu options for the matched section, defaulting to an empty array
    const menuOptions = currentSection ? options[currentSection] : [];

    return (
        <aside className="sidebar">
            <input type="text" placeholder="Search..." />
            <h2>Options</h2>
            <ul>
                {menuOptions.map((option, index) => (
                    <li key={index} onClick={() => navigate(option.link)}>{option.name}</li>
                ))}
            </ul>
        </aside>
    );
};

export default Sidebar;
