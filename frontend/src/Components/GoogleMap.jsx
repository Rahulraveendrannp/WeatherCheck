import React from 'react'
import GoogleMapReact from 'google-map-react'
import LocationPin from './LocationPin'
import { useStateContext } from '../Context';

const GoogleMap = () => {
    const {place,lat,lon,setLon,setLat,setPlace} =useStateContext();
    const location = {
        address: place,
        lat: lat,
        lng: lon,
      }

      const handleMapClick = (event) => {
        const clickedLat = event.lat;
        const clickedLng = event.lng;
        setLat(clickedLat);
        setLon(clickedLng);
        console.log(`Latitude: ${clickedLat}, Longitude: ${clickedLng}`);
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/weather/findplaces?lat=${clickedLat}&lon=${clickedLng}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            if (data.status == "success") {
              setPlace(data?.place);
              console.log(data?.place)
              
            } else {
              console.log("backend responded with an error")
            }
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      };
  return (
    <div className="map mt-6">

    <div className="google-map w-full h-screen">
      <GoogleMapReact
        bootstrapURLKeys={{ key: '' }}
        center={location}
        defaultZoom={8}
        onClick={handleMapClick}
      >
        <LocationPin
          lat={location.lat}
          lng={location.lng}
          text={location.address}
        />
      </GoogleMapReact>
    </div>
  </div>
  )
}

export default GoogleMap