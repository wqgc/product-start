import React from 'react';
import { AlertState, RegistrationData } from '../types';
import UserService from '../services/UserService';

type SetErrors = React.Dispatch<React.SetStateAction<RegistrationData<boolean>>>

interface SubmitParameters {
    data: RegistrationData<string>
    setAlert: React.Dispatch<React.SetStateAction<AlertState>> | null
    setErrors: SetErrors
}

class RegisterPresenter {
    static async formSubmit({ data, setAlert, setErrors }: SubmitParameters): Promise<void> {
        if (setAlert !== null) {
            if (this.isFormValid(data, setErrors)) {
                try {
                    // It may be possible for earlier steps to work and later ones to fail,
                    // so this would be important to take into consideration in the future
                    const { uid } = await UserService.register(data.email, data.password);
                    await UserService.updateCurrentDisplayName(data.displayName);
                    await UserService.updateDB(uid, { displayName: data.displayName });
                    setAlert({ message: 'Registered successfully!', type: 'success' });
                    // TODO: Navigate elsewhere
                } catch (error: any) {
                    // Firebase errors aren't the most readable, so I would fix this with more time
                    setAlert({ message: error.message, type: 'error' });
                }
            } else {
                setAlert({ message: 'Form data invalid.', type: 'error' });
            }
        }
    }

    static isFormValid(data: RegistrationData<string>, setErrors: SetErrors): boolean {
        const {
            email, displayName, password, confirmPassword,
        } = data;

        const errors = {
            email: false,
            displayName: false,
            password: false,
            confirmPassword: false,
        };

        if (email && displayName && password && confirmPassword) {
            if (!/^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/.test(email)) {
                errors.email = true;
            }
            if (!/^[a-zA-Z0-9_-]{3,32}$/.test(displayName)) {
                errors.displayName = true;
            }
            if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,}$/.test(password)) {
                errors.password = true;
            }
            if (confirmPassword !== password) {
                errors.confirmPassword = true;
            }
            setErrors(errors);

            if (errors.email || errors.displayName || errors.password || errors.confirmPassword) {
                return false;
            }
            return true;
        }

        return false;
    }
}

export default RegisterPresenter;