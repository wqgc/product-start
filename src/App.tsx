import React, {
    useState, useMemo, useEffect, Suspense, lazy,
} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AlertState, UserState } from './types';
import AlertContext from './utils/alertContext';
import UserContext from './utils/userContext';
import AppPresenter from './presenters/app';
import Layout from './views/Layout';
import Enforce from './components/auth/Enforce';

// Lazy load routes to reduce initial JS load
const LandingPage = lazy(() => import('./views/LandingPage'));
const LoginPage = lazy(() => import('./views/LoginPage'));
const RegisterPage = lazy(() => import('./views/RegisterPage'));
const ProductsPage = lazy(() => import('./views/products/ProductsPage'));
const CreatePage = lazy(() => import('./views/products/CreatePage'));
const ProductPage = lazy(() => import('./views/products/ProductPage'));
const EditPage = lazy(() => import('./views/products/EditPage'));
const PledgeSuccessPage = lazy(() => import('./views/products/PledgeSuccessPage'));
const PledgesPage = lazy(() => import('./views/PledgesPage'));
const NotFound = lazy(() => import('./views/NotFound'));

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
                <Suspense fallback={<div>Loading...</div>}>
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
                                        <Enforce enforce="signedIn" user={user}><PledgesPage user={user} /></Enforce>
                                    }
                                />
                                <Route path="*" element={<NotFound />} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </Suspense>
            </AlertContext.Provider>
        </UserContext.Provider>
    );
};

export default App;
