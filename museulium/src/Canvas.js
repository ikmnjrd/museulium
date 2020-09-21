import React, { Component } from 'react';

const style = {
  border: '1px solid gray',
  backgroundColor: 'white',
};

class Canvas extends Component {
  constructor() {
    super();
    this.state = { drawing: false };
    this.canvasRef = React.createRef();
  }

  getContext() {
    console.log(this);
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

  render() {
    return (
      <canvas
        ref={this.canvasRef}
        width="500px"
        height="500px"
        onMouseDown={e => this.startDrawing(e.nativeEvent.offsetX, e.nativeEvent.offsetY)}
        onMouseUp={() => this.endDrawing()}
        onMouseLeave={() => this.endDrawing()}
        onMouseMove={e => this.draw(e.nativeEvent.offsetX, e.nativeEvent.offsetY)}
        style={style}
      />
    );
  }
}
export default Canvas;