import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import {Link, useLocation, useParams} from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles';
import CallMetText from './CallMetText';
import SocialShare from './SocialShare';
import firebase from './firebase'

const useStyles = makeStyles(() => ({
  subject: {
    padding: 6,
  },
  shareButton: {
    position: "absolute",
    float: "right",
    right: 20,
  }
}));

const getPieceFirebase = async (id) =>{
  return await firebase.database().ref('/p/'+id).once('value').then(async (snapshot) => {
    return {
      url:  await getStorageItem(snapshot.child("piece").val()), 
      metObjID: snapshot.child("metObjID").val()
    };
  });
}

const getStorageItem = async (id) =>{
  return await firebase.storage().ref('p/'+id+'.jpg').getDownloadURL();
}

const checkLocationValue = async (locState) =>{
  if(typeof(locState) === 'undefined'){
    return true;
  }
  else{
    return false;
  }
}

const EndPage = () =>{
  let location = useLocation();
  let pieceId = useParams().id;
  const classes = useStyles();

  const [error, setError] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);

  checkLocationValue(location.state).then((bool) => {
    if(bool === true){
      getPieceFirebase(pieceId).then((item) =>{
        location.state = item;
        setIsLoaded(true);
      }).catch((e) => {
        setError(e);
      });
    }
    else{
      setIsLoaded(true);
    }
  });

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return(
      <Box>
        <Box className={classes.shareButton}>
          <SocialShare
            image={location.state.url}
          />
        </Box>
        <Box 
          display="flex"
          justifyContent="center"
          bgcolor="text.disabled"
          className={classes.paintingResult}
        >
          <Box 
          >
            <img
              src={location.state.url}
              alt="drawing-result"
              width={(window.innerWidth > 600 ?  600 -6 : window.innerWidth -6) *0.5}
              height={(window.innerHeight -112 -6) *0.5}
            />
          </Box>
        </Box>

        

        <Box className={classes.subject}>
          <CallMetText metObj={location.state.metObjID}/>
        </Box>
        <Box
            display="flex"
            justifyContent="center"
          > 
            <Link to="/play" style={{textDecoration: "none"}}>
              <Button variant="contained" color="primary">
                Play again
              </Button>
            </Link>
          </Box>
      </Box>
    )
  }
};
export default EndPage;