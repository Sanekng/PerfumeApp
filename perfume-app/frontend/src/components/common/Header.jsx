import React from 'react';
import { NavLink } from 'react-router-dom';
import './header.css'; // Optional for custom styling

const Header = () => {
    return (
        <header className="header">
            <nav className="nav">
                <ul className="nav-list">
                    <li className="nav-item">
                        <NavLink to="/customers" activeClassName="active">
                            Customers
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/" activeClassName="active">
                            Perfumes
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/sellers" activeClassName="active">
                            Sellers
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/notifications" activeClassName="active">
                            Notifications
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/orders" activeClassName="active">
                            Orders
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
