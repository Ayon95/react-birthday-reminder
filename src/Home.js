import List from './List';
import useFetch from './useFetch.js';
import { ReactComponent as LoadingSpinner } from './img/reload.svg';

function Home({ people, isPending, error }) {
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
