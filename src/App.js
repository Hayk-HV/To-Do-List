import React, { Component } from 'react';      
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toDoItems: ["Hello","World","BlaBlaBla"],
      text: "",
      select: false
    }
    this.deleteBlock = this.deleteBlock.bind(this);
    this.chengeText = this.chengeText.bind(this);
    this.textChange = this.textChange.bind(this);
    this.addItemsArr = this.addItemsArr.bind(this);
    this.selectAll = this.selectAll.bind(this);
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
    this.setState({text: ""})
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
  selectAll() {
     this.setState({select: !this.state.select})
     console.log(this.state)
  }

functionFroApp() {
  return (
    (value, key) => 
    <Application 
        key = {key} 
        index = {key} 
        deleteBlock = {this.deleteBlock} 
        chengeText = {this.chengeText} 
        value = {value} 
        select = {this.state.select} />
    )
}

  render() {
    return(
      <form className = "formBorder">
        <div className="App">
          <div className="title">todos</div>
            <span>
              <input type = "checkbox" onChange={this.selectAll} checked={this.state.select}/>
              <input className="toDoLine" value = {this.state.text} onChange = {this.textChange} placeholder = "Enter new ToDo"/>
            </span>
          <button className="addButton" onClick = {this.addItemsArr}>Add</button>
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
    checkboxChange: this.props.select,
    buttonChange: false,
  }
  this.changeBox = this.changeBox.bind(this);
  this.changeButton = this.changeButton.bind(this);
  this.saveButton = this.saveButton.bind(this);
  this.deleteButton = this.deleteButton.bind(this);
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
      <div className="enterLine">
        <input className = "toDoCheck" type = "checkbox" onChange = {this.changeBox} checked = {this.state.checkboxChange}/>
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
     this.setState({buttonChange: !this.state.buttonChange})
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
