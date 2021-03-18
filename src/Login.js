import { useState, useEffect, useRef, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from './AuthContext.js';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function Login() {
	const [loggingIn, setLoggingIn] = useState(false);
	const [error, setError] = useState(null);

	const { logIn } = useContext(AuthContext);
	const emailInputRef = useRef();
	const formRef = useRef();
	const history = useHistory();

	const schema = Yup.object({
		email: Yup.string().email('Not a valid email').required('Email is required'),
		password: Yup.string().required('Password is required'),
	});

	useEffect(() => {
		emailInputRef.current.focus();
	}, []);

	async function handleSubmit() {
		try {
			setError(null);
			setLoggingIn(true);
			await logIn(formRef.current.values.email, formRef.current.values.password);
			setLoggingIn(false);
			history.push('/');
		} catch (error) {
			setLoggingIn(false);
			if (window.navigator.onLine) setError(error.message);
			else setError('Failed to log in due to connection error.');
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
			innerRef={formRef}
			validateOnBlur={false}
			validateOnChange={false}
		>
			{(formik) => (
				<div className="form-container">
					<h3 className="container__title form-container__title">Log In</h3>
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

						{error && <p className="message message--error">{error}</p>}
					</Form>
					<p className="form-container__text">
						<Link className="form-container__link" to="/reset-password">
							Forgot Password?
						</Link>
					</p>
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
