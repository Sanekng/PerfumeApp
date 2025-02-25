import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/components/Header.css'; // Optional for custom styling

const Header = () => {
    return (
        <header className="header">
            <h1 className="logoLabel">Perfume Management App</h1>
            <nav className="nav">
                <ul className="nav-list">
                    <li className="nav-item">
                        <NavLink to="/dashboard/summary" activeclassname="active">
                            Dashboard
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/customers" activeclassname="active">
                            Customers
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/perfumes" activeclassname="active">
                            Perfumes
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/sellers" activeclassname="active">
                            Sellers
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/notifications" activeclassname="active">
                            Notifications
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/orders" activeclassname="active">
                            Orders
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
