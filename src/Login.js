import { useState, useEffect, useRef, useContext } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { GlobalContext } from './GlobalContext.js';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function Login() {
	const emailInputRef = useRef();
	const [loggingIn, setLoggingIn] = useState(false);
	const [error, setError] = useState(null);

	const schema = Yup.object({
		email: Yup.string().email('Not a valid email').required('Email is required'),
		password: Yup.string().required('Password is required'),
	});

	useEffect(() => {
		emailInputRef.current.focus();
	}, []);

	async function handleSubmit() {
		try {
			setLoggingIn(true);
			console.log('User account created');
			setLoggingIn(false);
		} catch (error) {
			setLoggingIn(false);
			setError('Failed to log in');
		}
	}
	return (
		<Formik
			initialValues={{
				email: '',
				password: '',
				passwordConfirm: '',
			}}
			validationSchema={schema}
			onSubmit={handleSubmit}
		>
			{(formik) => (
				<div className="form-container">
					<h3 className="container__title form-container__title">Log In</h3>
					<Form className="form" autoComplete="off">
						<label className="form__label">Email</label>
						<Field
							type="email"
							className={`form__input ${formik.touched.email && formik.errors.email && 'form__input--invalid'}`}
							name="email"
							innerRef={emailInputRef}
							placeholder="e.g. geralt@gmail.com"
						/>
						<ErrorMessage component="p" className="form__validation-error-message" name="email" />

						<label className="form__label">Password</label>
						<Field
							type="password"
							className={`form__input ${formik.touched.password && formik.errors.password && 'form__input--invalid'}`}
							name="password"
							placeholder="Enter password"
						/>
						<ErrorMessage component="p" className="form__validation-error-message" name="password" />

						{loggingIn ? (
							<button disabled className="btn">
								Logging in
							</button>
						) : (
							<button type="submit" className="btn">
								Log In
							</button>
						)}

						{error && <p className="error-message">{error}</p>}
					</Form>
					<p className="form-container__text">
						Need an account?{' '}
						<Link className="form-container__link" to="/signup">
							Sign Up
						</Link>
					</p>
				</div>
			)}
		</Formik>
	);
}

export default Login;
