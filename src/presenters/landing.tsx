import React from 'react';
import ProductService from '../services/ProductService';
import { ProductData } from '../types';

interface SetLatestProductsParameters {
    setProducts: React.Dispatch<React.SetStateAction<ProductData<string>[] | null>>
    setProductsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

class LandingPresenter {
    static async setLatestProducts(
        { setProducts, setProductsLoading }: SetLatestProductsParameters,
    ) {
        try {
            const { products } = await ProductService.getLatestProducts();
            if (products) {
                setProducts(products);
            }
            setProductsLoading(false);
        } catch (_error) {
            setProductsLoading(false);
        }
    }
}

export default LandingPresenter;
