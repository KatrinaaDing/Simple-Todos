import { Box, Checkbox, Typography } from "@mui/material";

import React from 'react'
import { TodoDetail } from "./TodoDetail";
import { updateTodo } from "../../api/todosApi";

export const TodoItem = ({ todo, handleUpdate, handleDelete }) => {
  const [complete, setComplete] = React.useState(todo.checked);

  const handleComplete = (e) => {
    setComplete(e.target.checked);
    const putTodo = async () => {
      const res = await updateTodo({ ...todo, checked: e.target.checked });
      if (res.status === 200) {
        // window.location.reload()
        handleUpdate(res.data);
      } else {
        alert("Something wrong. Try again later");
      }
    };

    putTodo();
  };

  return (
    <Box
      sx={{
        width: "auto",
        height: "auto",
        border: "1.5px solid lightgrey",
        marginX: 5,
        marginY: 2,
        padding: 1,
        borderRadius: 3,
        boxShadow: 7,
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: complete ? "inherit" : "inherit",
        ":hover": {
          transform: "scale(1.03)",
          transition: "all 0.2s ease-in-out",
        },
        ":not(:hover)": {
          transform: "scale(1)",
          transition: "all 0.2s ease-in-out",
        }
        
      }}
    >
      <Box display="flex" alignItems="center">
        <Checkbox
          checked={complete}
          onChange={handleComplete}
          color="default"
        />
        <div>
          <Typography
            variant="body1"
            color={todo.checked ? "grey.600" : "inherit"}
            sx={{ textDecoration: complete ? "line-through" : "none" }}
          >
            {todo.item}
          </Typography>
          <Typography variant="subtitle2" color="grey.500">
            {todo.note !== "" ? todo.note : "  "}
          </Typography>
        </div>
      </Box>
      <TodoDetail
        todo={todo}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
      />
    </Box>
  );
};
