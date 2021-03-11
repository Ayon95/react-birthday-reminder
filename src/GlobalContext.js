import React from 'react';
import useFetch from './useFetch.js';
import { useState, useEffect } from 'react';

export const GlobalContext = React.createContext();
function GlobalContextProvider(props) {
	const { data, isPending, error } = useFetch('http://localhost:8000/people');
	const [people, setPeople] = useState(data);
	console.log('i am called');

	/* update people whenever the value of people prop changes Initially the value of people will be null.
    When the data is loaded from the API, people will no longer be null.
	useEffect will call setPeople and people data will be updated with the data that was loaded.
	We are using data as a dependency here, so that whenever data changes, people state variable will be updated */
	useEffect(() => setPeople(data), [data]);
	console.log(people);

	function addPerson(person) {
		setPeople([...people, person]);
	}

	function deletePerson(id) {
		setPeople(people.filter((person) => person.id !== id));
	}

	const value = { people, isPending, error, addPerson, deletePerson };

	return <GlobalContext.Provider value={value}>{props.children}</GlobalContext.Provider>;
}

export default GlobalContextProvider;
