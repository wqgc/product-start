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
const LandingPage = lazy(() => import('./views/LandingPage.js'));
const LoginPage = lazy(() => import('./views/LoginPage.js'));
const RegisterPage = lazy(() => import('./views/RegisterPage.js'));
const ProductsPage = lazy(() => import('./views/products/ProductsPage.js'));
const CreatePage = lazy(() => import('./views/products/CreatePage.js'));
const ProductPage = lazy(() => import('./views/products/ProductPage.js'));
const EditPage = lazy(() => import('./views/products/EditPage.js'));
const PledgeSuccessPage = lazy(() => import('./views/products/PledgeSuccessPage.js'));
const PledgesPage = lazy(() => import('./views/PledgesPage.js'));
const NotFound = lazy(() => import('./views/NotFound.js'));
const Loading = <div />;

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
                            <Route
                                index
                                element={(
                                    <Suspense fallback={Loading}>
                                        <LandingPage user={user} />
                                    </Suspense>
                                )}
                            />
                            <Route
                                path="login"
                                element={(
                                    <Suspense fallback={Loading}>
                                        <Enforce enforce="signedOut" user={user}><LoginPage /></Enforce>
                                    </Suspense>
                                )}
                            />
                            <Route
                                path="register"
                                element={(
                                    <Suspense fallback={Loading}>
                                        <Enforce enforce="signedOut" user={user}><RegisterPage /></Enforce>
                                    </Suspense>
                                )}
                            />
                            <Route
                                path="products"
                                element={(
                                    <Suspense fallback={Loading}>
                                        <Enforce enforce="signedIn" user={user}><ProductsPage user={user} /></Enforce>
                                    </Suspense>
                                )}
                            />
                            <Route
                                path="products/create"
                                element={(
                                    <Suspense fallback={Loading}>
                                        <Enforce enforce="signedIn" user={user}><CreatePage /></Enforce>
                                    </Suspense>
                                )}
                            />
                            <Route
                                path="products/:id"
                                element={(
                                    <Suspense fallback={Loading}>
                                        <ProductPage user={user} />
                                    </Suspense>
                                )}
                            />
                            <Route
                                path="products/:id/edit"
                                element={(
                                    <Suspense fallback={Loading}>
                                        <Enforce enforce="signedIn" user={user}><EditPage user={user} /></Enforce>
                                    </Suspense>
                                )}
                            />
                            <Route
                                path="products/:id/:pledgeAmount/success"
                                element={(
                                    <Suspense fallback={Loading}>
                                        <Enforce enforce="signedIn" user={user}><PledgeSuccessPage user={user} /></Enforce>
                                    </Suspense>
                                )}
                            />
                            <Route
                                path="pledges"
                                element={(
                                    <Suspense fallback={Loading}>
                                        <Enforce enforce="signedIn" user={user}><PledgesPage user={user} /></Enforce>
                                    </Suspense>
                                )}
                            />
                            <Route
                                path="*"
                                element={(
                                    <Suspense fallback={Loading}>
                                        <NotFound />
                                    </Suspense>
                                )}
                            />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </AlertContext.Provider>
        </UserContext.Provider>
    );
};

export default App;
