import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import { useNavigate, useParams } from 'react-router-dom';
import moneyFormatter from 'money-formatter';
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

                        <div className="details">
                            <div><em>By {product.creatorName}</em></div>
                            <div><strong>Goal:</strong> {moneyFormatter.format('USD', product.goal)}</div>
                            <div><strong>Raised so far:</strong> {moneyFormatter.format('USD', product.currentFunds)}</div>
                        </div>

                        <br />
                        <Divider />

                        <p>{product.description}</p>

                        <Divider />
                        <br />

                        <h3>Pledge to {product.title}</h3>
                        <p>w.i.p</p>
                    </>
                ) }
        </div>
    );
};

export default ProductPage;
