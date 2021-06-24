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

const formService = { schemaObject };

export default formService;
