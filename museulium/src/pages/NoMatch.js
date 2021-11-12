import React from 'react';
import {useLocation} from "react-router-dom";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const NoMatch = () =>{
  let location = useLocation();
  return(
    <Box
      display="flex"
      justifyContent="center"
    >
      <Typography variant="h4">
        404 {location.pathname}
      </Typography>
    </Box>
  )
};
export default NoMatch;