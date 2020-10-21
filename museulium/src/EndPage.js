import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

import {BrowserRouter as Router, Switch, Route, Link, useHistory, useLocation, useParams} from "react-router-dom";
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  endButton: {

  },
}));

const EndPage = () =>{
  const classes = useStyles;


  return(
    <Box>
      Time is up.
    </Box>
  )

};

export default EndPage;