import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

class UserService {
    static async register(email: string, password: string) {
        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // BUG: userCredential returns undefined
                return userCredential;
            })
            .catch((error) => {
                throw new Error(error);
            });
    }
}

export default UserService;
