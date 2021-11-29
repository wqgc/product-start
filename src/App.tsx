import React, { useState, useMemo, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import { AlertState, UserState } from './types';
import AlertContext from './utils/alertContext';
import UserContext from './utils/userContext';
import TopBar from './components/TopBar';
import Header from './components/Header';
import Menu from './components/Menu';
import AppPresenter from './presenters/app';

const App: React.FC = () => {
    const [alert, setAlert] = useState<AlertState>({ message: '', type: undefined });
    const [user, setUser] = useState<UserState>({ signedIn: false });

    useEffect(() => {
        AppPresenter.setUserStatus(setUser);
    }, []);

    const alertData = useMemo(() => ({ alert, setAlert }), []);
    const userData = useMemo(() => ({ user, setUser }), []);
    return (
        <UserContext.Provider value={userData}>
            <AlertContext.Provider value={alertData}>
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
            </AlertContext.Provider>
        </UserContext.Provider>
    );
};

export default App;
