import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import Backdrop from '@material-ui/core/Backdrop';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import GestureIcon from '@material-ui/icons/Gesture';
import PublishIcon from '@material-ui/icons/Publish';
import { makeStyles } from '@material-ui/core/styles';
import {useHistory} from "react-router-dom";
import firebase from './firebase'
import { v4 as uuidv4 } from 'uuid';


const useStyles = makeStyles({
  icon: {
    margin: 0,
  },
  backdrop: {
    zIndex: 1800,
  }
});

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


const DialMenu = ({clearCanvas,handleNoSwipe, createImageData, metObj}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [manageSwipe, setManageSwipe] = React.useState(true);
  let history = useHistory();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMennuNoSwipe =() =>{
    handleNoSwipe();
    setManageSwipe(!manageSwipe);
    setAnchorEl(null);
  }

  const handleMennuClear =() =>{
    clearCanvas();
    setAnchorEl(null);
  }

  const submitFinish =() => {
    const img_data = createImageData();


    pushCloudStorage(img_data, metObj).then((pieceid) => {
      history.push({
        pathname: "/p/"+pieceid,
        state: { url: img_data, metObjID: metObj }
      });
    });
    
  }

  const classes = useStyles();

  return (
    <React.Fragment>
      <IconButton
        onClick={handleMenu}
        color="inherit"
      >
        <MenuIcon style={{color: 'white'}} />
      </IconButton>
      <Backdrop open={open} className={classes.backdrop}>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left"
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          style={{zIndex: 3000}}
        >
          
          <MenuItem onClick={handleMennuClear}>
            <ListItemIcon className={classes.icon}>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Clear Canvas" />
          </MenuItem>

          <Divider />
          
          <MenuItem onClick={handleMennuNoSwipe}>
            <ListItemIcon>
              <GestureIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText >{manageSwipe ? "Enable Swipe": "Disable Swipe"}</ListItemText>
          </MenuItem>

          <Divider />

          <MenuItem onClick={submitFinish}>
            <ListItemIcon>
              <PublishIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Submit to finish" />
          </MenuItem>

        </Menu>
      </Backdrop>
    </React.Fragment>
  );
}

export default DialMenu;