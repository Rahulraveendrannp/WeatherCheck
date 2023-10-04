import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsExporting from "highcharts/modules/exporting";
import { useEffect, useState } from "react";
import { useStateContext } from "../Context";
HighchartsExporting(Highcharts);

const SplineChart = () => {
  const { place } = useStateContext();
  const [temp,setTemp]=useState([])
  const [time,setTime]=useState([])
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/weather/hourlyforecast?location=${place}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("forecast data", data);
        setTemp(data["temp"])
        setTime(data["time"])
      });
  }, [place]);

  const getOptions = (type) => ({
    chart: {
      type,
      
    },
    title: {
      text: "Hourly forecast",
       y:5
    }, xAxis: {
        type: 'datetime',
        title: {
          text: 'Time',
        },
        categories:time, // Format time values
      },
    yAxis: {
      title: {
        text: "Temperature (°C)",
      },
    },
    series: [{ name: "Tempreature", data: temp ,showInLegend: false}],
    credits: {
      enabled: false,
    },
  });
  return (
    <div className="mt-[5%] mx-[3%]">
      <HighchartsReact highcharts={Highcharts} options={getOptions("spline")} />
    </div>
  );
};

export default SplineChart;
