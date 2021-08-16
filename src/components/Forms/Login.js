import { useState, useEffect, useRef, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext.js';
import { Formik } from 'formik';
import formService from '../../services/formService.js';
import FormComponent from './FormComponent';

function Login() {
	const [loggingIn, setLoggingIn] = useState(false);
	const [error, setError] = useState(null);

	const { logIn } = useContext(AuthContext);
	const emailInputRef = useRef();
	const formRef = useRef();
	const history = useHistory();

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
			validationSchema={formService.loginFormSchema}
			onSubmit={handleSubmit}
			innerRef={formRef}
			validateOnBlur={false}
			validateOnChange={false}
		>
			{(formik) => {
				return (
					<FormComponent
						form={formService.loginForm}
						formik={formik}
						isSubmitting={loggingIn}
						error={error}
						inputRef={emailInputRef}
					>
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
					</FormComponent>
				);
			}}
		</Formik>
	);
}

export default Login;
