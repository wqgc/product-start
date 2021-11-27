import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

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
}

export default UserService;
