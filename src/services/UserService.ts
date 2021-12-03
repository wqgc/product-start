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

    static async updateDB(id: string, data: PublicUserData) {
        try {
            const token = await getAuth().currentUser?.getIdToken(true);
            if (!token) {
                throw new Error('User missing');
            }

            return fetch(`${CONSTANTS.BASE_URL}/users/${id}`, {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => {
                    if (response.ok) {
                        return id;
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

    static async get(id: string) {
        return fetch(`${CONSTANTS.BASE_URL}/users/${id}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                return Promise.reject(response);
            })
            .then((data) => data)
            .catch((error) => {
                throw new Error(error);
            });
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

    static async createCheckoutSession(id: string, pledgeAmount: string) {
        try {
            const { currentUser } = getAuth();
            const token = await getAuth().currentUser?.getIdToken(true);
            if (!token || !currentUser) {
                throw new Error('User missing');
            }

            // TODO:
            // Make a request to store data in a HttpOnly cookie
            // This will be used later in order to update the database after success

            return fetch(`${CONSTANTS.BASE_URL}/create-checkout-session/${id}`, {
                method: 'POST',
                body: JSON.stringify({ pledgeAmount, pledgerUID: currentUser.uid }),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    return Promise.reject(response);
                })
                .then(({ url }) => {
                    window.location = url;
                })
                .catch((error) => {
                    throw new Error(error);
                });
        } catch (error: any) {
            throw new Error(error);
        }
    }
}

export default UserService;
