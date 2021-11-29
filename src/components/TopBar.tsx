import React from 'react';
import { NavLink } from 'react-router-dom';
import { UserState } from '../types';

interface TopBarProps {
    user: UserState
}

const TopBar: React.FC<TopBarProps> = ({ user }) => {
    return (
        <div>
            <ul className="topbar menu__horizontal">
                { user.signedIn
                    ? (
                        <>
                            <li>
                                <strong className="topbar__display-name">
                                    <NavLink to="/">{user.profile.displayName}</NavLink>
                                </strong>
                            </li>
                            <li>
                                <NavLink to="/">Logout</NavLink>
                            </li>
                        </>
                    )
                    : (
                        <>
                            <li>
                                <strong>
                                    <NavLink to="/login">Login</NavLink>
                                </strong>
                            </li>
                            <li>
                                <NavLink to="/register">Register</NavLink>
                            </li>
                        </>
                    )}
            </ul>
        </div>
    );
};

export default TopBar;
