import React from 'react';
import { Outlet } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import TopBar from '../components/TopBar';
import Header from '../components/Header';
import Menu from '../components/Menu';
import { AlertState, UserState } from '../types';

interface LayoutProps {
    alert: AlertState
    setAlert: React.Dispatch<React.SetStateAction<AlertState>>
    user: UserState
}

const Layout: React.FC<LayoutProps> = ({ alert, setAlert, user }) => {
    return (
        <div>
            <TopBar user={user} />
            <Header />
            <Menu user={user} />
            <div className="alert-container">
                { alert.message
                            && (
                                <Alert
                                    onClose={() => { setAlert({ message: '', type: undefined }); }}
                                    severity={alert.type}
                                >{alert.message}
                                </Alert>
                            ) }
            </div>
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
