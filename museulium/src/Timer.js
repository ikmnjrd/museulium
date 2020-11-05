import React, { useState } from 'react';
import {useHistory} from "react-router-dom";
import useInterval from 'use-interval';
import { Typography } from '@material-ui/core';
import ScheduleIcon from '@material-ui/icons/Schedule';


const Timer = ({createImageData,metObj}) =>{
  // timeLimit = x(seconds)
  const [timeLimit, setTimeLimit] = useState(300);
  let history = useHistory();

  useInterval(() => {
    setTimeLimit(timeLimit - 1);
    if(timeLimit <= 0){
      history.push({
        pathname: "/end",
        state: { url: createImageData(), metObjID: metObj }
      });
    }
  }, 1000);


  return(
    <React.Fragment>
      <ScheduleIcon fontSize="small"/>
      <Typography>
        {timeLimit}
      </Typography>
    </React.Fragment>
  )

};
export default Timer;