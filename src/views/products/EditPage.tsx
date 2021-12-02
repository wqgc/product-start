import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate, useParams } from 'react-router-dom';
import ProductPresenter from '../../presenters/product';
import { ProductData } from '../../types';

const EditPage: React.FC = () => {
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
                        <h2>Edit {product.title} Campaign</h2>
                        <div className="button-container">
                            <Button onClick={() => {}} color="error">
                                Delete Campaign
                            </Button>
                            <Button variant="contained" onClick={() => {}}>
                                Submit Changes
                            </Button>
                        </div>
                    </>
                ) }
        </div>
    );
};

export default EditPage;
