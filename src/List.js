import React from 'react';

const List = ({ people }) => {
	const peopleTemplate = people.map((person) => {
		return (
			<article key={person.id} className="person">
				<img src={person.image} alt={person.name} />
				<div>
					<h4>{person.name}</h4>
					<p>{person.age} years </p>
				</div>
			</article>
		);
	});
	return (
		<>
			<h3>No Birthdays Today</h3>
			{peopleTemplate}
		</>
	);
};

export default List;
