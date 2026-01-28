import { useWeather } from "../WeatherContext";
import './WeatherbyHour.css'
import WeatherHourBody from './WeatherHourBody.jsx'

export default function WeatherbyHour() {
const { currWeather, location } = useWeather();
  let day,time;

    if (currWeather) {
        const dateObj = new Date(currWeather.time);
     time = dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
     day = dateObj.toLocaleDateString([], { weekday: "long" });
    }
    return (
        
        <div className="byHourContainer">
            <div className="byHourHeader">
                <h2>{location.city ? `${location.city}, ${location.country}` : "Detecting location..."}</h2>
                <p><strong>{day + "   " + time}</strong> </p>

            </div>
            <div className="byHourBody">
                <WeatherHourBody/>
            </div>
        </div>
    );
}