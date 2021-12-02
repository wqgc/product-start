import React from 'react';
import { getAuth } from 'firebase/auth';
import { NavigateFunction } from 'react-router-dom';
import ProductService from '../services/ProductService';
import UserService from '../services/UserService';
import { ProductData, AlertState } from '../types';

interface SetProductParameters {
    id: string
    setProduct: React.Dispatch<React.SetStateAction<ProductData<string> | null>>
    setProductLoading: React.Dispatch<React.SetStateAction<boolean>>
    navigate: NavigateFunction
}

interface DeleteProductParameters {
    id: string | undefined
    data: ProductData<string>
    setAlert: React.Dispatch<React.SetStateAction<AlertState>> | null
    navigate: NavigateFunction
}

type SetDescriptionError = React.Dispatch<React.SetStateAction<boolean>>

class ProductPresenter {
    static async setProduct({
        id, setProduct, setProductLoading, navigate,
    }: SetProductParameters) {
        try {
            const product = await ProductService.getProduct(id);
            if (product) {
                setProduct(product);
            }
            setProductLoading(false);
        } catch (error) {
            navigate('/404', { replace: false });
        }
    }

    static async submitProductUpdate() {
        //
    }

    static isUpdateValid(description: string, setDescriptionError: SetDescriptionError): boolean {
        if (description.length > 2_000) {
            setDescriptionError(true);
            return false;
        }
        setDescriptionError(false);
        return true;
    }

    static async deleteProduct({
        id, data, setAlert, navigate,
    }: DeleteProductParameters) {
        if (id !== undefined && setAlert !== null) {
            try {
                // Delete product
                await ProductService.delete(id);
                const { currentUser } = getAuth();
                if (currentUser) {
                    const userData = await UserService.get(currentUser.uid);
                    // Remove product from user
                    userData.products = userData.products.filter(
                        (product: ProductData<string>) => product.productUID !== id,
                    );
                    await UserService.updateDB(currentUser.uid, userData);
                    // Remove product from aggregate
                    await ProductService.updateLatestProducts({ ...data, productUID: id }, true);

                    navigate('/products', { replace: false });
                    setAlert({ message: 'Deleted product campaign.', type: 'success' });
                } else {
                    throw new Error('Missing current user.');
                }
            } catch (error: any) {
                setAlert({ message: error.message, type: 'error' });
            }
        }
    }
}

export default ProductPresenter;
