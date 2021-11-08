import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

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