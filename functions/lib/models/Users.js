import firebase from 'firebase-admin';
class Users {
    static async read(uid) {
        const db = firebase.firestore();
        const userRef = db.collection('users').doc(uid);
        const doc = await userRef.get();
        if (!doc.exists) {
            throw new Error('User does not exist.');
        }
        else {
            return doc.data();
        }
    }
    static async update(data) {
        const db = firebase.firestore();
        const { uid, displayName } = data;
        let { pledges, products } = data;
        // If the following are undefined, initialize them as an empty array
        pledges = pledges || [];
        products = products || [];
        await db.collection('users').doc(uid).set({ displayName, pledges, products });
    }
}
export default Users;
//# sourceMappingURL=users.js.map