import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { addTodo } from "../api/todosApi";


export const AddTodoDialog = ({handleAdd}) => {
  const [open, setOpen] = React.useState(false);
  const [note, setNote] = React.useState("");
  const [item, setItem] = React.useState("");
  const [resultText, setResultText] = React.useState("");

  const clear = () => {
    setItem("");
    setNote("");
    setResultText("");
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTitleChange = (e) => {
    setItem(e.target.value);
  };

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };
  
  const handleSubmit = () => {
    if (item === "") {
      setResultText("Item cannot be empty");
      return;
    }
    const newTodo = {
      userId: 1,
      item,
      note,
      checked: false,
    };

    const putTodo = async () => {
      const res = await addTodo(newTodo);
      if (res.status == 201 || res.status == 200) {
        // handleClose()
        setResultText("Succeed! Closing soon...");
        handleAdd(res.data);
        setTimeout(() => {
          // window.location.reload()
          handleClose();
          clear();
        }, 800);
      } else if (res.status == 301) {
        setResultText("Item already exists");
        handleAdd(res.data);
        setTimeout(() => {
          // window.location.reload()
          handleClose();
          clear();
        }, 800);
      }  else {
        // alert("Something wrong. Try again later")
        setResultText("Something wrong. Try again later");
      }
    };
    putTodo();
  };

  return (
    <>
      <Box display="flex">
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="add"
          sx={{ mr: 2 }}
          onClick={handleClickOpen}
        >
          <AddRoundedIcon />
        </IconButton>
      </Box>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>
          <TextField
            label="Item"
            value={item}
            variant="standard"
            size="medium"
            onChange={handleTitleChange}
            required
            inputProps={{ style: { fontSize: "18pt" } }}
          />
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText> */}
          <FormControl fullWidth>
            <TextField
              autoFocus
              margin="normal"
              id="note"
              label="Enter note here"
              type="text"
              onChange={handleNoteChange}
              fullWidth
              multiline
              rows={4}
              value={note}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Typography
            variant="subtitle1"
            color={resultText.startsWith("Suc") ? "green" : "red"}
          >
            {resultText}
          </Typography>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
