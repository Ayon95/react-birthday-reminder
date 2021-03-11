import UpcomingBirthdaysList from './UpcomingBirthdaysList.js';
import { useContext } from 'react';
import { GlobalContext } from './GlobalContext.js';
import { ReactComponent as LoadingSpinner } from './img/reload.svg';

function UpcomingBirthdays() {
	const { peopleUpcomingBirthdays, isPending, error } = useContext(GlobalContext);
	return (
		<div className="container">
			{error && <p className="error-message">{error}</p>}
			{isPending && (
				<div className="spinner-container">
					<LoadingSpinner className="icon-spinner" />
				</div>
			)}
			{peopleUpcomingBirthdays && <UpcomingBirthdaysList peopleUpcomingBirthdays={peopleUpcomingBirthdays} />}
		</div>
	);
}

export default UpcomingBirthdays;
