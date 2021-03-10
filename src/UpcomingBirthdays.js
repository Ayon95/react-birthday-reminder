import UpcomingBirthdaysList from './UpcomingBirthdaysList.js';
import useFetch from './useFetch.js';
import { ReactComponent as LoadingSpinner } from './img/reload.svg';

function UpcomingBirthdays() {
	// loading data
	const { data: people, isPending, error } = useFetch('http://localhost:8000/people');
	return (
		<div className="container">
			{error && <p className="error-message">{error}</p>}
			{isPending && (
				<div className="spinner-container">
					<LoadingSpinner className="icon-spinner" />
				</div>
			)}
			{people && <UpcomingBirthdaysList people={people} />}
		</div>
	);
}

export default UpcomingBirthdays;
