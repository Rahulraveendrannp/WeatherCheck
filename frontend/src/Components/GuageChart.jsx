import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsMore from "highcharts/highcharts-more";
import Table from "./Table";
import { useEffect, useState } from "react";
import { useStateContext } from "../Context";
import { fetchPollutionData } from "../Utils/Api";
HighchartsExporting(Highcharts);
HighchartsMore(Highcharts);

const GuageChart = () => {
  const[components,setComponents]=useState([]);
  const {aqi,setAqi, lat,lon} = useStateContext()
  const getOptions = {
    chart: {
      type: "gauge",
      // Set your desired height here
    },
    title: {
      text: "Air Quality Index",
      plotBackgroundColor: "rgba(255, 255, 255, 0)",
    },
    yAxis: {
      min: 0,
      max: 5,
      title: {
        text: "Speed",
      },
      plotBands: [
        {
          from: 0,
          to: 1,
          color: "#0EA407",
          thickness: 50,
        },
        {
          from: 1,
          to: 2,
          color: "#DFDF3D",
          thickness: 50,
        },
        {
          from: 2,
          to: 3,
          color: "#F38903",
          thickness: 50,
        },
        {
          from: 3,
          to: 4,
          color: "#F1350F",
          thickness: 50,
        },
        {
          from: 4,
          to: 5,
          color: "#B40707",
          thickness: 50,
        },
      ],
    },
    series: [
      {
        name:'AQi',
        data: [aqi],
      },
    ],
    credits: {
      enabled: false,
    },
    pane: {
      startAngle: -90,
      endAngle: 89.9,
      background: null,
      center: ["50%", "70%"],
      size: "120%",
    },
  };
  useEffect(()=>{
    const apiUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_AQI_API_KEY}`;
   fetchPollutionData(apiUrl,lat,lon)
    .then((data) => {
      setAqi(data.list[0].main.aqi)
      setComponents(data.list[0].components)
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
    });
  },[lat,lon])

  return (
    <div className="flex flex-col sm:flex-row items-center justify-evenly">
      <div className="mt-5 md:mt-24 w-[97%] mx-auto md:mx-0 md:w-[50%] md:h-[30%]">
        <HighchartsReact highcharts={Highcharts} options={getOptions}/>
        <div className="legend mx-auto">
          <span style={{ backgroundColor: "#0EA407" }} /> Good
          <span style={{ backgroundColor: "#DFDF3D" }} /> Moderate
          <span style={{ backgroundColor: "#F38903" }} /> Unhealthy
          <span style={{ backgroundColor: "#F1350F" }} /> High
          <span style={{ backgroundColor: "#B40707" }} /> Hazardous
        </div>
      </div>
      <Table components={components}/>
    </div>
  );
};

export default GuageChart;
