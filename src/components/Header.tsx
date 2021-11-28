import React from 'react';
import { Link } from 'react-router-dom';
import CONSTANTS from '../constants';

const Header: React.FC = () => {
    return (
        <header>
            <h1 className="site-name">
                <Link to="/">{CONSTANTS.SITE_NAME}</Link>
            </h1>
        </header>
    );
};

export default Header;
