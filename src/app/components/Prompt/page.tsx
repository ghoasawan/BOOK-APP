"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface AlertDialogInterface {
  open: boolean;
  setOpen: (open: boolean) => void;
  error?: string;
  message?:string
}

export default function AlertDialog({ open, setOpen, error, message }: AlertDialogInterface) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {error ? error : "Create Account or Login first"}
      </DialogTitle>

      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {error
            ? message
            : "You are not logged in. Please log in or create an account to view the book catalog."}
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
