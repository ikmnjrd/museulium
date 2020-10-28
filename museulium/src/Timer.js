import React, { useState } from 'react';
import {useHistory} from "react-router-dom";
import Box from '@material-ui/core/Box';
import useInterval from 'use-interval';


const Timer = () =>{
  const [time, setTime] = useState(0);
  let history = useHistory();

  useInterval(() => {
    setTime(time + 1);
    if(time > 30){
      history.push("/end");
    }
  }, 1000);


  return(
    <Box>
    </Box>
  )

};
export default Timer;