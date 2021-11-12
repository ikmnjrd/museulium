import React, { useState } from 'react';
import {useHistory} from "react-router-dom";
import useInterval from 'use-interval';
import { Box, Typography } from '@mui/material';
import {makeStyles} from '@mui/styles';
import ScheduleIcon from '@mui/icons-material/Schedule';
import firebase from '../firebase'
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

const useStyles = makeStyles((theme) => ({
  typography: {
    display: 'inline-block',
  },
}));


const Timer = ({createImageData,metObj}) =>{
  const [timeLimit, setTimeLimit] = useState(90);
  let history = useHistory();
  const classes = useStyles();

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
    <Box style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <ScheduleIcon fontSize="small" className={classes.typography} style={{color: 'white'}}/>
      <Typography className={classes.typography} style={{color: 'white'}}>
        {timeLimit}
      </Typography>
    </Box>
  )

};
export default Timer;