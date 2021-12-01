import React from 'react';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom';

const ProductsPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h2>My Products</h2>
            <div className="product-container">
                Your products will go here, using the ProductPreview component
            </div>

            <br />
            <Divider />
            <br />

            <Button variant="contained" onClick={() => navigate('create', { replace: false })}>
                    Start a New Campaign
            </Button>
        </div>
    );
};

export default ProductsPage;
