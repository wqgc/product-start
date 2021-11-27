import firebase from 'firebase-admin';
class Products {
    /*
    static create(body: ProductBody): Product {

    }
    */
    static async read() {
        const db = firebase.firestore();
        const productsRef = db.collection('products');
        const snapshot = await productsRef.get();
        const result = [];
        snapshot.forEach((doc) => result.push(doc.data()));
        return result;
    }
}
export default Products;
//# sourceMappingURL=products.js.map