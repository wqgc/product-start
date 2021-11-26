import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import Register from '../presenters/register';
import AlertContext from '../utils/alertContext';

const RegisterPage: React.FC = () => {
    const { setAlert } = useContext(AlertContext);

    return (
        <div>
            <div>Register!</div>
            <Button variant="contained" onClick={() => Register.formSubmit(setAlert)}>Register</Button>
        </div>
    );
};

export default RegisterPage;
