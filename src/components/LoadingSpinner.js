import { ReactComponent as Spinner } from '../img/reload.svg';

import React from 'react';

function LoadingSpinner() {
	return (
		<div className="spinner-container">
			<Spinner className="icon-spinner" />
		</div>
	);
}

export default LoadingSpinner;
