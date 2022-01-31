import React from 'react';
import Navbar from './components/navbar.js';
import Quiz from './components/quiz.js';
import './App.css';


class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Quiz />
      </div>
    );
  }
}

export default App;
