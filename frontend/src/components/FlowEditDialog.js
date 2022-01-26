import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { CircularProgress } from "@mui/material";

export default function FlowEditDialog(props) {
  return (
    <div>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={props.open}
        onClose={props.handleClose}
      >
        <DialogTitle style={{ margin: 10 }}>Edit flow information</DialogTitle>
        <DialogContent style={{ marginLeft: 10, marginRight: 10 }}>
          <TextField
            margin="normal"
            id="name"
            label="Comment"
            fullWidth
            value={props.comment}
            onChange={(event) => props.onCommentChange(event)}
            multiline
            rows={3}
          />
        </DialogContent>
        <DialogActions style={{ margin: 10 }}>
          <Button onClick={props.handleClose}>Cancel</Button>
          {props.loading ? (
            <CircularProgress size={22} style={{marginLeft: 27, marginRight: 27}} />
          ) : (
            <Button variant="contained" onClick={props.handleSave}>
              Save
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
