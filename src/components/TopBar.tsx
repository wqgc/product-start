import React from 'react';
import { NavLink } from 'react-router-dom';

const TopBar: React.FC = () => {
    return (
        <div>
            <ul className="topbar menu__horizontal">
                <li>
                    <strong>
                        <NavLink to="/login">Login</NavLink>
                    </strong>
                </li>
                <li>
                    <NavLink to="/register">Register</NavLink>
                </li>
                <li>
                    <strong>
                        <NavLink to="/">Current User</NavLink>
                    </strong>
                </li>
                <li>
                    <NavLink to="/">Logout</NavLink>
                </li>
            </ul>
        </div>
    );
};

export default TopBar;
