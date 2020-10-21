import React, { useEffect, useState } from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {BrowserRouter as Router, Switch, Route, Link, useHistory, useLocation, useParams} from "react-router-dom";

import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import useInterval from 'use-interval';

const useStyles = makeStyles((theme) => ({
  startButton: {

  },
}));

const Timer = () =>{
  const classes = useStyles;
  const [time, setTime] = useState(0);
  let history = useHistory();

  useInterval(() => {
    setTime(time + 1);
    if(time > 3){
      console.log("time up");
      history.push("/end");
    }
  }, 1000);


  return(
    <Box>
      {time}
    </Box>
  )

};

export default Timer;