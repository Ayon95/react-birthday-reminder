import { useState, useEffect, useRef, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { GlobalContext } from './GlobalContext.js';
import { v4 } from 'uuid';
import { Formik, Form, Field } from 'formik';

function FormComponent({ formType, formTitle }) {
	const { addPerson, editPerson } = useContext(GlobalContext);
	const { id } = useParams();

	const [addingBirthday, setAddingBirthday] = useState(false);
	const [error, setError] = useState(null);

	const history = useHistory();
	const formRef = useRef();
	const nameInputRef = useRef(null);

	// set focus on the name input whenever formType changes
	useEffect(() => {
		nameInputRef.current?.focus();
	}, [formType]);

	// clear all input fields at the beginning (in case the user goes from the edit form to the add form without editing anything)
	useEffect(() => {
		if (formType === 'add') formRef.current.resetForm();
	}, [formType]);

	// need to load data and fill the input fields with existing data when this component is rendered (when the user wants to edit a birthday)
	useEffect(() => {
		if (formType === 'edit') {
			(async () => {
				const response = await fetch(`http://localhost:8000/people/${id}`);
				const person = await response.json();

				formRef.current?.setFieldValue('name', person.name);
				formRef.current?.setFieldValue('month', person.month);
				formRef.current?.setFieldValue('date', person.date);
				formRef.current?.setFieldValue('year', person.year);
			})();
		}
		return null;
	}, [formType]);

	async function handleSubmit(event) {
		event.preventDefault();
		try {
			setAddingBirthday(true);
			console.log(formRef.current.values);

			if (formType === 'add') {
				const person = {
					id: v4(),
					name: formRef.current.values.name,
					month: formRef.current.values.month,
					date: formRef.current.values.date,
					year: formRef.current.values.year,
				};
				addPerson(person);

				await fetch('http://localhost:8000/people', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(person),
				});
			}
			if (formType === 'edit') {
				const newPerson = {
					id,
					name: formRef.current.values.name,
					month: formRef.current.values.month,
					date: formRef.current.values.date,
					year: formRef.current.values.year,
				};
				editPerson(id, newPerson);

				await fetch(`http://localhost:8000/people/${id}`, {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(newPerson),
				});
			}

			setAddingBirthday(false);

			setError(null);
			formRef.current.resetForm();
			history.push('/all-birthdays');
		} catch (error) {
			setAddingBirthday(false);
			setError('☹ Failed to submit due to a connection error. Please try again later.');
		}
	}

	return (
		<Formik
			initialValues={{
				name: '',
				month: '',
				date: '',
				year: '',
			}}
			onSubmit={handleSubmit}
			innerRef={formRef}
		>
			{() => (
				<div className="form-container">
					<h3 className="container__title form-container__title">{formTitle}</h3>
					<Form className="form" onSubmit={handleSubmit}>
						<label className="form__label">Name*</label>
						<Field type="text" className="form__input" name="name" required innerRef={nameInputRef} />

						<label className="form__label">Month*</label>
						<Field type="text" className="form__input" name="month" required placeholder="e.g. Jan" />

						<label className="form__label">Date*</label>
						<Field type="text" className="form__input" name="date" required placeholder="e.g. 14" />

						<label className="form__label">Year</label>
						<Field type="text" className="form__input" name="year" placeholder="e.g. 1996" />

						{addingBirthday ? (
							<button disabled className="btn">
								Adding Birthday
							</button>
						) : (
							<button className="btn">Submit</button>
						)}

						{error && <p className="error-message">{error}</p>}
					</Form>
				</div>
			)}
		</Formik>
	);
}

export default FormComponent;
