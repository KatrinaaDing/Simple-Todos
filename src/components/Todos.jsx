import React from 'react'
import { getTodos } from '../api/todosApi'
import { TodoItem } from './TodoItem/TodoItem'
import FlipMove from "react-flip-move";

export const Todos = () => {
  const [todos, setTodos] = React.useState([])

  const TodoItemMove = React.forwardRef((props, ref) => (
    <div ref={ref}>
      <TodoItem todo={props.todo} handleUpdate={props.handleUpdate} />
    </div>
  ));

  const updateTodo = (todo) => {
    const newTodos = todos.map(t => t.id === todo.id ? todo : t)
    setTodos(sortTodos(newTodos))
  }

  const sortTodos = (todos) => {
    return todos
        .sort((a, b) => a.item < b.item ? -1 : 1)
        .sort((a, b) => a.checked - b.checked)
  }

  React.useEffect(() => {
    const fetchTodos = async () => {
      const res = await getTodos();
      
      setTodos(sortTodos(res))
    }

    fetchTodos()
  }, [])

  return (
    <FlipMove>
      {todos.map(todo => 
        <TodoItemMove key={todo.id} todo={todo} handleUpdate={updateTodo} />
      )}
    </FlipMove>
  )
}
