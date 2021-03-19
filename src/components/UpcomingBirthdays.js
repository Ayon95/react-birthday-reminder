import UpcomingBirthdaysList from './UpcomingBirthdaysList.js';
import { useContext } from 'react';
import { GlobalContext } from '../contexts/GlobalContext.js';
import { ReactComponent as LoadingSpinner } from '../img/reload.svg';

function UpcomingBirthdays() {
	const { peopleUpcomingBirthdays, isPending, error } = useContext(GlobalContext);
	return (
		<div className="container">
			{error && <p className="message message--error">{error}</p>}
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
