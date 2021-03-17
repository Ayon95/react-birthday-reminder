import { useState, useEffect, useRef, useContext } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { GlobalContext } from './GlobalContext.js';
import { AuthContext } from './AuthContext.js';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function Signup() {
	const [signingUp, setSigningUp] = useState(false);
	const [error, setError] = useState(null);

	const { signUp } = useContext(AuthContext);
	const emailInputRef = useRef();
	const formRef = useRef();
	const history = useHistory();

	const schema = Yup.object({
		email: Yup.string().email('Not a valid email').required('Email is required'),
		password: Yup.string().min(6, 'Password needs to be at least 6 characters long').required('Password is required'),
		passwordConfirm: Yup.string()
			.oneOf([Yup.ref('password'), null], 'Passwords must match')
			.required('Please confirm your password'),
	});

	useEffect(() => {
		emailInputRef.current.focus();
	}, []);

	async function handleSubmit() {
		try {
			setError(null);
			setSigningUp(true);
			await signUp(formRef.current.values.email, formRef.current.values.password);
			setSigningUp(false);
			history.push('/');
		} catch (error) {
			setSigningUp(false);
			setError('Failed to create an account');
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
					<h3 className="container__title form-container__title">Sign Up</h3>
					<Form className="form" autoComplete="off" noValidate>
						<label className="form__label">Email*</label>
						<Field
							type="email"
							className={`form__input ${formik.touched.email && formik.errors.email && 'form__input--invalid'}`}
							name="email"
							innerRef={emailInputRef}
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

						{error && <p className="error-message">{error}</p>}
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
