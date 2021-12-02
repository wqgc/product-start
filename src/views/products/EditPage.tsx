import React, { useContext, useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate, useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import ProductPresenter from '../../presenters/product';
import AlertContext from '../../utils/alertContext';
import { ProductData } from '../../types';

const EditPage: React.FC = () => {
    const { setAlert } = useContext(AlertContext);
    const [product, setProduct] = useState<ProductData<string> | null>(null);
    const [productLoading, setProductLoading] = useState(true);
    const [description, setDescription] = useState('');
    const [descInitialized, setDescInitialized] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const [updateDisabled, setUpdateDisabled] = useState(false);

    const { id } = useParams();
    const navigate = useNavigate();

    // Get and set product data
    useEffect(() => {
        if (id && !product) {
            ProductPresenter.setProduct({
                id, setProduct, setProductLoading, navigate,
            });
        }
    }, []);

    // Set existing description
    useEffect(() => {
        if (product && descInitialized === false) {
            setDescription(product.description);
            setDescInitialized(true);
        }
    }, [product]);

    // Check form validity
    useEffect(() => {
        const dataIsValid = ProductPresenter.isUpdateValid(description, setDescriptionError);
        setUpdateDisabled(!dataIsValid);
    }, [description]);

    return (
        <div>
            { productLoading
                && <CircularProgress /> }
            { !productLoading && product
                && (
                    <>
                        <h2>Edit {product.title} Campaign</h2>
                        <div className="form-container">
                            <TextField
                                id="description-input"
                                helperText="Tell us about your product within 2,000 words"
                                label="Campaign Description"
                                multiline
                                rows={8}
                                error={descriptionError}
                                value={description}
                                onChange={({ target }) => setDescription(target.value)}
                            />
                            <div className="button-container">
                                <Button
                                    onClick={
                                        () => ProductPresenter.deleteProduct({
                                            id, data: product, setAlert, navigate,
                                        })
                                    }
                                    color="error"
                                >
                                    Delete Campaign
                                </Button>
                                <Button variant="contained" onClick={() => {}} disabled={updateDisabled}>
                                    Submit Changes
                                </Button>
                            </div>
                        </div>
                    </>
                ) }
        </div>
    );
};

export default EditPage;
