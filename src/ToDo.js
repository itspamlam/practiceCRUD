import React from 'react';

class ToDo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.todo.todo
    };
  }
 
  render() {
    return (
      <div className="todo">
        <input value={this.state.text}
          onChange={(event) => {
            this.setState({ text: event.target.value});
          }} onKeyUp={(event) => {
            if(event.which === 13) {
              this.props.onUpdateToDo(this.props.todo._id, this.state.text);
            }
          }} />
        <button onClick={() => this.props.onDeleteToDo(this.props.todo._id)}>X</button>
      </div>
    );
  }
}
export default ToDo;