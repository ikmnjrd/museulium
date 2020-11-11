import React, { useState } from 'react';
import { CirclePicker } from 'react-color';


const ColorPicker = ({flag, color, setLineStroke}) => {

  const inLineStyles = {
    swatchSquare: {
      minWidth: 20,
      minHeight: 20,
      margin: '1px 2px',
      cursor: 'pointer',
      boxShadow: '0 0 2px rgba(0, 0, 0, .6)',
    }
  }

  const handleChangeComplete = (color) => {
    setLineStroke(color.hex);
  }

  if (!flag) {
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