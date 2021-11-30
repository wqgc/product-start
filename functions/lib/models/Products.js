import firebase from 'firebase-admin';
class Products {
    /*
    static create(body: Omit<Product, 'uid'>): Product {

    }
    */
    static async read(uid) {
        const db = firebase.firestore();
        let productsRef;
        if (uid) {
            // Get single product
            productsRef = db.collection('products').doc(uid);
        }
        else {
            // Get aggregate product preview data
            productsRef = db.collection('aggregate').doc('latestProducts');
        }
        const doc = await productsRef.get();
        if (!doc.exists) {
            throw new Error('Document does not exist.');
        }
        else {
            if (uid) {
                return doc.data();
            }
            return doc.data();
        }
    }
}
export default Products;
//# sourceMappingURL=products.js.map