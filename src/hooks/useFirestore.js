import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext.js';
import { db } from '../firebase/firebase.js';

function useFirestore(collectionName) {
	const [data, setData] = useState(null);
	const [isPending, setIsPending] = useState(true);
	const [error, setError] = useState(null);

	const { currentUser } = useContext(AuthContext);

	useEffect(() => {
		async function loadData(collectionName) {
			try {
				setError(null);
				// destructuring docs from query snapshot of the database; get the docs with userId equal to the logged-in user's id
				const { docs } = await db
					.collection(collectionName)
					.where('userId', '==', currentUser.uid)
					.orderBy('name')
					.get();
				const data = docs.map((doc) => doc.data());

				// setting data
				setData(data);
				setIsPending(false);
			} catch (error) {
				setError('Failed to fetch data');
				setIsPending(false);
			}
		}

		loadData(collectionName);
	}, [collectionName, currentUser, error]);

	return { data, isPending, error };
}

export default useFirestore;
