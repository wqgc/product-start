import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
} from 'firebase/auth';
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
                })
                .catch((error) => {
                    throw new Error(error);
                });
        }
        throw new Error('User not signed in');
    }

    static async updateDB(uid: string, data: PublicUserData) {
        try {
            const token = await getAuth().currentUser?.getIdToken(true);
            if (!token) {
                throw new Error('User missing');
            }

            return fetch(`${CONSTANTS.BASE_URL}/users/${uid}`, {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => {
                    if (response.ok) {
                        return uid;
                    }
                    return Promise.reject(response);
                })
                .catch((error) => {
                    throw new Error(error);
                });
        } catch (error: any) {
            throw new Error(error);
        }
    }

    static async logout() {
        const auth = getAuth();
        signOut(auth).catch((error) => {
            throw new Error(error);
        });
    }

    static async login(email: string, password: string) {
        const auth = getAuth();
        return signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                return userCredential.user;
            })
            .catch((error) => {
                throw new Error(error);
            });
    }
}

export default UserService;
