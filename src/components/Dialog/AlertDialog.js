import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog({ title, cancelText, okayText, handleAlertClose, handleOkay }) {
  return (
    <>
      <Dialog
        open='true'
        onClose={handleAlertClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          WARNING!
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          {title}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAlertClose}>{cancelText}</Button>
          <Button onClick={handleOkay} autoFocus>
            {okayText}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
