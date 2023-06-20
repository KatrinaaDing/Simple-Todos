import { Box, Checkbox, Typography } from "@mui/material";

import React from 'react'
import { TodoDetail } from "./TodoDetail";
import { updateTodo } from "../../api/todosApi";

export const TodoItem = ({ todo, handleUpdate }) => {
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
        border: "1px solid lightgrey",
        // borderColor: "grey.800",
        margin: 2,
        padding: 1,
        borderRadius: 3,
        boxShadow: 8,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Box display="flex" alignItems="center">
        <Checkbox checked={complete} onChange={handleComplete} />
        <Typography variant="subtitle1">{todo.item}</Typography>
      </Box>
      <TodoDetail todo={todo} />
    </Box>
  );
};
