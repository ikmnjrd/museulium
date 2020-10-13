import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import Backdrop from '@material-ui/core/Backdrop';
import Typography from '@material-ui/core/Typography';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DeleteIcon from '@material-ui/icons/Delete';
import GestureIcon from '@material-ui/icons/Gesture';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles({
  icon: {
    margin: 0,
  },
  backdrop: {
    zIndex: 1800,
  }
});


const DialMenu = ({clearCanvas,handleNoSwipe}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [manageSwipe, setManageSwipe] = React.useState(true);

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
  const classes = useStyles();


  return (
    <React.Fragment>
      <IconButton
        onClick={handleMenu}
        color="inherit"
      >
        <MenuIcon />
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
        >
          
          <MenuItem onClick={handleMennuClear}>
            <ListItemIcon className={classes.icon}>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Clear Canvas</Typography>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleMennuNoSwipe}>
            <ListItemIcon>
              <GestureIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">{manageSwipe ? "enable Swipe": "disable Swipe"}</Typography>
          </MenuItem>
        </Menu>
      </Backdrop>
    </React.Fragment>
  );
}

export default DialMenu;