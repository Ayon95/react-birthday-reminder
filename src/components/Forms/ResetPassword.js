import { useState, useRef, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import FormInput from './FormInput';

function ResetPassword() {
	const [error, setError] = useState(null);
	const [sendingRequest, setSendingRequest] = useState(false);
	const [message, setMessage] = useState('');

	const emailInputRef = useRef();
	const formRef = useRef();
	const { resetPassword } = useContext(AuthContext);

	const schema = Yup.object({
		email: Yup.string().email('Not a valid email').required('Email is required'),
	});

	async function handleSubmit() {
		try {
			setError(null);
			setSendingRequest(true);
			await resetPassword(formRef.current.values.email);
			setSendingRequest(false);
			setMessage('Check your inbox for further instructions');
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
			validationSchema={schema}
			onSubmit={handleSubmit}
			innerRef={formRef}
			validateOnBlur={false}
			validateOnChange={false}
		>
			{(formik) => (
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

						{message && <p className="message message--success">{message}</p>}
						{error && <p className="message message--error">{error}</p>}
					</Form>
					<p className="form-container__text">
						<Link className="form-container__link" to="/login">
							Log In
						</Link>
					</p>
				</div>
			)}
		</Formik>
	);
}

export default ResetPassword;
