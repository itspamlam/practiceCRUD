import React from 'react';

import ToDo from './ToDo';

class ToDos extends React.Component {
 
  render() {
    return (
      <div className="todos">
        {
          this.props.todos.map((todo) => {
            return (
              <ToDo todo={todo}
                key={todo._id}
                onDeleteToDo={this.props.onDeleteToDo}
                onUpdateToDo={this.props.onUpdateToDo} />
            );
          })
        }
      </div>
    );
  }
}
export default ToDos;