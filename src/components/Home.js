import BirthdaysTodayList from './Birthdays/BirthdaysTodayList';
import LoadingSpinner from './LoadingSpinner';
import { GlobalContext } from '../contexts/GlobalContext.js';
import { useContext } from 'react';

function Home() {
	// loading data
	const { peopleBirthdaysToday, isPending, error } = useContext(GlobalContext);
	return (
		<div className="container">
			{error && <p className="message message--error">{error}</p>}
			{isPending && <LoadingSpinner />}
			{peopleBirthdaysToday && <BirthdaysTodayList peopleBirthdaysToday={peopleBirthdaysToday} />}
		</div>
	);
}

export default Home;
