import { ReactComponent as IconPerson } from '../../img/user.svg';
import { ReactComponent as IconCake } from '../../img/birthday-cake.svg';
import { ReactComponent as IconDelete } from '../../img/rubbish-bin.svg';
import { ReactComponent as IconEdit } from '../../img/edit.svg';
import { Link } from 'react-router-dom';

function Birthday({ person, addedFunctionality, handleDelete }) {
	return (
		<>
			<div className="person">
				<IconPerson className="icon" />
				<h4 className="person__name">{person.name}</h4>

				<IconCake className="icon" />
				<p className="person__birthday">{`${person.month} ${person.date}${
					person.year && ', ' + person.year
				}`}</p>

				{addedFunctionality && (
					<div className="icon__actions">
						<Link to={`/edit-birthday/${person.id}`}>
							<IconEdit title="Edit" className="icon--action icon--edit" />
						</Link>
						<IconDelete
							title="Delete"
							className="icon--action icon--delete"
							onClick={() => handleDelete(person.id)}
						/>
					</div>
				)}
			</div>
		</>
	);
}

export default Birthday;
