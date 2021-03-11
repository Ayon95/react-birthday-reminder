import List from './List';
import useFetch from './useFetch.js';
import { ReactComponent as LoadingSpinner } from './img/reload.svg';
import { GlobalContext } from './GlobalContext.js';
import { useContext } from 'react';

function Home() {
	// loading data
	const { people, isPending, error } = useContext(GlobalContext);
	// const { data: people, isPending, error } = useFetch('http://localhost:8000/people');
	return (
		<div className="container">
			{error && <p className="error-message">{error}</p>}
			{isPending && (
				<div className="spinner-container">
					<LoadingSpinner className="icon-spinner" />
				</div>
			)}
			{people && <List people={people} needAllBirthdays={false} />}
		</div>
	);
}

export default Home;
