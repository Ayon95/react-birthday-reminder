import UpcomingBirthdaysList from './UpcomingBirthdaysList.js';
import { useContext } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext.js';
import LoadingSpinner from '../LoadingSpinner.js';

function UpcomingBirthdays() {
	const { peopleUpcomingBirthdays, isPending, error } = useContext(GlobalContext);
	return (
		<div className="container">
			{error && <p className="message message--error">{error}</p>}
			{isPending && <LoadingSpinner />}
			{peopleUpcomingBirthdays && (
				<UpcomingBirthdaysList peopleUpcomingBirthdays={peopleUpcomingBirthdays} />
			)}
		</div>
	);
}

export default UpcomingBirthdays;
