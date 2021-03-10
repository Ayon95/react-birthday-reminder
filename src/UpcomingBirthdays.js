import UpcomingBirthdaysList from './UpcomingBirthdaysList.js';
import { useContext } from 'react';
import { UpcomingBirthdaysContext } from './UpcomingBirthdaysContext.js';
import useFetch from './useFetch.js';
import { ReactComponent as LoadingSpinner } from './img/reload.svg';

function UpcomingBirthdays() {
	const { peopleFiltered, isPending, error } = useContext(UpcomingBirthdaysContext);
	return (
		<div className="container">
			{error && <p className="error-message">{error}</p>}
			{isPending && (
				<div className="spinner-container">
					<LoadingSpinner className="icon-spinner" />
				</div>
			)}
			{peopleFiltered && <UpcomingBirthdaysList peopleFiltered={peopleFiltered} />}
		</div>
	);
}

export default UpcomingBirthdays;
