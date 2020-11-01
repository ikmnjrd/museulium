import React from 'react';
import Box from '@material-ui/core/Box';
import {useLocation} from "react-router-dom";

const EndPage = () =>{
  let location = useLocation();
  return(
    <Box>
      Time is up. 
      <img src={location.state.url} alt="drawing-result"></img>
    </Box>
  )
};
export default EndPage;