import React from 'react';
import Box from '@material-ui/core/Box';
import {useLocation} from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles';
import CallMetText from './CallMetText';

const useStyles = makeStyles((theme) => ({
  subject: {
    padding: 6,
  },
}));

const EndPage = () =>{
  let location = useLocation();
  const classes = useStyles();

  return(
    <Box>
      <Box 
        display="flex"
        justifyContent="center"
        bgcolor="text.disabled"
        className={classes.paintingResult}
      >
        <Box 
        >
          <img 
            src={location.state.url}
            alt="drawing-result"
            width={window.innerWidth *0.5}
            height={window.innerHeight *0.5}
          />
        </Box>
      </Box>

      <Box className={classes.subject}>
        <CallMetText metObj={location.state.metObjID}/>
      </Box>
    </Box>
  )
};
export default EndPage;