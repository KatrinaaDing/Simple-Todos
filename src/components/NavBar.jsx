import React from "react";
import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { SearchInput } from "./SearchInput";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

export const NavBar = () => {
  return (
    <AppBar
      position="static"
      sx={{
        borderRadius: 3,
        mt: 2,
        mx: 2,
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
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Box display="flex">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="add"
            sx={{ mr: 2 }}
          >
            <AddRoundedIcon />
          </IconButton>
          <SearchInput />
        </Box>
      </Toolbar>
    </AppBar>
  );
};
