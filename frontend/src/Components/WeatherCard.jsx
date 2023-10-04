/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { useDate } from '../Utils/useDate'
import sun from '../assets/icons/sun.png'
import cloud from '../assets/icons/cloud.png'
import fog from '../assets/icons/fog.png'
import rain from '../assets/icons/rain.png'
import snow from '../assets/icons/snow.png'
import storm from '../assets/icons/storm.png'
import wind from '../assets/icons/windy.png'
import '../index.css'

const WeatherCard = ({
  temperature,
  windspeed,
  humidity,
  place,
  heatIndex,
  iconString,
  conditions,
}) => {

  const [icon, setIcon] = useState(sun)
  const { time } = useDate()

  useEffect(() => {
    if (iconString) {
      if (iconString.toLowerCase().includes('cloud')) {
        setIcon(cloud)
      } else if (iconString.toLowerCase().includes('rain')) {
        setIcon(rain)
      } else if (iconString.toLowerCase().includes('clear')) {
        setIcon(sun)
      } else if (iconString.toLowerCase().includes('thunder')) {
        setIcon(storm)
      } else if (iconString.toLowerCase().includes('fog')) {
        setIcon(fog)
      } else if (iconString.toLowerCase().includes('snow')) {
        setIcon(snow)
      } else if (iconString.toLowerCase().includes('wind')) {
        setIcon(wind)
      }
    }
  }, [iconString])

  return (
    <div className='md:w-[22rem] min-w-[18rem] h-[25rem] md:h-[30rem] glassCard p-4'>
      <div className='flex w-full justify-center items-center gap-4 md:mt-8 mb-1 md:mb-4'>
        <img src={icon} alt="weather_icon" />
        <p className='font-bold text-4xl md:text-4xl flex justify-center items-center' >{temperature} &deg;C</p>
      </div>
      <div className='font-bold text-center text-xl'>
        {place}
      </div>
      <div className='w-full flex justify-between items-center mt-4'>
        <div className='flex-1 text-center p-2'>{new Date().toDateString()}</div>
        <div className='flex-1 text-center p-2'>{time}</div>
      </div>
      <div className='w-full flex justify-between items-center mt-4 gap-4'>
        <div className='flex-1 text-center p-2 font-bold bg-blue-500 shadow rounded-lg'>Wind Speed <div className='font-normal'>{windspeed} km/h</div></div>
        <div className='flex-1 text-center p-2 font-bold rounded-lg bg-green-500'>Humidity <div className='font-normal'>{humidity} gm/m&#179;</div></div>
      </div>
      <div className='w-full md:p-3 md:mt-4 flex justify-between items-center'>
        <div className='font-semibold text-lg'>Heat Index</div>
        <div className='text-lg'>{heatIndex ? heatIndex : 'N/A'}</div>
      </div>
      <hr className='bg-slate-600' />
      <div className='w-full p-1  flex justify-center items-center text-xl md:text-xl font-semibold'>
        {conditions}
      </div>
    </div>
  )
}

export default WeatherCard