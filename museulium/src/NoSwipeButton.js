import React from 'react';

const NoSwipeButton = ({handleNoSwipe}) => {
  return (

      <label>Enable Swipe in Canvas
        <input type="checkbox" onClick={handleNoSwipe}></input>
      </label>
  );
}

export default NoSwipeButton;