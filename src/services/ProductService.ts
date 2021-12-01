import { getAuth } from 'firebase/auth';
import CONSTANTS from '../constants';
import { ProductData } from '../types';

class ProductService {
    static async getLatestProducts() {
        return fetch(`${CONSTANTS.BASE_URL}/products`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                return Promise.reject(response);
            })
            .then((data) => data)
            .catch((error) => {
                throw new Error(error);
            });
    }

    static async getProduct(id: string) {
        return fetch(`${CONSTANTS.BASE_URL}/products/${id}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                return Promise.reject(response);
            })
            .then((data) => data)
            .catch((error) => {
                throw new Error(error);
            });
    }

    static async create(data: ProductData<string>) {
        try {
            const token = await getAuth().currentUser?.getIdToken(true);
            if (!token) {
                throw new Error('User missing');
            }

            return fetch(`${CONSTANTS.BASE_URL}/products`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    return Promise.reject(response);
                })
                .then((productUID) => {
                    const newData = { ...data, productUID };
                    return newData;
                })
                .catch((error) => {
                    throw new Error(error);
                });
        } catch (error: any) {
            throw new Error(error);
        }
    }

    static async updateLatestProducts(data: ProductData<string>, remove: boolean = false) {
        return fetch(`${CONSTANTS.BASE_URL}/products`, {
            method: 'PATCH',
            body: JSON.stringify(remove === true ? {
                ...data, remove: true,
            } : data),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (response.ok) {
                    return data;
                }
                return Promise.reject(response);
            })
            .catch((error) => {
                throw new Error(error);
            });
    }

    static async updateProduct(id: string, data: ProductData<string>) {
        try {
            const token = await getAuth().currentUser?.getIdToken(true);
            if (!token) {
                throw new Error('User missing');
            }

            return fetch(`${CONSTANTS.BASE_URL}/products/${id}`, {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => {
                    if (response.ok) {
                        return data;
                    }
                    return Promise.reject(response);
                })
                .catch((error) => {
                    throw new Error(error);
                });
        } catch (error: any) {
            throw new Error(error);
        }
    }

    static async delete(id: string) {
        try {
            const token = await getAuth().currentUser?.getIdToken(true);
            if (!token) {
                throw new Error('User missing');
            }

            return fetch(`${CONSTANTS.BASE_URL}/products/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => {
                    if (response.ok) {
                        return Promise.resolve(response);
                    }
                    return Promise.reject(response);
                })
                .catch((error) => {
                    throw new Error(error);
                });
        } catch (error: any) {
            throw new Error(error);
        }
    }
}

export default ProductService;
