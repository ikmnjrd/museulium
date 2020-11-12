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

const met_json = require('./metId.json');
const metObjs = met_json.metObjIds;
let historyStep = 0;


const useStyles = makeStyles((theme) => ({
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: 30,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
  historyButton: {
    minWidth: 32,
    padding: 12,
  },
  sedondToolbar: {
    backgroundColor: "#5c6bc0",
  },
}));


const KonvaTest = () => {
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

  const openPalette = () => {
    setCanChangeColor(!canChangeColor);
  }

  const setLineStroke = (colorValue) => {
    setColor(colorValue);
  }


  const createImageData = () => {
    stageRef.current.children[0].children.unshift(new Konva.Rect({
      width: window.innerWidth * 0.98,
      height: window.innerHeight *0.8,
      fill: 'white'
    }));
    return stageRef.current.toDataURL({mimeType: "image/jpeg"});
  }

  return (
    <React.Fragment>
      <ColorPicker
        canChangeColor={canChangeColor}
        color={color}
        setLineStroke={setLineStroke}
      />
      <Stage
        width={window.innerWidth * 0.98}
        height={window.innerHeight *0.8}
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
              stroke={line.color}
              strokeWidth={5}
              tension={0.5}
              lineCap="round"
              globalCompositeOperation={
                line.tool === 'eraser' ? 'destination-out' : 'source-over'
              }
            />
          ))}
        </Layer>
      </Stage>

      <AppBar position="fixed" color="primary"  className={classes.appBar}>
        <Toolbar className={classes.sedondToolbar}>
          <Button 
            onClick ={handleUndo}
            color="inherit"
            className={classes.historyButton}
          >
            <UndoIcon />
          </Button>

          <Button 
            onClick={handleRedo}
            color="inherit"
            className={classes.historyButton}
          >
            <RedoIcon />
          </Button>

          <Fab className={classes.fabButton}>
            <CallMet metObj={metObj}/>
          </Fab>

        </Toolbar>
        <Toolbar>
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

          <Button onClick={openPalette}>
            <ColorLensIcon />
          </Button>

          <Tools
            setToolChild={setToolChild}
            getToolChild={getToolChild}
          />
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default KonvaTest;