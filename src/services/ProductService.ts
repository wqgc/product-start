import CONSTANTS from '../constants';

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
}

export default ProductService;
