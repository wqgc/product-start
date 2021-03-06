import firebase from 'firebase-admin';
import { User } from '../types';

class Users {
    static async read(uid: string): Promise<User> {
        const db = firebase.firestore();
        const userRef = db.collection('users').doc(uid);

        const doc = await userRef.get();

        if (!doc.exists) {
            throw new Error('User does not exist');
        } else {
            return doc.data() as User;
        }
    }

    static async update(data: User): Promise<any> {
        const db = firebase.firestore();
        const { uid, displayName } = data;
        let { pledges, products } = data;

        // If the following are undefined, initialize them as an empty array
        pledges = pledges || [];
        products = products || [];

        if (uid) {
            return db.collection('users').doc(uid).set({ displayName, pledges, products });
        }
        throw new Error('User uid missing');
    }
}

export default Users;
