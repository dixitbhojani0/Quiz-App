import React from 'react';

class Navbar extends React.Component {

	render() {
		return (
			<>
				<nav className="navbar navbar-dark navbar-expand-lg">
				  	<div className="container-fluid">
					    <a className="navbar-brand" href="/">
					    	<img alt="React-Logo" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K" height="20"/> 
					    	<span>React</span>
					    </a>
					    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					      	<span className="navbar-toggler-icon"></span>
					    </button>
			    		<div className="collapse navbar-collapse" id="navbarSupportedContent">
					      	<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						        <li className="nav-item">
						          	<a className="nav-link active" aria-current="page" href="/">Home</a>
						        </li>
					      	</ul>
				    	</div>
				  	</div>
				</nav>
			</>
		); 
	}
}

export default Navbar;