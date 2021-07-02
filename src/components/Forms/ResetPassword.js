import { useState, useRef, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import FormInput from './FormInput';
import formService from '../../services/formService';
import FormComponent from './FormComponent';

function ResetPassword() {
	const [error, setError] = useState(null);
	const [sendingRequest, setSendingRequest] = useState(false);
	const [successMessage, setSuccessMessage] = useState('');

	const emailInputRef = useRef();
	const formRef = useRef();
	const { resetPassword } = useContext(AuthContext);

	async function handleSubmit() {
		try {
			setError(null);
			setSendingRequest(true);
			await resetPassword(formRef.current.values.email);
			setSendingRequest(false);
			setSuccessMessage('Check your inbox for further instructions');
			formRef.current.resetForm();
		} catch (error) {
			if (!window.navigator.onLine) setError('Failed to send request due to a network error.');
			else setError(error.message);
			setSendingRequest(false);
		}
	}

	return (
		<Formik
			initialValues={{
				email: '',
			}}
			validationSchema={formService.resetPasswordFormSchema}
			onSubmit={handleSubmit}
			innerRef={formRef}
			validateOnBlur={false}
			validateOnChange={false}
		>
			{/* {(formik) => (
				<div className="form-container">
					<h3 className="container__title form-container__title">Reset Password</h3>
					<Form className="form" autoComplete="off" noValidate>
						<FormInput
							label="Email"
							type="email"
							inputName="email"
							isTouched={formik.touched.email}
							isInvalid={formik.errors.email}
							innerRef={emailInputRef}
							placeholder="Enter email"
						/>

						<button className="btn" type="submit" disabled={sendingRequest}>
							{sendingRequest ? 'Sending Request' : 'Reset Password'}
						</button>

						{successMessage && <p className="message message--success">{successMessage}</p>}
						{error && <p className="message message--error">{error}</p>}
					</Form>
					<p className="form-container__text">
						<Link className="form-container__link" to="/login">
							Log In
						</Link>
					</p>
				</div>
			)} */}
			{(formik) => {
				return (
					<FormComponent
						form={formService.resetPasswordForm}
						formik={formik}
						isSubmitting={sendingRequest}
						error={error}
						successMessage={successMessage}
						inputRef={emailInputRef}
					>
						<p className="form-container__text">
							<Link className="form-container__link" to="/login">
								Log In
							</Link>
						</p>
					</FormComponent>
				);
			}}
		</Formik>
	);
}

export default ResetPassword;
