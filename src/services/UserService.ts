import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { PublicUserData } from '../types';
import CONSTANTS from '../constants';

class UserService {
    static async register(email: string, password: string) {
        const auth = getAuth();
        return createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                return userCredential.user;
            })
            .catch((error) => {
                throw new Error(error);
            });
    }

    static async updateCurrentDisplayName(displayName: string) {
        const auth = getAuth();
        if (auth.currentUser !== null) {
            return updateProfile(auth.currentUser, { displayName })
                .then(() => {
                    return displayName;
                }).catch((error) => {
                    throw new Error(error);
                });
        }
        throw new Error('User not signed in');
    }

    static async updateDB(uid: string, data: PublicUserData) {
        return fetch(`${CONSTANTS.BASE_URL}users/${uid}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
        })
            .then((response) => {
                if (response.ok) {
                    return uid;
                }
                return Promise.reject(response);
            }).catch((error) => {
                throw new Error(error);
            });
    }
}

export default UserService;
