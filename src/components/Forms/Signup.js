import { useState, useEffect, useRef, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext.js';
import { Formik } from 'formik';
import formService from './../../services/formService';
import FormComponent from './FormComponent';

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
			{(formik) => {
				return (
					<FormComponent
						form={formService.signupForm}
						formik={formik}
						isSubmitting={signingUp}
						error={error}
						inputRef={usernameInputRef}
					>
						<p className="form-container__text">
							Already have an account?{' '}
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

export default Signup;
