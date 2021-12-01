import firebase from 'firebase-admin';
import { User } from '../types';

class Users {
    static async read(uid: string): Promise<User> {
        const db = firebase.firestore();
        const userRef = db.collection('users').doc(uid);

        const doc = await userRef.get();

        if (!doc.exists) {
            throw new Error('User does not exist.');
        } else {
            return doc.data() as User;
        }
    }

    static async update(data: User): Promise<void> {
        const db = firebase.firestore();
        const {
            uid, displayName, pledges, products,
        } = data;

        await db.collection('users').doc(uid).set({ displayName, pledges, products });
    }
}

export default Users;
