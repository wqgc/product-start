import React, { useState, useMemo, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AlertState, UserState } from './types';
import AlertContext from './utils/alertContext';
import UserContext from './utils/userContext';
import AppPresenter from './presenters/app';
import Layout from './views/Layout';
import LandingPage from './views/LandingPage';
import LoginPage from './views/LoginPage';
import RegisterPage from './views/RegisterPage';
import NotFound from './views/NotFound';
import Enforce from './components/auth/Enforce';

const App: React.FC = () => {
    const [alert, setAlert] = useState<AlertState>({ message: '', type: undefined });
    const [user, setUser] = useState<UserState>({ signedIn: false });

    useEffect(() => {
        AppPresenter.setUserStatus(setUser);
    }, []);

    const alertData = useMemo(() => ({ alert, setAlert }), []);
    const userData = useMemo(() => ({ user, setUser }), []);
    return (
        <UserContext.Provider value={userData}>
            <AlertContext.Provider value={alertData}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Layout alert={alert} setAlert={setAlert} user={user} />}>
                            <Route index element={<LandingPage />} />
                            <Route
                                path="login"
                                element={
                                    <Enforce enforce="signedOut" user={user}><LoginPage /></Enforce>
                                }
                            />
                            <Route
                                path="register"
                                element={
                                    <Enforce enforce="signedOut" user={user}><RegisterPage /></Enforce>
                                }
                            />
                            <Route path="*" element={<NotFound />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </AlertContext.Provider>
        </UserContext.Provider>
    );
};

export default App;
