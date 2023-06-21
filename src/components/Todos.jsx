import React from 'react'
import { TodoItem } from './TodoItem/TodoItem'
import FlipMove from "react-flip-move";


export const Todos = ({todos, handleUpdate, handleDelete}) => {
  
  const TodoItemMove = React.forwardRef((props, ref) => (
    <div ref={ref}>
      <TodoItem todo={props.todo} handleUpdate={props.handleUpdate} handleDelete={props.handleDelete}/>
    </div>
  ));


  return (
    <FlipMove>
      {todos.map(todo => 
        <TodoItemMove key={todo.id} todo={todo} handleUpdate={handleUpdate} handleDelete={handleDelete}/>
      )}
    </FlipMove>
  )
}
