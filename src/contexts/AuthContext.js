/* We will be using a context for authentication because
we want to be able to access the current user anywhere in our application */

import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase/firebase.js';

export const AuthContext = React.createContext();
const usersRef = db.collection('users');

function AuthContextProvider(props) {
	const [currentUser, setCurrentUser] = useState(null);
	const [currentUserDoc, setCurrentUserDoc] = useState(null);
	const [pending, setPending] = useState(true); // initially, pending will be true because the current user hasn't been set yet

	const signUp = async (email, password, username) => {
		// after the user is successfully created, the promise resolves to a cred object that has a user object
		const cred = await auth.createUserWithEmailAndPassword(email, password);

		// after the user is created, create a user doc with the same id as the uid of created user
		usersRef.doc(cred.user.uid).set({ username });
	};
	const logIn = (email, password) => auth.signInWithEmailAndPassword(email, password);
	const logOut = () => auth.signOut();
	const resetPassword = (email) => auth.sendPasswordResetEmail(email);

	useEffect(() => {
		// adding the listener (observer) to the auth object that will listen for user state changes
		const unsubscribe = auth.onAuthStateChanged((user) => {
			// setting the current user
			setCurrentUser(user);
			// setting the current user doc
			if (user) {
				usersRef
					.doc(user.uid)
					.get()
					.then((doc) => setCurrentUserDoc(doc.data()))
					.catch((error) => console.log(`Error getting document: ${error}`));
			} else setCurrentUserDoc(null);

			setPending(false);
		});
		// we will unsubscribe from this listener when the component unmounts
		return unsubscribe;
	}, []);

	const value = {
		currentUser,
		currentUserDoc,
		signUp,
		logIn,
		logOut,
		resetPassword,
	};

	// we are making sure to only render the components of our application after the current user is set (for the first time)
	return <AuthContext.Provider value={value}>{!pending && props.children}</AuthContext.Provider>;
}

export default AuthContextProvider;
