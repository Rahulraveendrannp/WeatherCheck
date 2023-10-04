import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsExporting from "highcharts/modules/exporting";
import Highcharts3D from "highcharts/highcharts-3d";
import { useEffect, useState } from "react";
import { useStateContext } from "../Context";
HighchartsExporting(Highcharts);
Highcharts3D(Highcharts);

const ColumnChart = () => {
    const {place} =useStateContext();
    const [maxTemp,setMaxTemp]=useState([]);
    const [minTemp,setMinTemp]=useState([]);
    const [days,setDays]=useState([]);
    useEffect(()=>{

        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/weather/histories?location=${place}`)
          .then((response)=>{
            return response.json();
            
          }).then((data)=>{
            console.log("history data",data)
            setMaxTemp(data["maxTemp"])
            setMinTemp(data["minTemp"])
            setDays(data["days"])
          })
    },[place])


  const getOptions = (type) => ({
    chart: {
      type,
      options3d: {
        enabled: true,
        alpha: 15,
        beta: 30,
        depth: 200,
      },
    },
    title: {
      text: "Last 7 Day History",
    },
    yAxis: {
      title: {
        text: "Tempreature",
        margin: 40,
      },
      labels: {
        format: '{value} °C', // Add the desired formatting here.
      },
    },
    xAxis: {
      categories: days,
      labels: {
        rotation: -45, // Rotate the x-axis labels for better readability.
      },
    },
    plotOptions: {
      [type]: {
        depth: 70,
      },
    },
    series: [
      {
        name: "High Temperature", // Name for the high temperature series.
        data: maxTemp, // High temperature data.
        xAxis: 0,
      },
      {
        name: "Low Temperature", // Name for the low temperature series.
        data: minTemp, // Low temperature data.
        xAxis: 0,
      },
    ],
    credits: {
      enabled: false,
    },
  });
  return (
    <div className="mt-[5%] mx-[3%]">
      <HighchartsReact highcharts={Highcharts} options={getOptions("column")} />
    </div>
  );
};

export default ColumnChart;
