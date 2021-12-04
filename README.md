# ProductStart
For this project, I followed the following prompt:
> Kickstarter app that allows entrepreneurs to post product ideas and users to contribute to initial seed funding.

The main three ways in which a user can interact with the app is registration/logging in, creating product campaigns to raise money, and pledging to a campaign to help fund it.

## Getting Started
You can try ProductStart at [https://rn-db-823f5.web.app](https://rn-db-823f5.web.app/), or run it locally:

```
git clone https://github.com/wqgc/product-start.git
```
```
npm install
```

You'll need a [Firebase Account](https://firebase.google.com/), and will need to enable Firebase Hosting, Authentication, Functions, and Firestore Database. You'll also need a [Stripe](https://stripe.com/) account with your own private test key.

`.env` takes two environment variables:
```
STRIPE_TEST_KEY=sk_test_...
SITE_URL=http://localhost:500
```

See how to [configure your Firebase environment](https://firebase.google.com/docs/functions/config-env). You'll also need to set your [`firebaseConfig` object](https://firebase.google.com/docs/web/setup) on the frontend in `index.tsx`.

There's a `package.json` for both the frontend and backend. From the frontend, the general workflow is to run `npm run build-client` followed by `firebase serve` to run the frontend locally.

To get the backend cloud function deployed, use `cd functions` and run `npm run deploy`.

## Tech Stack
ProductStart is built with React.js on the frontend and Typescript on both the front and backend. Esbuild is used to quickly bundle and minify the frontend build, as well as handle code splitting so the initial JavaScript load is lighter. Firebase is used for hosting, auth, cloud functions (running a Node.js Express server), and Firestore NoSQL database. Lastly, payment is handled through 3rd party integration with Stripe.

Material UI is used to style the application. Some UI components used are as follows:
1. Alert
2. TextField
3. Button
4. Card
5. CircularProgress

## Architectural Overview
ProductStart is a SPA (Single Page Application) with the frontend statically hosted using Firebase hosting. The backend is in a Firebase cloud function, and it has a RESTful API primarily used for accessing the Firestore database. The database stores information about `products` and `users` (which are the main resources modeled in this project).

For products, there is an API endpoint for each CRUD operation:
- Create a product
- Read a product
- Update a product
- Delete a product

For users, Firebase authentication handles the creation of new users. The only user operations are as follows:
- Read a user
- Update a user

There are also endpoints for handling Stripe payments:
- Create a checkout session
- Set a secure HttpOnly cookie to store information about the checkout
- Retrieve the cookie after a successful payment, and update product and user details accordingly

### REST API Route Example
**Create a product**

`POST https://rn-db-823f5.web.app/api/v1/products`

Headers should include:

`Content-Type: application/json`

`Authorization: Bearer ${token}`

Firebase authentication handles JWT (Json Web Tokens) for you, and you can obtain the token from the frontend using
`await getAuth().currentUser.getIdToken(true);`

**Expected payload:**
```
{
    title: string
    goal: string
    creatorName: string
    creatorUID: string
    description: string
}
```

If successful, the response will return the newly generated `productUID` for the document entry in the database.

### Reusable Components
An example of a reusable component I created and used is the `Enforce` component in React. In `App.tsx`, where I handle routing, I wrap certain routes with the `Enforce` component in order to redirect a user if they are, or are not, signed in, based on the string passed in.

Another reusable component is the `ProductPreview` component which displays a Material UI card with details about a product based on the props passed to it.

### Database Structure
Learning more about the Firestore database, I saw that reading many documents could be expensive as a web application scales up. On the landing page, for example, I wanted to show a preview of the latest created products. I only show up to ten, but still; that would be ten separate reads if I queried for each document.

I learned that, for document databases, duplication isn't a bad thing. When a new product is created, I update an "aggregate" document that holds preview data for the latest ten products. This turns ten reads into one, because I can simply access the aggregate document when a user views the landing page, although it's at the cost of an additional write. You must also ensure any shared data stays synced. If your web application is far more read-heavy than write-heavy, this can be a worthy trade-off.

In the end, ProductStart uses three *collections* of documents.
1. `aggregate` (It only has one document, `latestProducts`, but any other aggregate data could be kept here)
2. `products` (Standard information about a product campaign)
3. `users` (User's `displayName`, and an array of their pledges and product campaign preview details)

## MVP Design Pattern
I chose the Model, View, Presenter design pattern. I had not used it before, but the [article](https://www.vogella.com/tutorials/AndroidArchitecture/article.html) I read about it made it sound appealing.

As I understood it, it would allow for an easier separation of concerns as each part has its own responsibility. Additionally, by limiting the flow of functionality, a program becomes simpler to follow.

On the frontend, ProductStart has a `/views` folder with a main React component file for each page. Components that aren't specific to a particular view just go in the `/components` folder.

Presenters have a one-to-one relationship with views, so generally each view will have its own presenter (unless it's unnecessary). The presenter is on the frontend, and it handles updating the state of a view as well as making requests using reusable service methods (in `/services`, you'll see there's a Product and User service for handling communication to the backend RESTful API or Firebase's authentication API).

An example of how a view and presenter would work together would be that, from our `RegisterPage` view, we use `RegisterPresenter.isFormValid(newData, setErrors);` to check if the form data is valid. The data passed in is tried against various conditions, and then the `setErrors` state hook is used to control the rendering of errors on the view.

Lastly, we have the model. This is our backend which handles various database or Stripe operations. The `/models` folder stores a class for `Users` and `Products`, each with methods for supported CRUD operations which are accessed through the RESTful API routes.

## Views
(Image for every view, explain user flow & design decisions)

Work in Progress