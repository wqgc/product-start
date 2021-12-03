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
import ProductsPage from './views/products/ProductsPage';
import CreatePage from './views/products/CreatePage';
import ProductPage from './views/products/ProductPage';
import EditPage from './views/products/EditPage';
import PledgeSuccessPage from './views/products/PledgeSuccessPage';
import PledgesPage from './views/PledgesPage';
import NotFound from './views/NotFound';
import Enforce from './components/auth/Enforce';

const App: React.FC = () => {
    const [alert, setAlert] = useState<AlertState>({ message: '', type: undefined });
    const [user, setUser] = useState<UserState>({ uid: '', signedIn: null, profile: { displayName: '' } });

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
                            <Route index element={<LandingPage user={user} />} />
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
                            <Route
                                path="products"
                                element={
                                    <Enforce enforce="signedIn" user={user}><ProductsPage user={user} /></Enforce>
                                }
                            />
                            <Route
                                path="products/create"
                                element={
                                    <Enforce enforce="signedIn" user={user}><CreatePage /></Enforce>
                                }
                            />
                            <Route path="products/:id" element={<ProductPage user={user} />} />
                            <Route
                                path="products/:id/edit"
                                element={
                                    <Enforce enforce="signedIn" user={user}><EditPage user={user} /></Enforce>
                                }
                            />
                            <Route
                                path="products/:id/:pledgeAmount/success"
                                element={
                                    <Enforce enforce="signedIn" user={user}><PledgeSuccessPage user={user} /></Enforce>
                                }
                            />
                            <Route
                                path="pledges"
                                element={
                                    <Enforce enforce="signedIn" user={user}><PledgesPage /></Enforce>
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
