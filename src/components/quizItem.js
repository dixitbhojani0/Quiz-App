import React from "react";

class QuizItem extends React.Component {
	constructor(props) {
        super(props);
        this.question = this.props.question;
        this.options = this.props.options;
    }

    decodeString (htmlString) {
	    var txt = document.createElement("textarea");
	    txt.innerHTML = htmlString;
	    return txt.value;
	}

	render() {
		return (
			<>
				<p className="mt-3 questionTitle"><span>Question {this.props.id}</span></p>
				<h4 className="question">{this.decodeString(this.question)}</h4>
				<ul>
					{this.options.map((option, index) => (
						<li key={index} className="text-dark p-2 my-3 options">
							{this.decodeString(option)}
						</li>
					))}
				</ul>
			</>
		);
	}
}

export default QuizItem;