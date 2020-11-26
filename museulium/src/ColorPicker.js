import React from 'react';
import { CirclePicker } from 'react-color';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  picker: {
    display: 'flex',
    right: 10,
    bottom: 50,
    position: 'absolute',
    zIndex: 1201,
  },
}));


const ColorPicker = ({canChangeColor, color, setLineStroke}) => {

  const classes = useStyles();

  const handleChangeComplete = (color) => {
    setLineStroke(color.hex);
  }

  if (!canChangeColor) {
    return(null);
  } else {
    return (
      <CirclePicker
        className={classes.picker}
        width="200px"
        colors={["#000000","#969696","#0693E3","#8ED1FC","#00D084","#7BDCB5",
          "#FCB900","#795548", "#FF6900", "#EB144C","#F78DA7", "#9900EF"]}
        circleSpacing={4}
        color={color}
        onChangeComplete={handleChangeComplete}
      />
    )
  }
}

export default ColorPicker;