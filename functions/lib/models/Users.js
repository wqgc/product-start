import firebase from 'firebase-admin';
class Users {
    static async update(data) {
        const db = firebase.firestore();
        const { uid, displayName } = data;
        await db.collection('users').doc(uid).set({ displayName });
    }
}
export default Users;
//# sourceMappingURL=users.js.map