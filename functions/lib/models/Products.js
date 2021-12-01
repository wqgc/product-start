import firebase from 'firebase-admin';
class Products {
    static async create(data) {
        const db = firebase.firestore();
        const { title, goal, creatorName, creatorUID, currentFunds, description, } = data;
        const response = await db.collection('products').add({
            title, goal, creatorName, creatorUID, currentFunds, description,
        });
        return response.id;
    }
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
    static async update(data, uid) {
        const db = firebase.firestore();
        if (uid) {
            // Update single product
            const { title, goal, creatorName, creatorUID, currentFunds, description, } = data;
            await db.collection('products').doc(uid).set({
                title, goal, creatorName, creatorUID, currentFunds, description,
            });
        }
        else {
            // Update aggregate products document
            await db.collection('aggregate').doc('latestProducts').set(data);
        }
    }
    static async delete(uid) {
        const db = firebase.firestore();
        await db.collection('products').doc(uid).delete();
    }
}
export default Products;
//# sourceMappingURL=products.js.map