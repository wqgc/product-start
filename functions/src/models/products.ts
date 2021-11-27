import firebase from 'firebase-admin';
import { Product } from '../types';

class Products {
    /*
    static create(body: ProductBody): Product {

    }
    */

    static async read(): Promise<Product[]> {
        const db = firebase.firestore();
        const productsRef = db.collection('products');
        const snapshot = await productsRef.get();
        const result: Product[] = [];

        snapshot.forEach((doc) => result.push(doc.data() as Product));

        return result;
    }

    /*
    static update(body: Product): Product {

    }

    static delete(): void {

    }
    */
}

export default Products;
