import { useState, useEffect, useRef, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { GlobalContext } from './GlobalContext.js';
import { v4 } from 'uuid';

function Form({ formType, formTitle }) {
	const { addPerson, editPerson } = useContext(GlobalContext);
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

	function clearInputFields() {
		setName('');
		setMonth('');
		setDate('');
		setYear('');
	}

	// focus on the name field whenever formType changes
	useEffect(() => nameInputContainer.current.focus(), [formType]);

	// clear all input fields at the beginning (in case the user goes from the edit form to the add form without editing anything)
	useEffect(() => {
		if (formType === 'add') clearInputFields();
	}, [formType]);

	// need to load data and fill the input fields with existing data when this component is rendered (when the user wants to edit a birthday)
	useEffect(() => {
		if (formType === 'edit') {
			(async () => {
				const response = await fetch(`http://localhost:8000/people/${id}`);
				const person = await response.json();

				setName(person.name);
				setMonth(person.month);
				setDate(person.date);
				setYear(person.year);
			})();
		}
		return null;
	}, [formType]);

	async function handleSubmit(event) {
		event.preventDefault();
		try {
			setAddingBirthday(true);

			if (formType === 'add') {
				const person = { id: v4(), name, month, date, year };
				addPerson(person);

				await fetch('http://localhost:8000/people', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(person),
				});
			}
			if (formType === 'edit') {
				const newPerson = { id, name, month, date, year };
				editPerson(id, newPerson);

				await fetch(`http://localhost:8000/people/${id}`, {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(newPerson),
				});
			}

			setAddingBirthday(false);

			setError(null);
			clearInputFields();
			history.push('/all-birthdays');
		} catch (error) {
			setAddingBirthday(false);
			setError('☹ Failed to submit due to a connection error. Please try again later.');
		}
	}

	return (
		<div className="form-container">
			<h3 className="container__title form-container__title">{formTitle}</h3>
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

export default Form;
