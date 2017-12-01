import React, { Component } from 'react';      
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          <ToDoList />
        </p>
      </div>
    );
  }
}


class ToDoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toDoItems: ["Hello","World","BlaBlaBla"],
      text: ""
    }
    this.deleteBlock = this.deleteBlock.bind(this);
    this.chengeText = this.chengeText.bind(this);
    this.textChange = this.textChange.bind(this);
    this.addItemsArr = this.addItemsArr.bind(this);
  }

  listLenght() {
    return this.state.toDoItems.length;
  }


  addItemsArr(e) {
    e.preventDefault();
    if(!this.state.text) {
      return;
    } else {
    this.setState({toDoItems: this.state.toDoItems.concat(this.state.text)}); 
    this.state.text = "";
    }
  }
  textChange(e) {
    this.setState({text: e.target.value});
    e.preventDefault();
  }

  deleteBlock(index) {
    let arr = this.state.toDoItems;
    arr.splice(index, 1);
    this.setState({toDoItems: arr});
  }
  chengeText(text,index) {
    let arr = this.state.toDoItems;
    arr[index] = text;
    this.setState({toDoItems: arr});
  }

functionFroApp() {
  return (
    (value, key) => 
    <Application key = {key} index = {key} deleteBlock = {this.deleteBlock} chengeText = {this.chengeText} value = {value} />
    )
}
  render() {
    return(
      <form className = "formBorder">
        <div>
          <input type = "checkbox" />
          <input value = {this.state.text} onChange = {this.textChange} placeholder = "Enter new ToDo"/>
          <button onClick = {this.addItemsArr}>Add</button>
          {this.state.toDoItems.map(this.functionFroApp())}
          <div className="infoList">All items {this.listLenght()}</div>
        </div>
      </form>
      );
  }
}


class Application extends Component {
constructor(props) {
  super(props);
  this.state = {
    checkboxChange: false,
    buttonChange: false,
  }
  this.changeBox = this.changeBox.bind(this);
  this.changeButton = this.changeButton.bind(this);
  this.saveButton = this.saveButton.bind(this);
}

  changeBox() {
    this.setState ({checkboxChange: !this.state.checkboxChange})
  }

  itemDelOrNo() {
    if(this.state.checkboxChange) {
      return (<del>{this.props.value}</del>);
    } else {
      return (this.props.value);
    }
  }
 
  checkboxChangeTrue() {
    return(
      <div>
        <input className = "toDoCheck" type = "checkbox" onChange = {this.changeBox} defaultChecked = {this.state.checkboxChange}/>
        <span>{this.itemDelOrNo()}</span>
        <span className = "change" onClick = {this.changeButton}>{String.fromCharCode(9998)}</span>
        <span className = "delete" onClick = {this.deleteButton}>{String.fromCharCode(9746)}</span>
      </div>
      );
    }
  checkboxChangeFalse() {
    return(
      <div>
        <textarea className = "changeArea" ref = "changeText" defaultValue = {this.props.value}></textarea>
        <span className = "save" onClick = {this.saveButton}>{String.fromCharCode(9745)}</span>
      </div>
      );
    }
  
    changeButton() {
     this.setState({buttonChange: true})
    }
    deleteButton() {
      this.props.deleteBlock(this.props.index);
    }
    saveButton() {
      let changeText = this.refs.changeText.value;
      this.props.chengeText(changeText, this.props.index)
      this.setState({buttonChange: false})
    }

  render() {
    return(
    <div>
      {(this.state.buttonChange) ? (this.checkboxChangeFalse()) : (this.checkboxChangeTrue())}
    </div>
    )}
  }

export default App;
