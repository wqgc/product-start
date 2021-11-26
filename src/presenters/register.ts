import React from 'react';
import { AlertState } from '../types';

class Register {
    static formSubmit(setAlert: React.Dispatch<React.SetStateAction<AlertState>> | null): void {
        if (setAlert !== null) {
            setAlert({ message: 'Registered successfully!', type: 'success' });
        }
    }
}

export default Register;
