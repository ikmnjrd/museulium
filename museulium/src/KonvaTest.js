import React from 'react';
import { Stage, Layer, Line, Text } from 'react-konva';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {makeStyles} from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import CallMet from './CallMet';
import DialMenu from './DialMenu';
import Tools from './Tools';

import {BrowserRouter as Router, Switch, Route, Link, useHistory, useLocation, useParams} from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
}));



const KonvaTest = () => {
  const [tool, setTool] = React.useState('pen');
  const [lines, setLines] = React.useState([]);
  const isDrawing = React.useRef(false);
  const [noSwipeFlag,setNoSwipeFlag] = React.useState(true);


  const stageRef = React.useRef();
  const classes = useStyles();

  

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, points: [pos.x, pos.y] }]);
    
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
  const getToolChild =() =>{
    return {tool: tool};
  }


  return (
    <React.Fragment>
      <Stage
        width={window.innerWidth * 0.98}
        height={window.innerHeight *0.9}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        ontouchstart={handleMouseDown}
        ontouchmove={handleMouseMove}
        ontouchend={handleMouseUp}
        ref={stageRef}
      >
        <Layer>
          <Text text="Just start drawing" x={5} y={30} />
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke="#df4b26"
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
        <Toolbar>

          <DialMenu
            clearCanvas={clearCanvas}
            handleNoSwipe={handleNoSwipe}
          />

          <Fab className={classes.fabButton}>
            <CallMet />
          </Fab>

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