import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, IconButton, Switch, TextField, Typography } from "@mui/material";
import React from 'react'
import MenuIcon from "@mui/icons-material/Menu";
import { updateTodo } from "../../api/todosApi";

export const TodoDetail = ({ todo }) => {
  const [open, setOpen] = React.useState(false);
  const [note, setNote] = React.useState(todo.note);
  const [item, setItem] = React.useState(todo.item);
  const [checked, setChecked] = React.useState(todo.checked);
  const [resultText, setResultText] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTitleChange = (e) => {
    setItem(e.target.value)
  }

  const handleNoteChange = (e) => {
    setNote(e.target.value)
  }
  
  const handleCompleteChange = (e) => {
    setChecked(e.target.checked)
  }

  const handleConfirm = () => {
    const updatedTodo = {
      ...todo,
      item,
      note,
      checked
    }

    const putTodo = async () => {
      const res = await updateTodo(updatedTodo)
      if (res.status === 200) {
        // handleClose()
        setResultText("Succeed! Closing soon...")
        setTimeout(() => {
          window.location.reload()
          handleClose()
        }, 800)

      } else {
        // alert("Something wrong. Try again later")
        setResultText("Something wrong. Try again later")

      }
    }

    putTodo()
  }

  const DetailButton = () => (
    <IconButton
      onClick={handleClickOpen}
      size="large"
      edge="start"
      color="inherit"
      aria-label="menu"
      sx={{ mr: 2 }}
    >
      <MenuIcon />
    </IconButton>
  );

  return (
    <>
      <DetailButton />
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
            <FormControlLabel
              control={<Switch />}
              onChange={handleCompleteChange}
              value={checked}
              label="Complete"
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Typography variant="subtitle1" color={resultText.startsWith("Suc") ? "green" : "red"}>{resultText}</Typography>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
