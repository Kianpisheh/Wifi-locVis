class WifiData {
  constructor() {
    this.data = {};
  }
  setData(rawData) {
    let wifiList = [];
    // create the wifi list
    for (let i = 0; i < rawData.length; i++) {
      if (rawData[i].length !== 4) {
        // ignore if there is something wron with the datapoibt
        continue;
      }
      rawData[i][2] = rawData[i][2].slice(1, rawData[i][2].length);
      if (!wifiList.includes(rawData[i][2])) {
        wifiList.push(rawData[i][2]);
      }
    }

    // initialize the data
    wifiList.forEach(bssid => {
      this.data[bssid] = { name: "", timestamp: [], level: [] };
    });

    // form the data in the proper format
    for (let i = 0; i < rawData.length; i++) {
      if (rawData[i].length !== 4) {
        // ignore if there is something wrong with the datapoibt
        continue;
      }
      if (rawData[i][1] !== " " || rawData[i][1] !== "") {
        if (this.data[rawData[i][2]] === undefined) {
          console.log(rawData[i][2]);
        }
        this.data[rawData[i][2]]["name"] = rawData[i][1];
      }
      this.data[rawData[i][2]]["timestamp"].push(rawData[i][0] - rawData[0][0]);
      this.data[rawData[i][2]]["level"].push(rawData[i][3]);
    }
  }

  getData(bssid, plotType) {
    return this.data[bssid];
  }
}

export default WifiData;
