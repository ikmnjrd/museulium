import React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const NoSwipeButton = ({handleNoSwipe}) => {
  const [check,setCheck] = React.useState(true);

  const ExecuteCheck = () => {
    setCheck(!check);
    handleNoSwipe();
  }

  return (
      <FormControlLabel
        className=""
        control={
          <Switch
            checked={check}
            color="secondary"
            // inputProps={{ 'aria-label': 'secondary checkbox' }}
            onClick={ExecuteCheck}
          />
        }
        label="Disable Swipe"
      />
  );
}

export default NoSwipeButton;