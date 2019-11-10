import React, { Component } from "react";

const width = 500;
const height = 150;
const margin = { top: 20, right: 10, bottom: 20, left: 30 };

class VisCanvas extends Component {
  constructor(props) {
    super(props);
    this.canvas = null;
    this.timeRange = [0, 100];
    this.levelRange = [-100, 0];

    this.drawChart = this.drawChart.bind(this);
    this.setScales = this.setScales.bind(this);
    this.xScale = this.xScale.bind(this);
    this.yScale = this.yScale.bind(this);
  }

  render() {
    let { data } = this.props;
    if (data !== null && data !== undefined) {
      this.setScales(data);
      this.drawChart(data);
    }
    return (
      <div style={{ position: "relative" }}>
        <canvas ref={"canvas"} id={"layer2"} width={width} height={height} />
      </div>
    );
  }

  xScale(x) {
    return (
      margin.left +
      (x / (this.timeRange[1] - this.timeRange[0])) *
        (width - margin.left - margin.right)
    );
  }

  yScale(y) {
    return (
      height -
      margin.bottom -
      (Math.abs(y) / (this.levelRange[1] - this.levelRange[0])) *
        (height - margin.top - margin.bottom)
    );
  }

  drawChart(data) {
    const { timestamp, level } = data;
    this.canvasContext.clearRect(0, 0, width, height);
    this.canvasContext.beginPath();
    for (let i = 0; i < timestamp.length; i++) {
      if (i === 0) {
        this.canvasContext.moveTo(
          this.xScale(timestamp[i]),
          this.yScale(level[i])
        );
      } else {
        this.canvasContext.lineTo(
          this.xScale(timestamp[i]),
          this.yScale(level[i])
        );
      }
    }
    this.canvasContext.stroke();
    this.canvasContext.closePath();
  }

  setScales(data) {
    const { timestamp } = data;
    this.timeRange = [timestamp[0], timestamp[timestamp.length - 1]];
  }

  componentDidMount() {
    this.canvas = this.refs.canvas;
    this.canvasContext = this.canvas.getContext("2d");
  }
}

export default VisCanvas;
