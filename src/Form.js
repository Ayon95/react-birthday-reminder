import { useState, useEffect, useRef, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { GlobalContext } from './GlobalContext.js';
import { capitalize } from './helpers.js';
import { v4 } from 'uuid';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function FormComponent({ formType, formTitle }) {
	const { addPerson, editPerson, currentYear } = useContext(GlobalContext);
	const { id } = useParams();

	const [addingBirthday, setAddingBirthday] = useState(false);
	const [error, setError] = useState(null);

	const history = useHistory();
	const formRef = useRef();
	const nameInputRef = useRef(null);

	// schema object for input validation
	const schema = Yup.object({
		name: Yup.string()
			.required('Name is a required field')
			.min(2, 'Name needs to be at least 2 characters long')
			.max(60, 'Name cannot have more than 60 characters')
			.matches(/^[a-z]+$/i, 'Not a valid name'),

		month: Yup.string()
			.required('Month is a required field')
			.matches(/jan|feb|mar|apr|may|jun|jul|aug|oct|nov|dec/i, 'Not a valid month')
			.max(3, 'Month needs to be in three-letter format'),

		date: Yup.number()
			.required('Date is a required field')
			.typeError('Not a valid date')
			.integer('Not a valid date')
			.min(1, 'Not a valid date')
			.max(31, 'Not a valid date'),
		year: Yup.number()
			.typeError('Not a valid year')
			.min(1000, 'This person is ancient!')
			.max(currentYear, 'This person has not been born yet!'),
	});

	// set focus on the name input whenever formType changes
	// clear all input fields at the beginning (in case the user goes from the edit form to the add form without editing anything)
	useEffect(() => {
		nameInputRef.current?.focus();
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

	async function handleSubmit() {
		try {
			setAddingBirthday(true);

			if (formType === 'add') {
				const person = {
					id: v4(),
					name: capitalize(formRef.current.values.name.trim()),
					month: capitalize(formRef.current.values.month.trim()),
					date: formRef.current.values.date,
					year: formRef.current.values.year,
				};
				console.log(formRef.current.values);
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
					name: capitalize(formRef.current.values.name.trim()),
					month: capitalize(formRef.current.values.month.trim()),
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
			validationSchema={schema}
			innerRef={formRef}
			validateOnBlur={false}
		>
			{(formik) => (
				<div className="form-container">
					<h3 className="container__title form-container__title">{formTitle}</h3>
					<Form className="form" autoComplete="off">
						<label className="form__label">Name*</label>
						<Field
							type="text"
							className={`form__input ${formik.touched.name && formik.errors.name && 'form__input--invalid'}`}
							name="name"
							innerRef={nameInputRef}
						/>
						<ErrorMessage component="p" className="form__validation-error-message" name="name" />

						<label className="form__label">Month*</label>
						<Field
							type="text"
							className={`form__input ${formik.touched.month && formik.errors.month && 'form__input--invalid'}`}
							name="month"
							placeholder="e.g. Jan"
						/>
						<ErrorMessage component="p" className="form__validation-error-message" name="month" />

						<label className="form__label">Date*</label>
						<Field
							type="text"
							className={`form__input ${formik.touched.date && formik.errors.date && 'form__input--invalid'}`}
							name="date"
							placeholder="e.g. 14"
						/>
						<ErrorMessage component="p" className="form__validation-error-message" name="date" />

						<label className="form__label">Year</label>
						<Field
							type="text"
							className={`form__input ${formik.touched.year && formik.errors.year && 'form__input--invalid'}`}
							name="year"
							placeholder="e.g. 1996"
						/>
						<ErrorMessage component="p" className="form__validation-error-message" name="year" />

						{addingBirthday ? (
							<button disabled className="btn">
								Adding Birthday
							</button>
						) : (
							<button type="submit" className="btn">
								Submit
							</button>
						)}

						{error && <p className="error-message">{error}</p>}
					</Form>
				</div>
			)}
		</Formik>
	);
}

export default FormComponent;
