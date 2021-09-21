import * as Yup from 'yup';

// edit form object
const editForm = {
	title: 'Edit Birthday',

	formInputs: [
		{ label: 'Name*', name: 'name', type: 'text' },
		{ label: 'Month*', name: 'month', type: 'text', placeholder: 'e.g. Jan' },
		{ label: 'Date*', name: 'date', type: 'text', placeholder: 'e.g. 14' },
		{ label: 'Year', name: 'year', type: 'text', placeholder: 'e.g. 1996' },
	],

	buttonTexts: { disabled: 'Editing Birthday', idle: 'Edit Birthday' },
};

// add form object
const addForm = {
	title: 'Add Birthday',

	formInputs: [
		{ label: 'Name*', name: 'name', type: 'text' },
		{ label: 'Month*', name: 'month', type: 'text', placeholder: 'e.g. Jan' },
		{ label: 'Date*', name: 'date', type: 'text', placeholder: 'e.g. 14' },
		{ label: 'Year', name: 'year', type: 'text', placeholder: 'e.g. 1996' },
	],

	buttonTexts: { disabled: 'Adding Birthday', idle: 'Add Birthday' },
};

// login form object
const loginForm = {
	title: 'Log In',

	formInputs: [
		{ label: 'Email', name: 'email', type: 'email' },
		{ label: 'Password', name: 'password', type: 'password' },
	],

	buttonTexts: { disabled: 'Logging In', idle: 'Log In' },
};

// signup form object
const signupForm = {
	title: 'Sign Up',

	formInputs: [
		{ label: 'Username*', name: 'username', type: 'text' },
		{ label: 'Email*', name: 'email', type: 'email', placeholder: 'e.g. geralt@gmail.com' },
		{
			label: 'Password*',
			name: 'password',
			type: 'password',
			placeholder: 'Enter password (at least 6 characters)',
		},
		{
			label: 'Confirm Password*',
			name: 'passwordConfirm',
			type: 'password',
			placeholder: 'Re-enter password',
		},
	],

	buttonTexts: { disabled: 'Creating Account', idle: 'Sign Up' },
};

// reset-password form object
const resetPasswordForm = {
	title: 'Reset Password',
	formInputs: [{ label: 'Email', name: 'email', type: 'email' }],
	buttonTexts: { disabled: 'Sending Request', idle: 'Reset Password' },
};

// schema object for Add and Edit form validation
const schema = Yup.object({
	name: Yup.string()
		.required('Name is a required field')
		.min(2, 'Name needs to be at least 2 characters long')
		.max(60, 'Name cannot have more than 60 characters')
		.matches(/^[a-z\s]+$/i, 'Not a valid name'),

	month: Yup.string()
		.required('Month is a required field')
		.matches(/jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec/i, 'Not a valid month')
		.max(3, 'Month needs to be in three-letter format'),

	date: Yup.number()
		.required('Date is a required field')
		.typeError('Not a valid date')
		.integer('Not a valid date')
		.min(1, 'Not a valid date')
		.max(31, 'Not a valid date'),
	year: Yup.number()
		.typeError('Not a valid year')
		.max(new Date().getFullYear(), 'Year cannot be greater than the current year'),
});

// login form schema
const loginFormSchema = Yup.object({
	email: Yup.string().email('Not a valid email').required('Email is required'),
	password: Yup.string().required('Password is required'),
});

// schema object for signup form
const signupFormSchema = Yup.object({
	username: Yup.string()
		.min(2, 'Username needs to be at least 2 characters long')
		.max(20, 'Username cannot be more than 20 characters long')
		.required(),
	email: Yup.string().email('Not a valid email').required('Email is required'),
	password: Yup.string()
		.min(6, 'Password needs to be at least 6 characters long')
		.required('Password is required'),
	passwordConfirm: Yup.string()
		.oneOf([Yup.ref('password'), null], 'Passwords must match')
		.required('Please confirm your password'),
});

// reset-password form schema
const resetPasswordFormSchema = Yup.object({
	email: Yup.string().email('Not a valid email').required('Email is required'),
});

function populateFields(id, people, formRef) {
	if (!people) return;
	// find the person that the user wants to edit using the person's id
	const person = people.find((person) => person.id === id);

	formRef.current?.setFieldValue('name', person.name);
	formRef.current?.setFieldValue('month', person.month);
	formRef.current?.setFieldValue('date', person.date);
	formRef.current?.setFieldValue('year', person.year);
}

const formService = {
	addForm,
	editForm,
	loginForm,
	signupForm,
	resetPasswordForm,
	schema,
	signupFormSchema,
	loginFormSchema,
	resetPasswordFormSchema,
	populateFields,
};

export default formService;
