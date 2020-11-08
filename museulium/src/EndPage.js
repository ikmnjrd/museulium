import React from 'react';
import Box from '@material-ui/core/Box';
import {useLocation} from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles';
import CallMetText from './CallMetText';
import SocialShare from './SocialShare';
import { FormHelperText, TextareaAutosize } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  subject: {
    padding: 6,
  },
  shareButton: {
    position: "absolute",
    float: "right",
    right: 20,
  }
}));

const EndPage = () =>{
  let location = useLocation();
  const classes = useStyles();

  return(
    <Box>
      <Box className={classes.shareButton}>
        <SocialShare 
          image={location.state.url}
        />
      </Box>
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