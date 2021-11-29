import React from 'react';
import { AlertState } from '../types';
import UserService from '../services/UserService';

interface LoginData {
    email: string
    password: string
}

interface SubmitParameters {
    data: LoginData
    setAlert: React.Dispatch<React.SetStateAction<AlertState>> | null
}

class LoginPresenter {
    static async formSubmit({ data, setAlert }: SubmitParameters): Promise<void> {
        if (setAlert !== null) {
            if (this.isFormValid(data)) {
                try {
                    await UserService.login(data.email.trim(), data.password);
                    setAlert({ message: 'Logged in successfully!', type: 'success' });
                } catch (_error) {
                    setAlert({ message: 'Incorrect email or password.', type: 'error' });
                }
            } else {
                setAlert({ message: 'Form data is missing.', type: 'error' });
            }
        }
    }

    static isFormValid(data: LoginData): boolean {
        const { email, password } = data;

        if (email && password) {
            return true;
        }
        return false;
    }
}

export default LoginPresenter;
