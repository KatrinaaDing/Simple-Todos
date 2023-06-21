import React from "react";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { SearchInput } from "./SearchInput";
import { AddTodoDialog } from "./AddTodoDialog";

export const NavBar = ({ handleAddTodo, handleSearch }) => {
  return (
    <AppBar
      position="static"
      sx={{
        // borderRadius: 3,
        // mt: 2,
        // mx: 2,
        width: "auto",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          width: "auto",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Todo List
        </Typography>
        {/* <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton> */}
        <Box display='flex'>
          <AddTodoDialog handleAdd={handleAddTodo} />
          <SearchInput handleSearch={handleSearch}/>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
