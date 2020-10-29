import React, { useState } from 'react';
import {useHistory} from "react-router-dom";
import Box from '@material-ui/core/Box';
import useInterval from 'use-interval';


const Timer = ({createImageData}) =>{
  const [time, setTime] = useState(0);
  let history = useHistory();
  
  useInterval(() => {
    setTime(time + 1);
    if(time > 300){
      history.push({
        pathname: "/end",
        state: { url: createImageData() }
      });
    }
  }, 1000);


  return(
    <Box>
    </Box>
  )

};
export default Timer;