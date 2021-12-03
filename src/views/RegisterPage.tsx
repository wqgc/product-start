import React, { useContext, useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import RegisterPresenter from '../presenters/register';
import AlertContext from '../utils/alertContext';
import UserContext from '../utils/userContext';
import { RegistrationData } from '../types';

const RegisterPage: React.FC = () => {
    const { setAlert } = useContext(AlertContext);
    const { setUser } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [data, setData] = useState<RegistrationData<string>>({
        email,
        displayName,
        password,
        confirmPassword,
    });
    const [errors, setErrors] = useState<RegistrationData<boolean>>({
        email: false,
        displayName: false,
        password: false,
        confirmPassword: false,
    });
    const [registerDisabled, setRegisterDisabled] = useState(true);
    const [submitLoading, setSubmitLoading] = useState(false);

    useEffect(() => {
        const newData = {
            email: email.trim(),
            displayName: displayName.trim(),
            password,
            confirmPassword,
        };
        setData(newData);

        const dataIsValid = RegisterPresenter.isFormValid(newData, setErrors);
        setRegisterDisabled(!dataIsValid);
    }, [email, displayName, password, confirmPassword, setRegisterDisabled]);

    const helperText = {
        email: 'Must be a valid email address',
        displayName: 'Must only contain letters and be between 3-32 characters',
        password: 'Must be longer than six characters, contain one upper and lowercase letter, one number, and one special character',
        confirmPassword: 'Must match password',
    };

    return (
        <div>
            <h2>Register</h2>
            <div className="form-container">
                <TextField
                    id="email-input"
                    helperText={helperText.email}
                    label="Email Address"
                    error={errors.email}
                    value={email}
                    onChange={({ target }) => setEmail(target.value)}
                    required
                />
                <TextField
                    id="displayname-input"
                    helperText={helperText.displayName}
                    label="Display Name"
                    error={errors.displayName}
                    value={displayName}
                    onChange={({ target }) => setDisplayName(target.value)}
                    required
                />
                <TextField
                    id="password-input"
                    helperText={helperText.password}
                    type="password"
                    label="Password"
                    error={errors.password}
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                    required
                />
                <TextField
                    id="confirmpassword-input"
                    helperText={helperText.confirmPassword}
                    type="password"
                    label="Confirm Password"
                    error={errors.confirmPassword}
                    value={confirmPassword}
                    onChange={({ target }) => setConfirmPassword(target.value)}
                    required
                />
                <LoadingButton
                    variant="contained"
                    loading={submitLoading}
                    onClick={
                        () => RegisterPresenter.formSubmit(
                            {
                                data,
                                setAlert,
                                setErrors,
                                setUser,
                                setSubmitLoading,
                            },
                        )
                    }
                    disabled={registerDisabled}
                >
                    Register
                </LoadingButton>
            </div>
        </div>
    );
};

export default RegisterPage;
