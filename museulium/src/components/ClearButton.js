import React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';



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