import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate, useParams } from 'react-router-dom';
import ProductPresenter from '../../presenters/product';
import { ProductData } from '../../types';

const ProductPage: React.FC = () => {
    const [product, setProduct] = useState<ProductData<string> | null>(null);
    const [productLoading, setProductLoading] = useState(true);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            ProductPresenter.setProduct({
                id, setProduct, setProductLoading, navigate,
            });
        }
    }, []);

    return (
        <div>
            { productLoading
                && <CircularProgress /> }
            { !productLoading && product
                && (
                    <>
                        <h2>{product.title}</h2>
                        <p>{product.description}</p>
                    </>
                ) }
        </div>
    );
};

export default ProductPage;
