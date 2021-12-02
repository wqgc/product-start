import React from 'react';
import { NavigateFunction } from 'react-router-dom';
import ProductService from '../services/ProductService';
import { ProductData } from '../types';

interface SetProductParameters {
    id: string
    setProduct: React.Dispatch<React.SetStateAction<ProductData<string> | null>>
    setProductLoading: React.Dispatch<React.SetStateAction<boolean>>
    navigate: NavigateFunction
}

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

    static async deleteProduct() {
        //
    }
}

export default ProductPresenter;
