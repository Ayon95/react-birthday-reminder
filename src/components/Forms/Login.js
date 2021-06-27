import { useState, useEffect, useRef, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext.js';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormInput from './FormInput.js';

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
			else setError('Failed to log in due to a connection error.');
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
						<FormInput
							label="Email"
							type="email"
							inputName="email"
							isTouched={formik.touched.email}
							isInvalid={formik.errors.email}
							innerRef={emailInputRef}
							placeholder="Enter email"
						/>

						<FormInput
							label="Password"
							type="password"
							inputName="password"
							isTouched={formik.touched.password}
							isInvalid={formik.errors.password}
							placeholder="Enter password"
						/>

						<button className="btn" type="submit" disabled={loggingIn}>
							{loggingIn ? 'Logging In' : 'Log In'}
						</button>

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
