import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function Form() {
	const [name, setName] = useState('');
	const [month, setMonth] = useState('');
	const [date, setDate] = useState('');
	const [year, setYear] = useState('');

	return (
		<section className="container">
			<h3>Add birthday</h3>
			<form className="form">
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
					onChange={(event) => setMonth(event.target.value)}
				/>

				<label className="form__label">Date*</label>
				<input
					type="text"
					className="form__input"
					value={date}
					required
					onChange={(event) => setDate(event.target.value)}
				/>

				<label className="form__label">Year</label>
				<input type="text" className="form__input" value={year} onChange={(event) => setYear(event.target.value)} />

				<button className="btn">Submit</button>
			</form>
		</section>
	);
}

export default Form;
