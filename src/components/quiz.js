import React from 'react';
import Spinner from './spinner.js';

class Quiz extends React.Component { 

	constructor(props) {
        super(props);
		this.state = {
			questionCount: 0,
			apiData: '',
			apiCategoryData: '',
			correctAnswer: '',
			options: '',
			category: '',
			difficultyLevel: '',
			type: '',
			loading: true,
			clicked: false,
		}
		this.handleOnAnswerSubmit = this.handleOnAnswerSubmit.bind(this);
		this.loadCategories = this.loadCategories.bind(this);
		this.loadNextQuestion = this.loadNextQuestion.bind(this);
		this.handleOnCategoryChange = this.handleOnCategoryChange.bind(this);
		this.handleOnDifficultyChange = this.handleOnDifficultyChange.bind(this);
		this.handleOnTypeChange = this.handleOnTypeChange.bind(this);
    }
	componentDidMount() {
		this.loadCategories();
		this.loadQuestion();
	}
	shuffle(array) {
		let currentIndex = array.length, randomIndex;

		// While there remain elements to shuffle...
		while (currentIndex !== 0) {

			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;

			// And swap it with the current element.
			[array[currentIndex], array[randomIndex]] = [
				array[randomIndex], array[currentIndex]];
		}

		return array;
	}
    decodeString (htmlString) {
	    let txt = document.createElement("textarea");
	    txt.innerHTML = htmlString;
	    return txt.value;
	}
	getCorrectAnswer(results) {
		if (results) {
			results.forEach(element => {
				if (element.correct_answer) {
					this.setState({
						correctAnswer: element.correct_answer,
					})
				}
			});
		}
	}
	setOptions(results) {
		if (results) {
			results.forEach(element => {
				this.setState({
					options: this.shuffle([element.correct_answer].concat(element.incorrect_answers))
				})
			});
		}
	}
	handleOnAnswerSubmit(e) {
		e.preventDefault();
		this.setState({
			clicked: true
		}); 
		if (this.state.clicked === true) {
			return;
		}
		const answer = e.target.getAttribute("value");
		let options = document.getElementsByClassName('options');
		let i = 0;
		for (i = 0; i < options.length; i++) {
			options[i].classList.remove("success");
			options[i].classList.remove("wrong");
		}
		if (answer) {
			document.getElementById(e.target.id).disable = true;
			this.apiResponse = this.state.apiData;
			if (this.state.correctAnswer && this.state.correctAnswer === answer) {
				document.getElementById(e.target.id).classList.add("success");
			} else {
				document.getElementById(e.target.id).classList.add("wrong");
				for (i = 0; i < options.length; i++) {
					if (this.state.correctAnswer && this.state.correctAnswer === options[i].getAttribute("value")) {
						options[i].classList.add("success");
					}
				}
			}
		}
	}
	loadNextQuestion() {
		this.loadQuestion();
	}
	async loadQuestion() {
		if(this.state.loading !== true) {
			this.setState({
				loading: true,
			});
		}
		this.apiUri = 'https://opentdb.com/api.php?amount=1';
		if(this.state.category && this.state.category.length > 0) {
			this.apiUri += '&category='+this.state.category;
		} 
		if(this.state.difficultyLevel && this.state.difficultyLevel.length > 0) {
			this.apiUri += '&difficulty='+this.state.difficultyLevel;
		}
		if(this.state.type && this.state.type.length > 0) {
			this.apiUri += '&type='+this.state.type;
		}
		let response = await fetch(this.apiUri);
		let apiResponseData = await response.json();

		this.setState({
			questionCount: this.state.questionCount + 1,
			apiData: apiResponseData,
			loading: false,
			clicked: false
		})
		this.setOptions(this.state.apiData.results);
		this.getCorrectAnswer(this.state.apiData.results);
		let options = document.getElementsByClassName('options');
		let i = 0;
		for (i = 0; i < options.length; i++) {
			options[i].classList.remove("success");
			options[i].classList.remove("wrong");
		}
	}
	async loadCategories() {
		if(this.state.loading !== true) {
			this.setState({
				loading: true,
			});
		}
		let response = await fetch('https://opentdb.com/api_category.php');
		let apiResponseData = await response.json();
		if (apiResponseData.trivia_categories) {
			this.setState({
				apiCategoryData: apiResponseData.trivia_categories,
				loading: false,
			})
		}
	}
	async handleOnCategoryChange(e) {
		if(this.state.loading !== true) {
			this.setState({
				loading: true,
			});
		}
		if(e.target.value && e.target.value !== '0') {
			await this.setState({
				questionCount: 0,
				category: e.target.value, 
			});
		} else {
			await this.setState({
				questionCount: 0,
				category: '', 
			});
		}
		document.getElementById('category-0').removeAttribute("disabled");
		this.loadQuestion();
	}
	async handleOnDifficultyChange(e) {
		if(this.state.loading !== true) {
			this.setState({
				loading: true,
			});
		}
		if(e.target.value && e.target.value !== '0') {
			await this.setState({
				questionCount: 0,
				difficultyLevel: e.target.value, 
			});
		} else {
			await this.setState({
				questionCount: 0,
				difficultyLevel: '', 
			});
		}
		document.getElementById('difficulty-any').removeAttribute("disabled");
		this.loadQuestion();
	}
	async handleOnTypeChange(e) {
		if(this.state.loading !== true) {
			this.setState({
				loading: true,
			});
		}
		if(e.target.value && e.target.value !== '0') {
			await this.setState({
				questionCount: 0,
				type: e.target.value, 
			});
		} else {
			await this.setState({
				questionCount: 0,
				type: '', 
			});
		}
		document.getElementById('type-any').removeAttribute("disabled");
		this.loadQuestion();	
	}
	render() {
		return (
			<>
				<div className="container-fluid mt-3">
					<div className="row justify-content-end">
						{/*<div className="filterLabel col-xs-12 col-sm-12 col-md-1 col-xl-1">
							<label id="selectCategoryLabel">Filter BY:</label>
						</div>*/}
						<div className="categoryDropdown col-xs-12 col-sm-12 col-md-2 col-xl-2">
							<select name="category" className='form-select' id="selectCategory" onChange={this.handleOnCategoryChange} size="3">
								<option id="category-0" value='0' onClick={(e)=>{e.target.setAttribute("disabled","disabled")}} disabled>Select Category</option>
								{this.state.apiCategoryData && this.state.apiCategoryData.map((category, index) => (
									<option key={index} id={"category-" + category.id} value={category.id}>{category.name}</option>
								))}
							</select>
						</div>
						<div className="difficultyDropdown col-xs-12 col-sm-12 col-md-2 col-xl-2">
							<select name="difficulty" className='form-select' id="selectDifficulty" onChange={this.handleOnDifficultyChange} size="3">
								<option id="difficulty-any" value='0' onClick={(e)=>{e.target.setAttribute("disabled","disabled")}} disabled>Select Difficulty</option>
								<option id="difficulty-easy" value="easy">Easy</option>
								<option id="difficulty-medium" value="medium">Medium</option>
								<option id="difficulty-hard" value="hard">Hard</option>
							</select>
						</div>
						<div className="typeDropdown col-xs-12 col-sm-12 col-md-2 col-xl-2">
							<select name="type" className='form-select' id="selectType" onChange={this.handleOnTypeChange} size="3">
								<option id="type-any" value='0' onClick={(e)=>{e.target.setAttribute("disabled","disabled")}} disabled>Select type</option>
								<option id="type-multiple" value="multiple">Multiple Choice</option>
								<option id="type-boolean" value="boolean">True / False</option>
							</select>
						</div>
					</div>
{/*					<div className="row justify-content-end">
						<div className="categoryDropdown col-xs-12 col-sm-6 col-md-6 col-xl-5 d-flex">
							<label htmlFor="#selectCategory" id="selectCategoryLabel"></label>
							<select name="difficulty" className='form-select w-75' id="selectDifficulty" onChange={this.handleOnDifficultyChange}>
								<option id="difficulty-any" value='0'>Select Difficulty</option>
								<option id="difficulty-easy" value="easy">Easy</option>
								<option id="difficulty-medium" value="medium">Medium</option>
								<option id="difficulty-hard" value="hard">Hard</option>
							</select>
						</div>
					</div>*/}
				</div>
				{this.state.loading && <Spinner/>}
				{!this.state.loading && 
					<div className="container quiz_container">
						<div className="row">
							<div className="col-xs-12 col-sm-12 col-md-6 col-xl-8 quiz_wrapper">
								{!this.state.loading && this.state.apiData.results && this.state.apiData.results.map((result, index) => (
									<div key={index}>
										<p className="mt-3 questionTitle"><span>Question {this.state.questionCount}</span></p>
										<h4 className="question">{this.decodeString(result.question)}</h4>
										<ul>
											{this.state.options && this.state.options.map((option, index) => (
												<li key={index} className="text-dark p-2 my-3 options" id={"option-" + (index + 1)} onClick={this.handleOnAnswerSubmit} value={this.decodeString(option)}>
													{this.decodeString(option)}
												</li>
											))}
										</ul>
									</div>
								))}
							</div>
							{this.state.clicked && <div className='nextBtn'>
								<button type="button" className="btn" onClick={this.loadNextQuestion}><span>Next </span></button>
							</div>}
							
						</div>
					</div>
				}
			</>
		);
	}
}

export default Quiz;