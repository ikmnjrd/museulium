import React, { useState } from 'react';
import { CirclePicker } from 'react-color';


const ColorPicker = ({canChangeColor, color, setLineStroke}) => {

  const handleChangeComplete = (color) => {
    setLineStroke(color.hex);
  }

  if (!canChangeColor) {
    return(null);
  } else {
    return (
      <CirclePicker
        width="200px"
        colors={["#FFFFFF", "#969696", "#000000", "#EB144C", "#f8e352", "#0693E3", "#F78DA7", "#e5ab47", "#00D084", "#ae8dbc", "#e1cea3", "#c08e47"]}
        circleSpacing={4}
        color={color}
        onChangeComplete={handleChangeComplete}
      />
    )
  }
}

export default ColorPicker;