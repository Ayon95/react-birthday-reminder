import { useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext.js';
import { db } from './firebase/firebase.js';

function useFirestore(collectionName) {
	const [data, setData] = useState(null);
	const [isPending, setIsPending] = useState(true);
	const [error, setError] = useState(null);

	const { currentUser } = useContext(AuthContext);

	async function loadData(collectionName) {
		try {
			// destructuring docs from query snapshot of the database; get the docs with userId equal to the logged-in user's id
			const { docs } = await db.collection(collectionName).where('userId', '==', currentUser.uid).get();
			const data = docs.map((doc) => doc.data());
			console.log(data);

			// setting data
			setData(data);
			setIsPending(false);
			if (error) setError(null);
		} catch (error) {
			setError(error.message);
			setIsPending(false);
		}
	}

	useEffect(() => {
		loadData(collectionName);
	}, [collectionName, currentUser]);

	return { data, isPending, error };
}

export default useFirestore;
