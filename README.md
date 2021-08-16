# Birthday Reminder

A React application that allows users to create an account, and save birthdays of people that they want to remember. It tells a user if there is any birthday today, and also if there are any upcoming birthdays. Users can also view all the birthdays that they have saved. This application has CRUD functionalities and user authentication. Users have to log in to be able to add, delete, or edit a birthday.

I built this app primarily to practice what I learned after watching some React tutorials and reading the official React documentation. During development of this app, I also learned how to manage forms and implement form validation with Formik and Yup. Furthermore, I learned how to connect a React app to Firebase so that I could set up a database and implement user authentication.

Link to the application: https://birthday-reminder-mushfiq.netlify.app

### Try it out with these fake credentials

- Email: dummy123@email.com
- Password: dummy456

## Tools and technologies used

- create-react-app
- React Hooks
- React Context API
- React Router
- Formik & Yup
- SCSS
- Cloud Firestore
- Firebase Authentication

## Deployment

Deployed with [netlify](https://netlify.com/).

## Get started

Open up a terminal and clone this repo:

```bash
# Clone this repository
$ git clone https://github.com/Ayon95/react-birthday-reminder.git

# Go into the repository
$ cd react-birthday-reminder

# Remove current origin repository
$ git remote remove origin
```

### Firebase setup

Go to Firebase website, and sign in with your Google account. Then, create a new project. You will be able to get the Firebase SDK which will contain information about your project, such as API key, project ID, and so on. Create a `.env` file and add the following environment variables with your own Firebase SDK values:

```dosini
REACT_APP_FIREBASE_API_KEY='your-api-key'
REACT_APP_FIREBASE_AUTH_DOMAIN='your-auth-domain'
REACT_APP_FIREBASE_PROJECT_ID='your-project-id'
REACT_APP_FIREBASE_STORAGE_BUCKET='your-storage-bucket'
REACT_APP_FIREBASE_MESSAGING_SENDER_ID='your-messaging-sender-id'
REACT_APP_FIREBASE_APP_ID='your-app-id'
```

### Creating a Cloud Firestore database

To set up a Cloud Firestore database, go to your Firebase project dashboard and select `Firestore Database`. You also need to update the `Rules` for the database. Add the following snippet of code:

```c
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // an authenticated user can create a document
    // a user can only read his/her own document
    // match logged-in user doc in users collection
    match /users/{userId} {
      allow create: if request.auth.uid != null;
      allow read: if request.auth.uid == userId;
    }

    // match any doc in persons collection
    // the user needs to be authenticated to be able to read, or write
    match /persons/{personId} {
    	allow read, write: if request.auth.uid != null;
    }
  }
}
```

### Firebase authentication

Go to the Firebase project dashboard and select `Authentication`. Then, go to `Sign-in Method` and enable `Email/Password`.

### Installing project dependencies

Install the project dependencies using npm:

```bash
# Install dependencies
$ npm install

# Start development server
$ npm start
```

This will start a development server and open the app in your default browser.

## Creating a production build

In your command line, run the following command:

```bash
# create a production build
$ npm run build
```

This will generate a `build` folder in the project root directory. It contains optimized bundled CSS and JS files. You can use this folder to deploy the app to a hosting service like [netlify](https://netlify.com/).

Do not forget to add the environment variables to your Netlify project by going to `Site settings` > `Build & deploy` > `Environment`.
