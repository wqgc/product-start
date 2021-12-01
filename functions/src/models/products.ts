import firebase from 'firebase-admin';
import { Product, AggregateProducts } from '../types';

class Products {
    /*
    static create(body: Omit<Product, 'uid'>): Product {

    }
    */

    static async read(uid?: string): Promise<Product | AggregateProducts> {
        const db = firebase.firestore();
        let productsRef;

        if (uid) {
            // Get single product
            productsRef = db.collection('products').doc(uid);
        } else {
            // Get aggregate product preview data
            productsRef = db.collection('aggregate').doc('latestProducts');
        }

        const doc = await productsRef.get();

        if (!doc.exists) {
            throw new Error('Document does not exist.');
        } else {
            if (uid) {
                return doc.data() as Product;
            }
            return doc.data() as AggregateProducts;
        }
    }

    static async update(data: Product | AggregateProducts, uid?: string): Promise<void> {
        const db = firebase.firestore();

        if (uid) {
            // Update single product
            const {
                title, goal, creatorName, creatorUID, currentFunds, description,
            } = data as Product;

            await db.collection('products').doc(uid).set({
                title, goal, creatorName, creatorUID, currentFunds, description,
            });
        } else {
            // Update aggregate products document
            await db.collection('aggregate').doc('latestProducts').set(data);
        }
    }

    /*
    static delete(uid: string): void {

    }
    */
}

export default Products;
