import BirthdaysTodayList from './Birthdays/BirthdaysTodayList';
import { ReactComponent as LoadingSpinner } from '../img/reload.svg';
import { GlobalContext } from '../contexts/GlobalContext.js';
import { useContext } from 'react';

function Home() {
	// loading data
	const { peopleBirthdaysToday, isPending, error } = useContext(GlobalContext);
	return (
		<div className="container">
			{error && <p className="message message--error">{error}</p>}
			{isPending && (
				<div className="spinner-container">
					<LoadingSpinner className="icon-spinner" />
				</div>
			)}
			{peopleBirthdaysToday && <BirthdaysTodayList peopleBirthdaysToday={peopleBirthdaysToday} />}
		</div>
	);
}

export default Home;
