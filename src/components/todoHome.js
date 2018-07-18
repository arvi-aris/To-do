import React, { Component } from 'react';
import ListItem from './listItem.js';
import CompletedItem from './completedItem.js';

class TodoHome extends Component {

  constructor() {
    super();
    this.state = {
      todoList : [],
      completedList : [],
      currentItem : ''
    }
  }

  componentDidMount() {
    let todoList = localStorage.getItem('todoList') || "[]";
    let completedList = localStorage.getItem('completedList') || "[]";
    todoList = JSON.parse(todoList);
    completedList = JSON.parse(completedList);
    this.setState({
      todoList: todoList,
      completedList: completedList
    });
  }

  addToList = () => {
    let item = this.state.currentItem
    let todoList = this.state.todoList;
    todoList.push({
      item: item,
      timeStamp: new Date().getTime()
    });
    this.setState({
      todoList: todoList,
      currentItem: ''
    });
    document.getElementById('current-todo-item').value = '';
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }

  updateValue = (event) => {
    this.setState({
      currentItem : event.target.value
    });
  }

  updateItem = (newItem, index) => {
    let todoList = this.state.todoList;
    todoList[index].item = newItem;
    this.setState({
      todoList: todoList
    });
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }

  completeItem = (id) => {
    let todoList = this.state.todoList;
    let completedList = this.state.completedList;
    let completedItem = todoList[id];
    todoList.splice(id, 1);
    completedList.push(completedItem);
    this.setState({
      todoList: todoList,
      completedList: completedList
    });
    localStorage.setItem('todoList', JSON.stringify(todoList));
    localStorage.setItem('completedList', JSON.stringify(completedList));
  }

  undoComplete = (id) => {
    let todoList = this.state.todoList;
    let completedList = this.state.completedList;
    let currentItem = completedList[id];
    completedList.splice(id, 1);
    todoList.push(currentItem);
    this.setState({
      todoList: todoList,
      completedList: completedList
    });
    localStorage.setItem('todoList', JSON.stringify(todoList));
    localStorage.setItem('completedList', JSON.stringify(completedList));
  }

  deleteItem = (id, type) => {
    switch (type) {
      case 'todo': {
        let todoList = this.state.todoList;
        todoList.splice(id, 1);
        this.setState({
          todoList: todoList
        });
        localStorage.setItem('todoList', JSON.stringify(todoList));
      }
      case 'completed': {
        let completedList = this.state.completedList;
        completedList.splice(id, 1);
        this.setState({
          completedList: completedList
        });
        localStorage.setItem('completedList', JSON.stringify(completedList));
      }
    }
  }

  render() {
    return (
      <div className="todo-home todo-area">
        <div className="section">
          <div className="grid-container header">
            <div className="grid-item">ADD ITEM</div>
          </div>
          <div className="grid-container add-block">
            <div className="grid-item grid-input"><input type="text" className="todo-input" id="current-todo-item" value={this.state.currentItem} onChange={this.updateValue}/></div>
            <div className="grid-item grid-button"><button type="button" className="todo-button" onClick={this.addToList} disabled={!this.state.currentItem}> Add </button> </div>
          </div>
        </div>
        <div className="section">
          <div className="grid-container header">
            <div className="grid-item">TODO</div>
          </div>
          <div className="add-block">
            {this.state.todoList.map((listItem, index) => <ListItem key={index} id={index} listItem={listItem} onUpdate={this.updateItem} onComplete={this.completeItem} onDelete={this.deleteItem}/>)} 
          </div>
        </div>
        <div className="section">
          <div className="grid-container header">
            <div className="grid-item">COMPLETED</div>
          </div>
          <div className="add-block">
            {this.state.completedList.map((listItem, index) => <CompletedItem key={index} id={index} listItem={listItem} onUndoComplete={this.undoComplete} onDelete={this.deleteItem}/>)} 
          </div>
        </div>
      </div>
    );
  }
}

export default TodoHome;
