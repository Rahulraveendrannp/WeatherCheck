const axios = require("axios");

exports.fetchPlace = async (req, res) => {
  try {
    const lat = req.query.lat;
    const lon = req.query.lon;
    console.log(lat, lon);
    const response = await axios.get(
      `${process.env.GoogleUrl}?latlng=${lat},${lon}&key=${process.env.GoogleKey}`
    );
    if (response.status !== 200) {
      res.json({
        status: response.status,
      });
    } else {
      if (response.data.status == "OK") {
        res.json({
          place: response.data?.plus_code?.compound_code,
          status: "success",
        });
      } else {
        res.json({
          status: response.data.status,
        });
      }
    }
  } catch (err) {
    console.log("error on finding palce" + err);
    res.json({
      status: "Invalid request!",
    });
  }
};

exports.fetchHistory = async (req, res) => {
  const currentDate = new Date();
  const endYear = currentDate.getFullYear();
  const endMonth = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month is zero-indexed, so we add 1
  const endDay = String(currentDate.getDate()).padStart(2, "0");
  const endDateTime = `${endYear}-${endMonth}-${endDay}T00:00:00`;

  const startDate = new Date(currentDate);
  startDate.setDate(currentDate.getDate() - 7);
  const startYear = startDate.getFullYear();
  const startMonth = String(startDate.getMonth() + 1).padStart(2, "0");
  const startDay = String(startDate.getDate()).padStart(2, "0");
  const startDateTime = `${startYear}-${startMonth}-${startDay}T00:00:00`;

  const location = req.query.location;
  const apiUrl = `${process.env.VisualCrossUrl}/history`;
  const params = {
    aggregateHours: "24",
    location: location,
    contentType: "json",
    unitGroup: "metric",
    shortColumnNames: 0,
    startDateTime: startDateTime,
    endDateTime: endDateTime,
  };
  const headers = {
    "X-RapidAPI-Key": process.env.RapidApiKey,
    "X-RapidAPI-Host": "visual-crossing-weather.p.rapidapi.com",
  };
  try {
    const response = await axios.get(apiUrl, {
      headers: headers,
      params: params,
    });
    const data = Object.values(response.data.locations)[0].values;
    const maxTemp = [];
    const minTemp = [];
    const days = [];
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    data.forEach((element, i) => {
      if (i < 7) {
        maxTemp.push(element["maxt"]);
        minTemp.push(element["mint"]);
        const date = new Date(element["datetime"]);
        const dayOfWeek = daysOfWeek[date.getDay()];
        days.push(dayOfWeek);
      }
    });
    res.json({ maxTemp: maxTemp, minTemp: minTemp, days: days });
  } catch (err) {
    console.log("error on getting history data" + err);
  }
};

exports.fetchForecast = async (req, res) => {
  const temp = [];
  const timeArray = [];
  const location = req.query.location;
  const apiUrl = `${process.env.VisualCrossUrl}/forecast`;
  const params = {
    aggregateHours: "1",
    location: location,
    contentType: "json",
    unitGroup: "metric",
    shortColumnNames: 0,
  };
  const headers = {
    "X-RapidAPI-Key": process.env.RapidApiKey,
    "X-RapidAPI-Host": "visual-crossing-weather.p.rapidapi.com",
  };

  try {
    const response = await axios.get(apiUrl, {
      headers: headers,
      params: params,
    });
    const data = Object.values(response.data.locations)[0].values;

    data.forEach((element, i) => {
      if (i < 13 && i > 0) {
        temp.push(element["temp"]);
        const timestampString = element["datetimeStr"];
        const date = new Date(timestampString);
        const hours = date.getHours();
        const hours12 = hours % 12 || 12;
        const amOrPm = hours >= 12 ? "PM" : "AM";
        const time = `${hours12} ${amOrPm}`;
        timeArray.push(time);
      }
    });
    res.json({ temp: temp, time: timeArray });
  } catch (err) {
    console.log("error on getting forecast data" + err);
  }
};
