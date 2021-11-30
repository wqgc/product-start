import firebase from 'firebase-admin';
import { User } from '../types';

class Users {
    static async update(data: User): Promise<void> {
        const db = firebase.firestore();
        const { uid, displayName } = data;
        // TODO: Update to set more data than just displayName
        await db.collection('users').doc(uid).set({ displayName });
    }
}

export default Users;
