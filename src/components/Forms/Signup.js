import { useState, useEffect, useRef, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext.js';
import { Formik, Form } from 'formik';
import FormInput from './FormInput.js';
import formService from './../../services/formService';

function Signup() {
	const [signingUp, setSigningUp] = useState(false);
	const [error, setError] = useState(null);

	const { signUp } = useContext(AuthContext);
	const usernameInputRef = useRef();
	const formRef = useRef();
	const history = useHistory();

	useEffect(() => {
		usernameInputRef.current.focus();
	}, []);

	async function handleSubmit() {
		try {
			setError(null);
			setSigningUp(true);
			await signUp(
				formRef.current.values.email,
				formRef.current.values.password,
				formRef.current.values.username
			); // async operation
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
			validationSchema={formService.signupFormSchema}
			onSubmit={handleSubmit}
			innerRef={formRef}
			validateOnBlur={false}
			validateOnChange={false}
		>
			{(formik) => (
				<div className="form-container">
					<h3 className="container__title form-container__title">Sign Up</h3>
					<Form className="form" autoComplete="off" noValidate>
						<FormInput
							label="Username*"
							type="text"
							inputName="username"
							isTouched={formik.touched.username}
							isInvalid={formik.errors.username}
							innerRef={usernameInputRef}
						/>

						<FormInput
							label="Email*"
							type="email"
							inputName="email"
							isTouched={formik.touched.email}
							isInvalid={formik.errors.email}
							placeholder="e.g. geralt@gmail.com"
						/>

						<FormInput
							label="Password*"
							type="password"
							inputName="password"
							isTouched={formik.touched.password}
							isInvalid={formik.errors.password}
							placeholder="Enter password (at least 6 characters)"
						/>

						<FormInput
							label="Confirm Password*"
							type="password"
							inputName="passwordConfirm"
							isTouched={formik.touched.passwordConfirm}
							isInvalid={formik.errors.passwordConfirm}
							placeholder="Re-enter password"
						/>

						<button className="btn" type="submit">
							{signingUp ? 'Creating account' : 'Sign Up'}
						</button>

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
