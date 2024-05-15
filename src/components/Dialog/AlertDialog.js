import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import './AlertDialog.css';

export default function AlertDialog({ title, content, cancelText, okayText, handleAlertClose, handleAlertOkay }) {
  return (
    <>
      <Dialog
        open={true}
        onClose={handleAlertClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className='warning-dialog'
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAlertClose}>{cancelText}</Button>
          <Button onClick={handleAlertOkay} autoFocus>
            {okayText}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
