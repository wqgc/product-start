import React, { useContext, useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import RegisterPresenter from '../presenters/register';
import AlertContext from '../utils/alertContext';

const RegisterPage: React.FC = () => {
    const { setAlert } = useContext(AlertContext);
    const [email, setEmail] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [data, setData] = useState({
        email,
        displayName,
        password,
        confirmPassword,
    });
    const [errors, setErrors] = useState({
        email: false,
        displayName: false,
        password: false,
        confirmPassword: false,
    });
    const [registerDisabled, setRegisterDisabled] = useState(true);

    useEffect(() => {
        const newData = {
            email,
            displayName,
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
            <form className="registration-container">
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
                <Button
                    variant="contained"
                    onClick={() => RegisterPresenter.formSubmit({ data, setAlert, setErrors })}
                    disabled={registerDisabled}
                >
                    Register
                </Button>
            </form>
        </div>
    );
};

export default RegisterPage;
