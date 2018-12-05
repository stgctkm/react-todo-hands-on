import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      todoList: [
        // {
          // text: 'buy milk.'
        // }
      ],
      newTodo: '',
      filterKey: ''
    }
  }

  // aFunction = function() {
  //   console.log('a')
  // }


  handleOnChange(event) {
    console.log('handler')
    this.setState({
      newTodo: event.target.value
    })
  }

  handleOnKeyDown(e) {
    if (e.keyCode !== 13) {
      return
    }
    this.setState({
      todoList: [
          ...this.state.todoList,
        {
          id : this.uuid(),
          text : this.state.newTodo,
          completed: false
        }
      ],
      newTodo: ''
    })
  }

  handleOnClickCheck(id) {
    this.setState({
      todoList : this.state.todoList.map((todo, _index) => ({
        id: todo.id,
        text: todo.text,
        completed: todo.id === id? !todo.completed : todo.completed
      }))
    })
  }

  handleOnClickFilter(key) {
    console.log(key)
    this.setState({
      filterKey: key
    })
  }

  render() {
    return (
        <Fragment>
          <div>
            <button onClick={() => this.handleOnClickFilter('all')}>all</button>
            <button onClick={() => this.handleOnClickFilter('completed')}>completed</button>
            <button onClick={() => this.handleOnClickFilter('active')}>active</button>
          </div>
          <input type='text' value={this.state.newTodo} onChange={event => this.handleOnChange(event)} onKeyDown={e => this.handleOnKeyDown(e)}/>
          <ul>
            {this.state.todoList.filter(todo => {
              if (this.state.filterKey === 'all') {
                return true
              }
              return this.state.filterKey === 'completed' ? todo.completed : !todo.completed
            }).map((todo, index) => (
                <li key={index}>
                  <input type='checkbox' onClick={() => this.handleOnClickCheck(todo.id)} checked={todo.completed}/>
                  <span className={todo.completed && 'todo-text--completed'}>{todo.text}</span>
                </li>
            ))}
          </ul>
        </Fragment>
    );
  }


  uuid() {
    /*jshint bitwise:false */
    var i, random;
    var uuid = '';

    for (i = 0; i < 32; i++) {
      random = Math.random() * 16 | 0;
      if (i === 8 || i === 12 || i === 16 || i === 20) {
        uuid += '-';
      }
      uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
          .toString(16);
    }

    return uuid;
  }
}


const handleOnChange = (event) => { console.log(event.target.value) }
export default App;
