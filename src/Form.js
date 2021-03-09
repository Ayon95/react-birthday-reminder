import { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Form() {
	const [name, setName] = useState('');
	const [month, setMonth] = useState('');
	const [date, setDate] = useState('');
	const [year, setYear] = useState('');
	const [addingBirthday, setAddingBirthday] = useState(false);
	const [error, setError] = useState(null);

	const history = useHistory();

	function clearInputFields() {
		setName('');
		setMonth('');
		setDate('');
		setYear('');
	}

	async function handleSubmit(event) {
		event.preventDefault();
		try {
			const person = { name, month, date, year };
			setAddingBirthday(true);

			await fetch('http://localhost:8000/people', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(person),
			});

			setAddingBirthday(false);
			setError(null);
			clearInputFields();
			history.push('/all-birthdays');
		} catch (error) {
			setAddingBirthday(false);
			setError(error.message);
		}
	}

	return (
		<div className="form-container">
			<h3 className="container__title form-container__title">Add birthday</h3>
			<form className="form" onSubmit={handleSubmit}>
				<label className="form__label">Name*</label>
				<input
					type="text"
					className="form__input"
					value={name}
					required
					onChange={(event) => setName(event.target.value)}
				/>

				<label className="form__label">Month*</label>
				<input
					type="text"
					className="form__input"
					value={month}
					required
					placeholder="e.g. Jan"
					onChange={(event) => setMonth(event.target.value)}
				/>

				<label className="form__label">Date*</label>
				<input
					type="text"
					className="form__input"
					value={date}
					required
					placeholder="e.g. 14"
					onChange={(event) => setDate(event.target.value)}
				/>

				<label className="form__label">Year</label>
				<input
					type="text"
					className="form__input"
					value={year}
					onChange={(event) => setYear(event.target.value)}
					placeholder="e.g. 1996"
				/>

				{addingBirthday ? (
					<button disabled className="btn">
						Adding Birthday
					</button>
				) : (
					<button className="btn">Submit</button>
				)}

				{error && <p>{error}</p>}
			</form>
		</div>
	);
}

export default Form;
