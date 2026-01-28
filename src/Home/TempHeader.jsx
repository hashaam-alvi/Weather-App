import "./TempHeader.css"
import { useWeather } from "../WeatherContext";

export default function TempHeader() {
    const { currWeather, location } = useWeather();
    let day,time;

    if (currWeather) {
        const dateObj = new Date(currWeather.time);
     time = dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
     day = dateObj.toLocaleDateString([], { weekday: "long" });
    }
    return (
        <div className="Weather_header">
            {/* <span>time, Day</span> */}
            {currWeather && (
                <div className="Container">
                    <div className="homeheader">
                        <h4>{location.city ? `${location.city}, ${location.country}` : "Detecting location..."}</h4>
                        <p><strong>{day + "   " + time}</strong> </p>
                    </div>
                    <h1 className="TempReading">{currWeather.temperature_2m} °C</h1>
                    <div className="footer">
                        <p>Feels Like <strong>{currWeather.apparent_temperature} °C</strong> </p>
                        <p> {currWeather.rain ? "🌨 Raining" : "🌤 Clear Sky"}</p>
                        <p> {currWeather.is_day ? "☀ Day " : "🌙 Night"}</p>

                    </div>
                </div>
            )}

        </div>
    );
}