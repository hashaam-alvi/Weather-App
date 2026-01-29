import { useWeather } from "../WeatherContext";
import "./TenDay.css";
import TenDayBody from "./TenDayBody.jsx";

export default function TenDayForecast() {
    const { location, dailyWeather } = useWeather();


  return (
    <div className="forecast-page">
      <h2>
        {location.city
          ? `${location.city}, ${location.country}`
          : "Detecting location..."}
      </h2>

          <div className="TenDayBody">
            <TenDayBody dailyWeather={dailyWeather} />
          </div>
      

    </div>
  );
}
