import React from 'react';
import Box from '@material-ui/core/Box';
import {useLocation} from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles';
import CallMet from './CallMet';

const useStyles = makeStyles((theme) => ({
  paintingResult: {
    margin: 12,
  },
}));

const EndPage = () =>{
  let location = useLocation();
  const classes = useStyles();

  return(
    <Box>
      <img 
        src={location.state.url}
        alt="drawing-result"
        width={window.innerWidth *0.5}
        height={window.innerHeight *0.5}
        border="2"
      />
      <CallMet metObj={location.state.metObjID}/>
    </Box>
  )
};
export default EndPage;