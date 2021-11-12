import React from 'react';
import { CirclePicker } from 'react-color';
import Backdrop from '@mui/material/Backdrop';

const ColorPicker = ({canChangeColor, color, setLineStroke, handlePalette, position}) => {

  const handleChangeComplete = (color) => {
    setLineStroke(color.hex);
  }

  const onClickBackdrop = () => {
    setTimeout( () => {
      handlePalette();
    }, 200);
  }

  if (!canChangeColor) {
    return(null);
  } else {
    return (
      <Backdrop open={true} onClick={onClickBackdrop} style={{zIndex: 1201}}>
        <div style={{position: 'absolute', left: position.x -100 , top: position.y -100, zIndex: 1202}}>
          <CirclePicker
            width="200px"
            colors={["#000000","#969696","#0693E3","#8ED1FC","#00D084","#FFFFFF",
              "#FCB900","#795548", "#FF6900", "#EB144C","#F78DA7", "#9900EF"]}
            circleSpacing={4}
            color={color}
            onChangeComplete={handleChangeComplete}
          />
        </div>
      </Backdrop>
    )
  }
}

export default ColorPicker;