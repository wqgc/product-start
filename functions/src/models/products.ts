import firebase from 'firebase-admin';
import { Product, AggregateProducts } from '../types';

class Products {
    static async create(data: Omit<Product, 'productUID' | 'currentFunds'>): Promise<string> {
        const db = firebase.firestore();

        const {
            title, goal, creatorName, creatorUID, description,
        } = data;
        const currentFunds = '0';

        const response = await db.collection('products').add({
            title, goal, creatorName, creatorUID, currentFunds, description,
        });

        return response.id;
    }

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
            throw new Error('Document does not exist');
        } else {
            if (uid) {
                return doc.data() as Product;
            }
            return doc.data() as AggregateProducts;
        }
    }

    static async update(data: Product | AggregateProducts, uid?: string): Promise<any> {
        const db = firebase.firestore();

        if (uid) {
            // Update single product
            const {
                title, goal, creatorName, creatorUID, currentFunds, description,
            } = data as Product;

            return db.collection('products').doc(uid).set({
                title, goal, creatorName, creatorUID, currentFunds, description,
            });
        }
        // Update aggregate products document
        return db.collection('aggregate').doc('latestProducts').set(data);
    }

    static async delete(uid: string): Promise<void> {
        const db = firebase.firestore();
        await db.collection('products').doc(uid).delete();
    }
}

export default Products;
