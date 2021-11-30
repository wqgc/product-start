import firebase from 'firebase-admin';
import { Product } from '../types';

class Products {
    /*
    static create(body: Omit<Product, 'id'>): Product {

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
    static update(id: string, body: ProductBody): Product {

    }

    static delete(id: string): void {

    }
    */
}

export default Products;
