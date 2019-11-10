import React from "react";

function PlotSettigns(props) {
  const { data, fileLoaded } = props;

  const plotList = ["time-level", "duration-level"];

  if (!fileLoaded) {
    return null;
  }

  return (
    <div id="vis_canvas_div">
      <select
        className="plot_selectors"
        key={"plot_selector"}
        onChange={event => {
          props.settingsChanged("plot_type", event.target.value);
        }}
      >
        {plotList.map(plot => (
          <option key={plot}>{plot}</option>
        ))}
      </select>
      <select
        className={"plot_selectors"}
        key={"wifi_selector"}
        onChange={event => {
          props.settingsChanged("wifi", event.target.value);
        }}
      >
        {Object.keys(data).map(bssid => (
          <option key={bssid}>{bssid}</option>
        ))}
      </select>
    </div>
  );
}

export default PlotSettigns;
