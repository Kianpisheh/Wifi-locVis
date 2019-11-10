import "./App.css";
import React, { Component } from "react";
import Papa from "papaparse";
import WifiData from "./WifiData";
import PlotSettigns from "./PlotSettigns";
import VisCanvas from "./VisCanvas";

class App extends Component {
  state = {
    fileLoaded: false,
    wifi: null,
    plotType: "time-level"
  };
  constructor(props) {
    super(props);
    this.wifiLog = null;
    this.wifi = null;
    this.plotType = null;

    // method bindings
    this.load = this.load.bind(this);
    this.load_csv = this.load_csv.bind(this);
    this.handlePlotSettingsChanged = this.handlePlotSettingsChanged.bind(this);

    this.wifiData = new WifiData();
  }

  render() {
    return (
      <div className="main_div">
        <input
          type="file"
          id="input_file_path"
          name="file_input"
          accept=".csv"
          onChange={e => this.load(e.target.files)}
          style={{ padding: "20px 10px" }}
        />
        <PlotSettigns
          data={this.wifiData.data}
          fileLoaded={this.state.fileLoaded}
          settingsChanged={this.handlePlotSettingsChanged}
        ></PlotSettigns>
        <VisCanvas
          fileLoaded={this.fileLoaded}
          wifi={this.state.wifi}
          plotType={this.state.plotType}
          data={this.wifiData.getData(this.state.wifi, this.state.plotType)}
        ></VisCanvas>
      </div>
    );
  }

  handlePlotSettingsChanged(type, value) {
    if (type === "plot_type") {
      this.setState({ plotType: value });
    } else if (type === "wifi") {
      this.setState({ wifi: value });
    }
  }

  load(targetFiles) {
    if (targetFiles.length > 1) {
      return null;
    }
    this.load_csv(targetFiles[0]);
  }

  load_csv(file) {
    const config = {
      complete: results => {
        this.wifiLog = this.wifiData.setData(results.data);
        this.setState({ fileLoaded: true });
      },
      header: false,
      dynamicTyping: true
    };

    Papa.parse(file, config);
  }
}

export default App;
