import React, { Component } from 'react';

const style = {
  border: '1px solid gray',
  backgroundColor: 'white',
};



function ClearButton(props){
  //props.canvasRef.current.getContext('2d').clearRect(0,0,props.canvasRef.current.width, props.canvasRef.current.height);
  //props.getContext().beginPath();

  return (
    <div>
      <button className="clear-button" onClick={props.onClick}>
        Clear
      </button>
    </div>
  );
}


class Canvas extends Component {
  constructor() {
    super();
    this.state = { drawing: false };
    this.canvasRef = React.createRef();
  }

  getContext() {
    console.log(this.canvasRef);
    return this.canvasRef.current.getContext('2d');
  }

  startDrawing(x, y) {
    this.setState({ drawing: true });
    const ctx = this.getContext();
    ctx.moveTo(x, y);
  }

  draw(x, y) {
    if (!this.state.drawing) {
      return;
    }
    const ctx = this.getContext();
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  endDrawing() {
    this.setState({ drawing: false });
    
  }
  Clear(){
    this.canvasRef.current.getContext('2d').clearRect(0,0,this.canvasRef.current.width, this.canvasRef.current.height);
    this.getContext().beginPath();
  }



  render() {
    console.log(this.ref);

    return (
      <div>
        <div>
          <canvas
            ref={this.canvasRef}
            width="500px"
            height="500px"
            onMouseDown={e => this.startDrawing(e.nativeEvent.offsetX, e.nativeEvent.offsetY)}
            onMouseUp={() => this.endDrawing()}
            onMouseLeave={() => this.endDrawing()}
            onMouseMove={e => this.draw(e.nativeEvent.offsetX, e.nativeEvent.offsetY)}
            ontouchstart={e => this.startDrawing(e.nativeEvent.offsetX, e.nativeEvent.offsetY)}
            style={style}
          />
        </div>
        <div>
          <ClearButton
            onClick={() => this.Clear()}
          />
        </div>
      </div>
    );
  }
}
export default Canvas;