import React, { useState, useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import { AlertState } from './types';
import AlertContext from './utils/AlertContext';

const App: React.FC = () => {
    const [alert, setAlert] = useState<AlertState>({ message: '', type: undefined });

    const alertData = useMemo(() => ({ alert, setAlert }), []);
    return (
        <AlertContext.Provider value={alertData}>
            App
            { alert.message
                && <Alert severity={alert.type}>{alert.message}</Alert> }
            <Outlet />
        </AlertContext.Provider>
    );
};

export default App;
