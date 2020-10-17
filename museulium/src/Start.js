import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

import {BrowserRouter as Router, Switch, Route, Link, useHistory, useLocation, useParams} from "react-router-dom";
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  startButton: {

  },
}));

const Start = () =>{
  const classes = useStyles;

  return(
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height={window.innerHeight}
    >
      <Link to="/play" >
        <Button variant="contained" color="primary">
          play now
        </Button>
      </Link>
      
    </Box>
  )

};

export default Start;