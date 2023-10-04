import { Icon } from "@iconify/react";
import locationIcon from "@iconify/icons-mdi/map-marker";

const LocationPin = ({ text }) => (
  <div className="pin">
     
    <Icon icon={locationIcon} className="pin-icon" style={{ fontSize: '30px',color: 'C31515' }} />
    <div className="w-36 ml-4 bg-white p-2 rounded-xl">
        <p className=" font-normal text-xs">{text}</p>
        </div>
  </div>
);

export default LocationPin;
