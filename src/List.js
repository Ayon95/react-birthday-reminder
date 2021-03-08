import React from 'react';
import { ReactComponent as IconPerson } from './img/user.svg';
import { ReactComponent as IconCake } from './img/birthday-cake.svg';

const List = ({ people }) => {
	const peopleTemplate = people.map((person) => {
		return (
			<div key={person.id} className="person">
				<IconPerson className="icon" />
				<h4 className="person__name">{person.name}</h4>
				<IconCake className="icon" />
				<p className="person__birthday">{person.birthDate} </p>
			</div>
		);
	});
	return (
		<>
			<h3 className="container__title">No Birthdays Today</h3>
			<div className="persons">{peopleTemplate}</div>
		</>
	);
};

export default List;
