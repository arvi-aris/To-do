import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TodoHome from './components/todoHome.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <TodoHome />
      </div>
    );
  }
}

export default App;
