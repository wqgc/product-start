import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserState } from '../types';
import AlertContext from '../utils/alertContext';
import AppPresenter from '../presenters/app';

interface TopBarProps {
    user: UserState
}

const TopBar: React.FC<TopBarProps> = ({ user }) => {
    const { setAlert } = useContext(AlertContext);

    const clickLogout = () => AppPresenter.logoutHandler(setAlert);

    return (
        <div>
            <ul className="topbar menu__horizontal">
                { user.signedIn
                    ? (
                        <>
                            <li>
                                <strong className="topbar__display-name">
                                    {user.profile.displayName}
                                </strong>
                            </li>
                            <li>
                                <NavLink to="/" onClick={clickLogout}>Logout</NavLink>
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
