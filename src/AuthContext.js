/* We will be using a context for authentication because
we want to be able to access the current user anywhere in our application */

import React, { useContext, useEffect, useState } from 'react';
import { auth } from './firebase/firebase.js';

function AuthContextProvider(props) {
	const [currentUser, setCurrentUser] = useState(null);
	const [pending, setPending] = useState(true); // initially, pending will be true because the current user hasn't been set yet

	const signUp = (email, password) => auth.createUserWithEmailAndPassword(email, password);
	const logIn = (email, password) => auth.signInWithEmailAndPassword(email, password);
	const logOut = () => auth.signOut();
	const resetPassword = (email) => auth.sendPasswordResetEmail(email);

	useEffect(() => {
		// adding the listener (observer) to the auth object that will listen for user state changes
		const unsubscribe = auth.onAuthStateChanged((user) => {
			// setting the current user
			setCurrentUser(user);
			setPending(false);
		});
		// we will unsubscribe from this listener when the component unmounts
		return unsubscribe;
	}, []);

	const value = {
		currentUser,
		signUp,
		logIn,
		logOut,
		resetPassword,
	};

	// we are making sure to only render the components of our application after the current user is set (for the first time)
	return <AuthContext.Provider value={value}>{!pending && props.children}</AuthContext.Provider>;
}
