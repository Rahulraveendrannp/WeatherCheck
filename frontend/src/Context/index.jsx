import { useContext, createContext, useState, useEffect } from "react";
import axios from 'axios';
import {  toast } from 'react-toastify';
import Clear from '../assets/images/Clear.jpg'


const StateContext = createContext()

export const StateContextProvider = ({ children }) => {
    const [weather, setWeather] = useState({})
    const [values, setValues] = useState([])
    const [place, setPlace] = useState('New Delhi Sector 3G, Delhi, Delhi, 110085, New Delhi')
    const [thisLocation, setLocation] = useState('')
    const [lon,setLon]=useState(77.102493);
    const [lat,setLat]=useState(28.704060);
    const[aqi,setAqi]=useState(0);
    const [image, setImage] = useState(Clear)
    

    // fetch api
    const fetchWeather = async () => {

        const options = {
            method: 'GET',
            url: 'https://visual-crossing-weather.p.rapidapi.com/forecast',
            params: {
                aggregateHours: '24',
                location: place,
                contentType: 'json',
                unitGroup: 'metric',
                shortColumnNames: 0,
            },
            headers: {
                'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
                'X-RapidAPI-Host': 'visual-crossing-weather.p.rapidapi.com'
            }
        }
        try {
            console.log("place of forecast",place)
            const response = await axios.request(options);
            console.log(response)
            const thisData = Object.values(response.data.locations)[0]
            setLocation(thisData.address)
            setValues(thisData.values)
            setWeather(thisData.values[0])
            setLat(thisData.latitude)
            setLon(thisData.longitude)
        } catch (e) {
            console.error(e);
            // if the api throws error.
            toast.error('Data not avialable for this location!', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
                className: 'toast-message'
            });
        }
    }

    useEffect(() => {
        fetchWeather()
    }, [place])

    useEffect(() => {
        // console.log(values)
    }, [values])

    return (
        <StateContext.Provider value={{
            weather,
            setPlace,
            values,
            thisLocation,
            place,
            lon,
            lat,setLat,setLon,
            aqi,setAqi,
            image,setImage
        }}>
            {children}
        </StateContext.Provider>
    )
}


export const useStateContext = () => useContext(StateContext)