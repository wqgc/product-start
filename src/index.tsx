import { initializeApp } from 'firebase/app';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles.css';
import { StyledEngineProvider } from '@mui/material/styles';
import App from './App';
import LandingPage from './views/LandingPage';
import LoginPage from './views/LoginPage';
import RegisterPage from './views/RegisterPage';
import NotFound from './views/NotFound';

// Unique, but not intended to be secret!
const firebaseConfig = {
    apiKey: 'AIzaSyDm43g2Ad3uqfqc0yVWR7-3Wjjva0pG7HI',
    authDomain: 'rn-db-823f5.firebaseapp.com',
    databaseURL: 'https://rn-db-823f5-default-rtdb.firebaseio.com',
    projectId: 'rn-db-823f5',
    storageBucket: 'rn-db-823f5.appspot.com',
    messagingSenderId: '960434173894',
    appId: '1:960434173894:web:ea8054234881ce580c24c7',
};

initializeApp(firebaseConfig);

ReactDOM.render(
    <React.StrictMode>
        <StyledEngineProvider injectFirst>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />}>
                        <Route index element={<LandingPage />} />
                        <Route path="login" element={<LoginPage />} />
                        <Route path="register" element={<RegisterPage />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </StyledEngineProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);
