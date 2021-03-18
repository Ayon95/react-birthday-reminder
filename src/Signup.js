import { useState, useEffect, useRef, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from './AuthContext.js';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function Signup() {
	const [signingUp, setSigningUp] = useState(false);
	const [error, setError] = useState(null);

	const { signUp } = useContext(AuthContext);
	const usernameInputRef = useRef();
	const formRef = useRef();
	const history = useHistory();

	const schema = Yup.object({
		username: Yup.string()
			.min(2, 'Username needs to be at least 2 characters long')
			.max(20, 'Username cannot be more than 20 characters long')
			.required(),
		email: Yup.string().email('Not a valid email').required('Email is required'),
		password: Yup.string().min(6, 'Password needs to be at least 6 characters long').required('Password is required'),
		passwordConfirm: Yup.string()
			.oneOf([Yup.ref('password'), null], 'Passwords must match')
			.required('Please confirm your password'),
	});

	useEffect(() => {
		usernameInputRef.current.focus();
	}, []);

	async function handleSubmit() {
		try {
			setError(null);
			setSigningUp(true);
			await signUp(formRef.current.values.email, formRef.current.values.password, formRef.current.values.username); // async operation
			setSigningUp(false);
			history.push('/');
		} catch (error) {
			setSigningUp(false);
			if (!window.navigator.onLine) setError('Failed to create account due to a network error');
			else setError(error.message); // if an account with the email already exists
		}
	}
	return (
		<Formik
			initialValues={{
				username: '',
				email: '',
				password: '',
				passwordConfirm: '',
			}}
			validationSchema={schema}
			onSubmit={handleSubmit}
			innerRef={formRef}
			validateOnBlur={false}
			validateOnChange={false}
		>
			{(formik) => (
				<div className="form-container">
					<h3 className="container__title form-container__title">Sign Up</h3>
					<Form className="form" autoComplete="off" noValidate>
						<label className="form__label">Username*</label>
						<Field
							type="text"
							className={`form__input ${formik.touched.username && formik.errors.username && 'form__input--invalid'}`}
							name="username"
							innerRef={usernameInputRef}
							placeholder="Enter your username"
						/>
						<ErrorMessage component="p" className="form__validation-error-message" name="username" />

						<label className="form__label">Email*</label>
						<Field
							type="email"
							className={`form__input ${formik.touched.email && formik.errors.email && 'form__input--invalid'}`}
							name="email"
							placeholder="e.g. geralt@gmail.com"
						/>
						<ErrorMessage component="p" className="form__validation-error-message" name="email" />

						<label className="form__label">Password*</label>
						<Field
							type="password"
							className={`form__input ${formik.touched.password && formik.errors.password && 'form__input--invalid'}`}
							name="password"
							placeholder="Enter password (at least 6 characters)"
						/>
						<ErrorMessage component="p" className="form__validation-error-message" name="password" />

						<label className="form__label">Confirm Password*</label>
						<Field
							type="password"
							className={`form__input ${
								formik.touched.passwordConfirm && formik.errors.passwordConfirm && 'form__input--invalid'
							}`}
							name="passwordConfirm"
							placeholder="Re-enter password"
						/>
						<ErrorMessage component="p" className="form__validation-error-message" name="passwordConfirm" />

						{signingUp ? (
							<button disabled className="btn">
								Creating account
							</button>
						) : (
							<button type="submit" className="btn">
								Sign Up
							</button>
						)}

						{error && <p className="message message--error">{error}</p>}
					</Form>
					<p className="form-container__text">
						Already have an account?{' '}
						<Link className="form-container__link" to="/login">
							Log In
						</Link>
					</p>
				</div>
			)}
		</Formik>
	);
}

export default Signup;
