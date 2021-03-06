import React from 'react';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import IconButton from 'material-ui/lib/icon-button';
import ChevronRightIcon from 'material-ui/lib/svg-icons/navigation/chevron-right';

import TodosStore from './TodosStore';


class Todos extends React.Component {
  
  constructor() {
      super();
      this.styles = {
        float: 'left',
        width: '50%',
        margin: '3%'
      };
      this.state = {
        todos: TodosStore.getAll()
      };
  }

  componentDidMount() {
    TodosStore.subscribe((action) => {
      this.setState({
        todos: action.todos
      });
    });
  }
  
  handleClick(note) {
    TodosStore.remove(note);
  }
  
  create(todo) {
    return (<ListItem 
              onMouseDown={this.handleClick.bind(null, todo)} 
              key={todo.id}
              leftIcon={<ChevronRightIcon />}>
              {todo.text}
           </ListItem>
    );
  }

  render() {
    const todos = this.state.todos.map(this.create.bind(this));
    return (
      <List style={this.styles}>
        {todos}
      </List>
    );
  }
}

export default Todos;
