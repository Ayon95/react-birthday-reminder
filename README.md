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

Open up your command line and clone this repo:

```bash
# Clone this repository
$ git clone https://github.com/rgneville/cv-app

# Go into the repository
$ cd cv-app

# Remove current origin repository
$ git remote remove origin
```

Then you can install the project dependencies using npm:

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
