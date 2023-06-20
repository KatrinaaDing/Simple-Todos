import logo from './logo.svg';
import * as React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import './App.css';
import { NavBar } from './components/NavBar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Todos } from './components/Todos';


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
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
      <Todos />
    </ThemeProvider>
  );
}

export default App;

