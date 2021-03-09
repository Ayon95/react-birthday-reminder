import { useState, useEffect } from 'react';

function useFetch(url) {
	const [data, setData] = useState(null);
	const [isPending, setIsPending] = useState(true);
	const [error, setError] = useState(null);

	const abortController = new AbortController();

	async function loadData(url) {
		try {
			const response = await fetch(url, { signal: abortController.signal });
			if (!response.ok) throw new Error(`Error ${response.status}: Could not get data ☹`);
			const data = await response.json();

			setData(data);
			setIsPending(false);
			if (error) setError(null);
		} catch (error) {
			if (error.name === 'AbortError') return;
			// if the fetch was aborted then just return
			else {
				setError(error.message);
				setIsPending(false);
			}
		}
	}

	useEffect(() => {
		loadData(url);
		return () => abortController.abort();
	}, [url]);

	return { data, isPending, error };
}

export default useFetch;
