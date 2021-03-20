import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
	// apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	// authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	// projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	// storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	// messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	// appId: process.env.REACT_APP_FIREBASE_APP_ID,
	apiKey: 'AIzaSyDsgP0TGX7XMmPAs-P2QzNu5j50CZhKXUI',
	authDomain: 'birthday-reminder-production.firebaseapp.com',
	projectId: 'birthday-reminder-production',
	storageBucket: 'birthday-reminder-production.appspot.com',
	messagingSenderId: '1008029321820',
	appId: '1:1008029321820:web:db3d780defc7d70be8b499',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

// initialize authentication
export const auth = firebaseApp.auth();
// initialize firestore
export const db = firebaseApp.firestore();

export default firebaseApp;
