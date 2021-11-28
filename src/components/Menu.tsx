import React from 'react';
import { NavLink } from 'react-router-dom';

const Menu: React.FC = () => {
    return (
        <nav>
            <ul className="main-navigation menu__horizontal">
                <li>
                    <NavLink to="/">My Products</NavLink>
                </li>
                <li>
                    <NavLink to="/">My Pledges</NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Menu;
