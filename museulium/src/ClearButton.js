import React from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';



const ClearButton = ({clearCanvas}) => {
  return (
      <Button
        variant="contained"
        color="secondary"
        startIcon={<DeleteIcon />}
        size="small"
        onClick={clearCanvas}
      >
        Clear
      </Button>

  );
}

export default ClearButton;