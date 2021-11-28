import React, { useState, useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import { AlertState } from './types';
import AlertContext from './utils/alertContext';
import TopBar from './components/TopBar';
import Header from './components/Header';
import Menu from './components/Menu';

const App: React.FC = () => {
    const [alert, setAlert] = useState<AlertState>({ message: '', type: undefined });

    const alertData = useMemo(() => ({ alert, setAlert }), []);
    return (
        <AlertContext.Provider value={alertData}>
            <TopBar />
            <Header />
            <Menu />
            { alert.message
                    && <Alert severity={alert.type}>{alert.message}</Alert> }
            <main>
                <Outlet />
            </main>
        </AlertContext.Provider>
    );
};

export default App;
