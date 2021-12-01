import firebase from 'firebase-admin';

class Auth {
    // Ensure a token exists, and that the token uid matches
    // the user uid for the content the user is trying to update
    static async verifyUser(authorization: string | undefined, uid: string) {
        let token;

        if (authorization && authorization.startsWith('Bearer ')) {
            // eslint-disable-next-line prefer-destructuring
            token = authorization.split('Bearer ')[1];

            return firebase.auth()
                .verifyIdToken(token)
                .then((decodedToken) => {
                    if (decodedToken.uid === uid) {
                        return uid;
                    }
                    throw new Error('Not authorized');
                })
                .catch((error) => {
                    throw new Error((error as Error).message);
                });
        }
        throw new Error('Bearer token not found');
    }
}

export default Auth;
