import React, { useState } from 'react';
import {useHistory} from "react-router-dom";
import useInterval from 'use-interval';
import { Typography } from '@material-ui/core';
import ScheduleIcon from '@material-ui/icons/Schedule';
import firebase from './firebase'
import { v4 as uuidv4 } from 'uuid';

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

const pushCloudStorage = async (piece,metObj) => {
  const uuid = uuidv4();
  const storageRef = firebase.storage().ref();
  const pieceRef = storageRef.child('p/' + uuid + '.jpg');

  const pieceId = await pieceRef.putString(piece, 'data_url').then((snapshot) => {
    return pushFirebase(uuid, metObj);
  });

  return pieceId;
}


const Timer = ({createImageData,metObj}) =>{
  const [timeLimit, setTimeLimit] = useState(5);
  let history = useHistory();

  useInterval(() => {
    setTimeLimit(timeLimit - 1);
    if(timeLimit <= 0){
      const img_data = createImageData();
      pushCloudStorage(img_data, metObj).then((pieceId) =>{
        history.push({
          pathname: "/p/" + pieceId ,
          state: { url: img_data, metObjID: metObj }
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