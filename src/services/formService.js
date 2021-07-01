import * as Yup from 'yup';

// schema object for form validation
const schemaObject = {
	name: Yup.string()
		.required('Name is a required field')
		.min(2, 'Name needs to be at least 2 characters long')
		.max(60, 'Name cannot have more than 60 characters')
		.matches(/^[a-z\s]+$/i, 'Not a valid name'),

	month: Yup.string()
		.required('Month is a required field')
		.matches(/jan|feb|mar|apr|may|jun|jul|aug|oct|nov|dec/i, 'Not a valid month')
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
};

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
	schemaObject,
	populateFields,
	signupFormSchema,
	loginFormSchema,
};

export default formService;
