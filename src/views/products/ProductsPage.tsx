import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import { ProductData, UserState } from '../../types';
import ProductsPresenter from '../../presenters/products';
import ProductPreview from '../../components/ProductPreview';

const ProductsPage: React.FC<{ user: UserState }> = ({ user }) => {
    const [products, setProducts] = useState<ProductData<string>[] | null>(null);
    const [productsLoading, setProductsLoading] = useState(true);
    const navigate = useNavigate();

    // Get and set the user's created product campaigns
    useEffect(() => {
        // Keep track of whether the component is mounted,
        // so state isn't updated unnecessarily after unmount
        let isMounted = true;
        ProductsPresenter.setProducts({
            setProducts, setProductsLoading, isMounted,
        });
        return () => { isMounted = false; };
    }, [user]);

    // Map latest products to product preview element
    let productElements;
    if (products) {
        // eslint-disable-next-line consistent-return
        productElements = products.map((product) => {
            const { title, creatorName, productUID } = product;
            if (title && creatorName && productUID) {
                return (
                    <ProductPreview
                        key={productUID}
                        title={title}
                        creator={creatorName}
                        id={productUID}
                    />
                );
            }
        });
    }

    return (
        <div>
            <h2>My Products</h2>
            <div className="product-container">
                { productsLoading
                    && <CircularProgress /> }
                { !productsLoading
                    && (
                        productElements && productElements.length > 0
                            ? productElements
                            : <p>No products yet.</p>
                    ) }
            </div>

            <Divider />
            <br />

            <Button variant="contained" onClick={() => navigate('create', { replace: false })}>
                Start a New Campaign
            </Button>
        </div>
    );
};

export default ProductsPage;
