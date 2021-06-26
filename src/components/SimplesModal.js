import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export function SimplesModal(props) {
  const { titulo, open, callbackOpen } = props

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={callbackOpen}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">{titulo}</DialogTitle>
        <DialogContent>
            {props.children}
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={callbackOpen} color="primary">
            Close
          </Button>
        </DialogActions> */}
      </Dialog>
    </React.Fragment>
  );
}