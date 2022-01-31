import React from 'react';
import Loader from './loader-2.gif';

class Spinner extends React.Component { 
	render() {
		return (
			<div>
				<img src={Loader} alt="loading..." className="loader" />
			</div>
		);
	}
}


export default Spinner;