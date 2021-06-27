import React from 'react';
import { Field, ErrorMessage } from 'formik';

function FormInput(props) {
	const { label, type, inputName, isTouched, isInvalid, ...rest } = props;
	return (
		<>
			<label className="form__label">{label}</label>
			<Field
				type={type}
				className={`form__input ${isTouched && isInvalid && 'form__input--invalid'}`}
				name={inputName}
				{...rest}
			/>
			<ErrorMessage component="p" className="form__validation-error-message" name={inputName} />
		</>
	);
}

export default FormInput;
