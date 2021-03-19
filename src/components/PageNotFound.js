import { ReactComponent as SadFace } from '../img/sad.svg';
import { Link } from 'react-router-dom';

function PageNotFound() {
	return (
		<div className="page-not-found">
			<SadFace className="icon-sad-face" />
			<h1 className="page-not-found__heading-1">404 Error</h1>
			<h2 className="page-not-found__heading-2">Sorry, we could not find the page you were looking for.</h2>
			<Link to="/" className="btn">
				Go back
			</Link>
		</div>
	);
}

export default PageNotFound;
