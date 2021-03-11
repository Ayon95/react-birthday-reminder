import { useState, useEffect, useRef, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { GlobalContext } from './GlobalContext.js';

function FormEdit() {
	const { editPerson } = useContext(GlobalContext);
	const { id } = useParams();
	// state variables
	const [name, setName] = useState('');
	const [month, setMonth] = useState('');
	const [date, setDate] = useState('');
	const [year, setYear] = useState('');
	const [addingBirthday, setAddingBirthday] = useState(false);
	const [error, setError] = useState(null);

	const history = useHistory();
	const nameInputContainer = useRef(null);

	// focus on the name field when the component first renders
	useEffect(() => nameInputContainer.current.focus(), []);

	// need to load data and fill the input fields with existing data when this component is rendered
	useEffect(() => {
		(async () => {
			const response = await fetch(`http://localhost:8000/people/${id}`);
			const person = await response.json();

			setName(person.name);
			setMonth(person.month);
			setDate(person.date);
			setYear(person.year);
		})();
	}, []);

	async function handleSubmit(event) {
		event.preventDefault();
		try {
			const newPerson = { id, name, month, date, year };
			editPerson(id, newPerson);

			setAddingBirthday(true);
			await fetch(`http://localhost:8000/people/${id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(newPerson),
			});
			setAddingBirthday(false);

			setError(null);
			history.push('/all-birthdays');
		} catch (error) {
			setAddingBirthday(false);
			setError('☹ Failed to submit due to a connection error. Please try again later.');
		}
	}

	return (
		<div className="form-container">
			<h3 className="container__title form-container__title">Edit birthday</h3>
			<form className="form" onSubmit={handleSubmit}>
				<label className="form__label">Name*</label>
				<input
					type="text"
					className="form__input"
					value={name}
					required
					onChange={(event) => setName(event.target.value)}
					ref={nameInputContainer}
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

				{error && <p className="error-message">{error}</p>}
			</form>
		</div>
	);
}

export default FormEdit;
