import React, { useContext, useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LoginPresenter from '../presenters/login';
import AlertContext from '../utils/alertContext';

const LoginPage: React.FC = () => {
    const { setAlert } = useContext(AlertContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginDisabled, setLoginDisabled] = useState(true);

    useEffect(() => {
        setLoginDisabled(!LoginPresenter.isFormValid({ email, password }));
    }, [email, password]);

    return (
        <div>
            <h2>Login</h2>
            <form className="form-container">
                <TextField
                    id="email-input"
                    label="Email Address"
                    value={email}
                    onChange={({ target }) => setEmail(target.value)}
                    required
                />
                <TextField
                    id="password-input"
                    type="password"
                    label="Password"
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                    required
                />
                <Button
                    variant="contained"
                    onClick={
                        () => LoginPresenter.formSubmit({ data: { email, password }, setAlert })
                    }
                    disabled={loginDisabled}
                >
                    Login
                </Button>
            </form>
        </div>
    );
};

export default LoginPage;
