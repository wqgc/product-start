# ProductStart
For this project, I followed the following prompt:
> Kickstarter app that allows entrepreneurs to post product ideas and users to contribute to initial seed funding.

The main three ways in which a user can interact with the app is registration/logging in, creating product campaigns to raise money, and pledging to a campaign to help fund it.

## Getting Started
You can try running it locally:

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
ProductStart is a SPA (Single Page Application) with the frontend statically hosted using Firebase hosting. The backend is in a Firebase cloud function, in which I've created a RESTful API primarily for accessing the Firestore database. The database stores information about `products` and `users` (which are the main resources modeled in this project).

For products, there is an API endpoint for each CRUD operation:
- Create a product
- Read a product
- Update a product
- Delete a product

For users, Firebase authentication handles the creation of new users. The only user operations I've implemented in the backend are as follows:
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
Reading many documents can be expensive as a web application scales up. On the landing page, for example, I want to show a preview of the latest created products. I only show up to ten, but still; that would be ten separate reads if I queried for each document.

I learned that, for document databases, duplication isn't a bad thing. When a new product is created, I update an "aggregate" document that holds preview data for the latest ten products. This turns ten reads into one, because I can simply access the aggregate document when a user views the landing page (although it's at the cost of an additional write on product creation). Properly syncing data must also be kept in mind. If your web application is far more read-heavy than write-heavy, this can be a worthy trade-off.

In the end, ProductStart uses three *collections* of documents.
1. `aggregate` (It only has one document, `latestProducts`, but any other aggregate data could be kept here)
2. `products` (Standard information about a product campaign)
3. `users` (User's `displayName`, and an array of their pledges and product campaign preview details)

## MVP Design Pattern
I chose the Model, View, Presenter design pattern. I had not used it before, but the [article](https://www.vogella.com/tutorials/AndroidArchitecture/article.html) I read about it made it sound appealing. It allows for an easier separation of concerns as each part has its own responsibility. Additionally, by limiting the flow of functionality, a program becomes simpler to follow.

On the frontend, ProductStart has a `/views` folder with a main React component file for each page. Components that aren't specific to a particular view go in the `/components` folder. (Although it isn't exactly its own view, I also store `Layout.tsx` here which is used as a base for all other views.)

Presenters have a one-to-one relationship with views, so generally each view will have its own presenter (unless it's unnecessary). The presenter is on the frontend, and it handles updating the state of a view as well as making requests using reusable service methods. (In `/services`, you'll see there's a Product and User service for handling communication to the backend RESTful API or Firebase's authentication API.)

An example of how a view and presenter would work together would be that, from our `RegisterPage` view, we use `RegisterPresenter.isFormValid(newData, setErrors)` to check if the form data is valid. The data passed in is tried against various conditions, and then the `setErrors` state hook is used to control the rendering of errors on the view.

Lastly, we have the model. This is our backend which handles various database or Stripe operations. The `/models` folder stores a class for `Users` and `Products`, each with methods for supported CRUD operations which are accessed through the RESTful API routes.

## Views
### Landing Page
![Landing Page](https://res.cloudinary.com/z4rd3n/image/upload/v1638605478/PS/00_ksvng9.png)

This is the first page the user sees. It begins with a description of ProductStart and a call to sign up. There is also a space where product previews will be displayed.

### Register Page
![Register Page](https://res.cloudinary.com/z4rd3n/image/upload/v1638605478/PS/01_azbkxd.png)

After filling the registration form, the UI will give feedback about whether certain requirements have been met (a particular field will turn red to bring attention to it). The "Register" button will also be grayed out and disabled until the form is valid.

When the form is properly filled and submitted, the button displays a loading spinner while registration processes. Once successful, the user is redirected back to the landing page and is shown a green "Registered successfully!" alert.

### Login Page
![Login Page](https://res.cloudinary.com/z4rd3n/image/upload/v1638605479/PS/02_efr4zj.png)

If a user logs out, they can log in again on the login page using their email and password.

### Products Page
![Products Page](https://res.cloudinary.com/z4rd3n/image/upload/v1638605478/PS/03_grxitv.png)

Once logged in, a new menu appears beneath the header on every page. It has a link to "My Products" and "My Pledges". First, in the "My Products" page, a user can see a preview of their product campaigns.

From there, a user may click on a product title to go to its individual page or instead choose to "Start a New Campaign".

### Create Page
![Create Page](https://res.cloudinary.com/z4rd3n/image/upload/v1638605479/PS/04_sedojr.png)

Here, the user can input details about their product and goal. As with the registration form, this one also gives the user feedback if any inputs are invalid.

### Product Page
![Product Page](https://res.cloudinary.com/z4rd3n/image/upload/v1638605482/PS/06_nwlhc2.png)

Every product campaign has its own page that shows more details. The above is an example of viewing the page as a user who did not create the product. In this case, there is a field at the bottom allowing a user to pledge a certain amount of money.

A user will generally reach this page either by seeing a product preview listed on the landing page under "Discover New Ideas!", or by following a direct link.

### Edit Page
![Edit Page](https://res.cloudinary.com/z4rd3n/image/upload/v1638605479/PS/05_tzgikt.png)

If the user was signed in as the product owner, the pledge form would instead be replaced with a button that leads to the edit page of the product campaign. Here, the description can be updated or the campaign can be deleted entirely.

The delete button is intentionally given less visual weight because it's a "negative" action. I also chose to put it on the left, because generally we look left-to-right and this allows one's eyes to end up on the "positive" action without needing to look back to the left again.

### Stripe Checkout
![Stripe Checkout](https://res.cloudinary.com/z4rd3n/image/upload/v1638605484/PS/07_w1c7sh.png)

Going back to making a pledge as another user, pressing "Pledge" after inputting a number takes you to the Stripe checkout. This isn't a view I created, as it's just going to the Stripe website, but I'm including it to show the user flow. It's in test mode, so no actual payment can be made.

The following cards, with any other information, can be used to try it out:

Payment succeeds: `4242 4242 4242 4242`

Payment requires authentication: `4000 0025 0000 3155`

Payment is declined: `4000 0000 0000 9995`

### Pledge Success Page
![Pledge Success Page](https://res.cloudinary.com/z4rd3n/image/upload/v1638605483/PS/08_iroyor.png)

After a successful payment, the user is redirected to this page where they can see how much they pledged and choose to return to the product page.

The general idea behind this feature is that, if a campaign is successful, the money will go to the product owner (with some percentage cut for ProductStart). The campaign would also have some start and end date, and a user would receive a refund if the campaign is unsuccessful. This, however, isn't implemented in this demo.

### Pledges Page
![Pledges Page](https://res.cloudinary.com/z4rd3n/image/upload/v1638605483/PS/09_t6cgnr.png)

A user can go to "My Pledges" to see the above view. It's almost identical to the My Products page, but shows what products the user has pledged to instead of their own product campaigns. When a user returns to the specific product page, they can see how much they have pledged.

### Not Found
![Not Found](https://res.cloudinary.com/z4rd3n/image/upload/v1638605483/PS/10_l7suyg.png)

Lastly, a simple error page is shown if a user inputs a url that doesn't exist. They can then navigate using the above links to return to other parts of the site.
