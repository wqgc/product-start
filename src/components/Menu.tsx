import React from 'react';
import { NavLink } from 'react-router-dom';
import { UserState } from '../types';

interface MenuProps {
    user: UserState
}

const Menu: React.FC<MenuProps> = ({ user }) => {
    if (!user.signedIn) {
        return null;
    }

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
