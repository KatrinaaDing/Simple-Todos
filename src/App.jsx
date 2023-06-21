import logo from './logo.svg';
import * as React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import './App.css';
import { NavBar } from './components/NavBar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Todos } from './components/Todos';
import { getTodos, deleteTodo } from './api/todosApi'


function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  const [todos, setTodos] = React.useState([]);

  React.useEffect(() => {
    const fetchTodos = async () => {
      const res = await getTodos();

      setTodos(sortTodos(res));
    };

    fetchTodos();
  }, []);


  const sortTodos = (todos) => {
    return todos
        .sort((a, b) => a.item < b.item ? -1 : 1)
        .sort((a, b) => a.checked - b.checked)
  }

  const handleUpdate = (todo) => {
    const newTodos = todos.map(t => t.id === todo.id ? todo : t)
    setTodos(sortTodos(newTodos))
  }

  const handleDelete = (id) => {
    const handleDeleteTodos = async () => {
      const res = await deleteTodo(id)
      if (res.status !== 200) {
        return alert("Something wrong. Try again later")
      } else {
        const newTodos = todos.filter(t => t.id !== id)
        setTodos(sortTodos(newTodos))
      }
    }
    handleDeleteTodos();
  }

  const handleAddTodo = (todo) => {
    setTodos(sortTodos([...todos, todo]))
  }

  const handleSearch = (searchText) => {
    const handleSearchTodos = async () => {
      const res = await getTodos();
      const newTodos = res.filter(t => t.item.toLowerCase().includes(searchText.toLowerCase()))
      setTodos(sortTodos(newTodos))
    }
    handleSearchTodos();
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar handleAddTodo={handleAddTodo} handleSearch={handleSearch}/>
      <Todos todos={todos} handleUpdate={handleUpdate} handleDelete={handleDelete}/>
    </ThemeProvider>
  );
}

export default App;

