import React from 'react';
import FormInput from './FormInput';
import { Form } from 'formik';

function FormComponent(props) {
	const { form, formik, isSubmitting, error, successMessage, children, inputRef } = props;
	return (
		<div className="form-container">
			<h3 className="container__title form-container__title">{form.title}</h3>
			<Form className="form" autoComplete="off" noValidate>
				{form.formInputs.map((input, index) => (
					<FormInput
						key={input.name}
						label={input.label}
						type={input.type}
						inputName={input.name}
						isTouched={formik.touched[input.name]}
						isInvalid={formik.errors[input.name]}
						// apply the ref to the first input in the list
						{...(index === 0 && { innerRef: inputRef })}
						{...(input.placeholder && { placeholder: input.placeholder })}
					/>
				))}

				<button className="btn" type="submit" disabled={isSubmitting}>
					{isSubmitting ? form.buttonTexts.disabled : form.buttonTexts.idle}
				</button>

				{successMessage && <p className="message message--success">{successMessage}</p>}
				{error && <p className="message message--error">{error}</p>}
			</Form>
			{children}
		</div>
	);
}

export default FormComponent;
