import React, { useState } from 'react';
import {useHistory} from "react-router-dom";
import useInterval from 'use-interval';
import { Typography } from '@material-ui/core';
import ScheduleIcon from '@material-ui/icons/Schedule';
import firebase from './firebase'

const pushFirebase = async (piece,metObj) => {
  const pieceRef = firebase.database().ref('p');
  const newPieceRef = pieceRef.push();
  let pieceId = "";

  newPieceRef.set({
    piece: piece,
    metObjID: metObj
  });

  pieceRef.orderByKey().on('child_added', (snapshot) => {
    pieceId = snapshot.key;
  });

  return pieceId;
}


const Timer = ({createImageData,metObj}) =>{
  const [timeLimit, setTimeLimit] = useState(100);
  let history = useHistory();

  useInterval(() => {
    setTimeLimit(timeLimit - 1);
    if(timeLimit <= 0){
      pushFirebase(createImageData(), metObj).then((pieceId) =>{
        history.push({
          pathname: "/p/" + pieceId ,
          state: { url: createImageData(), metObjID: metObj }
        });
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