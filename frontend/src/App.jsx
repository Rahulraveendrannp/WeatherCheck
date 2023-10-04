
import "./App.css";
import { useStateContext } from "./Context";
import { WeatherCard, MiniCard } from "./Components";
import GuageChart from "./Components/GuageChart";
import ColumnChart from "./Components/ColumnChart";
import SplineChart from "./Components/SplineChart";
import GoogleMap from "./Components/GoogleMap";
import NavBar from "./Components/NavBar";
import ScrollTopButton from "./Components/ScrollTopButton";
//images
import Clear from './assets/images/Clear.jpg'
import Fog from './assets/images/fog.png'
import Cloudy from './assets/images/Cloudy.jpg'
import Rainy from './assets/images/Rainy.jpg'
import Snow from './assets/images/snow.jpg'
import Stormy from './assets/images/Stormy.jpg'
import Sunny from './assets/images/Sunny.jpg'
import { useEffect } from "react";

function App() {
  const { weather, thisLocation, values,image,setImage} =useStateContext();
  
  useEffect(() => {
    if (weather.conditions) {
      let imageString = weather.conditions
      if (imageString.toLowerCase().includes('clear')) {
        setImage(Clear)
      } else if (imageString.toLowerCase().includes('cloud')) {
        setImage(Cloudy)
      } else if (imageString.toLowerCase().includes('rain') || imageString.toLowerCase().includes('shower')) {
        setImage(Rainy)
      } else if (imageString.toLowerCase().includes('snow')) {
        setImage(Snow)
      } else if (imageString.toLowerCase().includes('fog')) {
        setImage(Fog)
      } else if (imageString.toLowerCase().includes('thunder') || imageString.toLowerCase().includes('storm')) {
        setImage(Stormy)
      }
    }
  }, [weather])



  return (
    <div className="w-full text-slate-900 relative ">
      <NavBar/> 
      <main  className="w-full flex flex-col md:flex-row gap-12 py-4 px-12 items-center justify-center"
      style={{backgroundImage:`url(${image})`,backgroundSize: 'cover'}}>
        <WeatherCard
          place={thisLocation}
          windspeed={weather.wspd}
          humidity={weather.humidity}
          temperature={weather.temp}
          heatIndex={weather.heatindex}
          iconString={weather.conditions}
          conditions={weather.conditions}
        />

        <div className="flex justify-center mx-[5%] gap-2 flex-wrap w-[100%] md:w-[80%]">
          {values?.slice(1, 7).map((curr) => {
            return (
              <MiniCard
                key={curr.datetime}
                time={curr.datetime}
                temp={curr.temp}
                iconString={curr.conditions}
              />
            );
          })}
        </div>
      </main>
      <SplineChart/>
      <GuageChart />
      <ColumnChart />
      <GoogleMap />
      <ScrollTopButton/>
      
    </div>
  );
}

export default App;
