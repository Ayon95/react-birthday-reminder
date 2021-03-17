import { useState, useRef, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

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
		} catch {
			setError('Failed to reset password');
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
						<label className="form__label">Email</label>
						<Field
							type="email"
							className={`form__input ${formik.touched.email && formik.errors.email && 'form__input--invalid'}`}
							name="email"
							innerRef={emailInputRef}
							placeholder="Enter email"
						/>
						<ErrorMessage component="p" className="form__validation-error-message" name="email" />

						{sendingRequest ? (
							<button disabled className="btn">
								Sending request
							</button>
						) : (
							<button type="submit" className="btn">
								Reset Password
							</button>
						)}

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
