import React from 'react';

import ToDos from './ToDos';
/**
 * A counter button: tap the button to increase the count.
 */
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [],
    };
    this.createToDo = this.createToDo.bind(this);
    this.updateToDo = this.updateToDo.bind(this);
    this.deleteToDo = this.deleteToDo.bind(this);
  }

  createToDo(data) {
    const body = JSON.stringify({todo: data});
    const headers = new Headers({
      "Content-Type": "application/json"
    });

    fetch('todo/create', { method: 'POST', body, headers }).then((res) => {
      return res.json();
    }).then((item) => {
      this.setState({ todos: [...this.state.todos, item]});
    });
  }

  getToDos() {
    fetch('todo/get').then((res) => {
      return res.json();
    }).then((todos) => {
      this.setState({ todos });
    });
  }

  updateToDo(id, data) {
    const body = JSON.stringify({ todo: data });
    const headers = new Headers({
      "Content-Type": "application/json"
    });

    fetch('todo/update/' + id, { method: 'POST', body, headers}).then((res) => {
      return res.json();
    }).then((item) => {
      const newState = [...this.state.todos];
      newState.forEach((todo) => {
        if (todo._id === item._id) {
          todo.todo = item.todo;
        }
      });
      this.setState({ todos: newState });
    });
  }

  deleteToDo(id) {
    fetch('todo/delete/' + id, { method: 'DELETE'}).then((res) => {
      if(res.ok) {
        this.setState({ todos: this.state.todos.filter((todo) => {
          return todo._id !== id;
        })});
      }
    }); 
  }

  componentWillMount() {
    this.getToDos();
  }
 
  render() {
    return (
      <div className="todos-container">
        <ToDos todos={this.state.todos} onDeleteToDo={this.deleteToDo} onUpdateToDo={this.updateToDo} />
        <input onKeyUp={(event) => {
          if(event.which === 13) {
            this.createToDo(event.target.value);
            event.target.value = '';
          }
        }} />
      </div>
    );
  }
}
export default App;