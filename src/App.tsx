import React from 'react';
import { Outlet } from 'react-router-dom';

const App: React.FC = () => {
    return (
        <div>
            App
            <Outlet />
        </div>
    );
};

export default App;
