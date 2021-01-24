import React from 'react';
import Konva from 'konva';
import { Stage, Layer, Line} from 'react-konva';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {makeStyles} from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import CallMet from './CallMet';
import DialMenu from './DialMenu';
import Tools from './Tools';
import Timer from './Timer';
import Button from '@material-ui/core/Button';
import UndoIcon from '@material-ui/icons/Undo';
import RedoIcon from '@material-ui/icons/Redo';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import ColorPicker from './ColorPicker';

import './stylesheets/main.css';

const met_json = require('./metId.json');
const metObjs = met_json.metObjIds;
let historyStep = 0;

const WIDTH = window.innerWidth > 600 ?  600 -6 : window.innerWidth -6;
const HEIGHT = window.innerHeight -112 -2;


const useStyles = makeStyles((theme) => ({
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: 'auto',
    bottom: 0,
    left: 0,
    right: 0,
  },
  historyButton: {
    minWidth: 32,
    padding: 12,
  },
  ColorButton: {
    // margin: 0,
    // left: 'auto',
    // right: 80,
    // position: 'fixed',
  },
  sedondToolbar: {
    backgroundColor: "#5c6bc0",
  },
}));


const DrawPage = () => {
  const [tool, setTool] = React.useState('pen');
  const [lines, setLines] = React.useState([]);
  const [linesCopy, setLinesCopy] = React.useState([]);
  const isDrawing = React.useRef(false);
  const [noSwipeFlag,setNoSwipeFlag] = React.useState(true);
  const stageRef = React.useRef();
  const classes = useStyles();
  const [canChangeColor, setCanChangeColor] = React.useState(false);
  const [color, setColor] = React.useState('#000000');
  const [metObj] =React.useState(metObjs[Math.floor( Math.random() * metObjs.length)]);

  const [clickPosition, setClickPosition] = React.useState({x: 0, x: 0});


  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, points: [pos.x, pos.y], color }]);
    
    if(noSwipeFlag === true){
      e.evt.preventDefault();
    }
  };

  const handleMouseMove = (e) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];

    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());

    if(noSwipeFlag === true){
      e.evt.preventDefault();
    }
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
    historyStep += 1;
    setLinesCopy(JSON.parse(JSON.stringify(lines)));
  };

  const handleNoSwipe = () =>{
    setNoSwipeFlag(!noSwipeFlag);
  }

  const clearCanvas = () =>{
    stageRef.current.children[0].destroyChildren();
    stageRef.current.clear();
  }

  const setToolChild = (value) =>{
    setTool(value);
  }

  const getToolChild = () =>{
    return {tool: tool};
  }

  const handleUndo = () => {
    if (historyStep === 0){
      return;
    }
    lines.pop();
    setLines(lines.concat());
    historyStep -= 1;
  }

  const handleRedo = () => {
    if (historyStep === linesCopy.length){
      return;
    }
    lines.push(linesCopy[historyStep]);
    setLines(lines.concat());
    historyStep += 1;
  }

  const handlePalette = (e) => {
    if(e){
      setClickPosition({x: e.pageX, y: e.pageY});
    }
    

    setCanChangeColor(!canChangeColor);
  }

  const setLineStroke = (colorValue) => {
    setColor(colorValue);
  }


  const createImageData = () => {
    stageRef.current.children[0].children.unshift(new Konva.Rect({
      width: WIDTH,
      height: HEIGHT,
      fill: 'white'
    }));
    return stageRef.current.toDataURL({mimeType: "image/jpeg"});
  }

  return (
    <React.Fragment>
      <Stage
        width={WIDTH}
        height={HEIGHT}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        ontouchstart={handleMouseDown}
        ontouchmove={handleMouseMove}
        ontouchend={handleMouseUp}
        ref={stageRef}
      >
        <Layer>
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke={line.tool === 'eraser' ? '#FFFFFF' : line.color}
              strokeWidth={5}
              tension={0.5}
              lineCap="round"
            />
          ))}
        </Layer>
      </Stage>
      <ColorPicker
        canChangeColor={canChangeColor}
        color={color}
        setLineStroke={setLineStroke}
        handlePalette={handlePalette}
        position={clickPosition}
      />
      
      
      <div className="bottom-menu">
            <Button 
              onClick ={handleUndo}
              className={classes.historyButton}
            >
              <UndoIcon style={{color: 'white'}}/>
            </Button>

            <Button 
              onClick={handleRedo}
              color="inherit"
              className={classes.historyButton}
            >
              <RedoIcon style={{color: 'white'}}/>
            </Button>
            
            <Button 
              onClick={handlePalette}
              className={classes.ColorButton}
              style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
            >
              <ColorLensIcon style={{color: 'white'}} />
            </Button>

            <div style={{position: 'absolute', right: 6, bottom: 2}}>
              <CallMet metObj={metObj} />
            </div>
      </div>

      <div className="bottom-menu-2">
          <DialMenu
            clearCanvas={clearCanvas}
            handleNoSwipe={handleNoSwipe}
            createImageData={createImageData}
            metObj={metObj}
          />
          <Timer 
            createImageData={createImageData}
            metObj={metObj}
          />
        </div>
    </React.Fragment>
  );
};

export default DrawPage;