import React from 'react';
import { AlertState } from '../types';

interface AlertContextValue {
    alert: AlertState
    setAlert: React.Dispatch<React.SetStateAction<AlertState>> | null
}

const AlertContext = React.createContext(
    {
        alert: { message: '', type: undefined } as AlertState,
        setAlert: null,
    } as AlertContextValue,
);

export default AlertContext;
