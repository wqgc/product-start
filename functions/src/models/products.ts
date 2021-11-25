/*
import firebase from 'firebase-admin';

const db = firebase.firestore();

interface ProductBody {
    name: string
    description: string
    fundingGoal: number
}

interface ProductId {
    id: string
}

type Product = ProductId & ProductBody
*/

/*
interface ReadConfig {
    id?: string
    limit?: number
}
*/

class Products {
    /*
    static create(body: ProductBody): Product {

    }
    */

    /*
    static async read(): Promise<Product[]> {
        const productsRef = db.collection('products');
        const snapshot = await productsRef.get();
        const result: Product[] = [];

        snapshot.forEach((doc) => result.push(doc.data() as Product));

        return result;
    }
    */

    static test() {
        return ({ message: 'test' });
    }

    /*
    static update(body: Product): Product {

    }

    static delete(): void {

    }
    */
}

export default Products;
