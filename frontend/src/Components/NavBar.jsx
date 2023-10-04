import { useState } from "react";
import { useStateContext } from "../Context";
import { HiLocationMarker,HiSearch } from "react-icons/hi";
import weatherIcon from "../assets/icons/weather.png";
import { toast } from "react-toastify";
import { useRef, useEffect } from "react";


const NavBar = () => {

    const [input, setInput] = useState("");
    const { setPlace, setLat, setLon } =
      useStateContext();
    const handleLocationClick = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setLat(position.coords.latitude);
          setLon(position.coords.longitude);
  
          fetch(`${import.meta.env.VITE_BACKEND_URL}/api/weather/findplaces?lat=${lat}&lon=${lon}`)
            .then((response) => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              return response.json();
            })
            .then((data) => {
              if (data.status == "success") {
                setPlace(data?.place);
                toast.success("Your Current location updated", {
                  position: toast.POSITION.TOP_CENTER,
                  autoClose: 1500,
                  className: "toast-message",
                });
              } else {
                toast.error(data.status, {
                  position: toast.POSITION.TOP_CENTER,
                  autoClose: 1500,
                  className: "toast-message",
                });
              }
            })
            .catch((error) => {
              console.error("Error fetching data:", error);
              toast.error("Error on finding your current location", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
                className: "toast-message",
              });
            });
        });
      } else {
        alert("this browser have no access to location ");
      }
    };
  
    const submitCity = () => {
      setPlace(input);
      setInput("");
    };

    const autoCompleteRef = useRef();
    const inputRef = useRef();
    const options = {
     fields: ["address_components"]
    };
    
    useEffect(() => {
     autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      options
     );
     
    }, []);
    

  return (
      <nav className="w-full top-0 p-3 bg-black bg-opacity-80 z-50 flex justify-between items-center sticky">
        <div className="flex items-center justify-center mx-2 md:mx-6">
          <img src={weatherIcon} className="w-7 md:w-10 hidden sm:flex " />
          <h1 className="font-bold text-white tracking-wide text-lg md:text-2xl font-serif">
            WeatherCheck
          </h1>
        </div>
        <div className="flex justify-center items-center  mx-2 md:mx-6">
          <div className="bg-white h-5 md:h-8 w-[7rem] sm:w-[10rem] md:w-[15rem] rounded-lg overflow-hidden shadow-2xl flex items-center p-1 md:p-2 gap-1 md:gap-2">
            <input
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  // sumit the form
                  submitCity();
                }
              }}
              ref={inputRef}
              type="text"
              placeholder="Search city"
              className="focus:outline-none w-full text-[#212121] p-2 text-sm md:text-lg"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <HiSearch onClick={()=>{setPlace(input);setInput("")}} className="w-6 h-6 md:w-10 md:h-10 text-slate-700 hover:cursor-pointer"/>
          </div> 
          <HiLocationMarker
            className="h-5 ml-3 md:w-7 md:h-8 text-red-700 hover:cursor-pointer"
            onClick={handleLocationClick}
            title="Click to upadte location"
          />
        </div>
      </nav>
  )
}

export default NavBar