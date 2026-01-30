import { useMemo } from "react";
import './WeatherbyHourCard.css'
import { checkWeatherCode } from "../WeatherObject.js";

export default function WeatherbyHourCard({ data, selectedHourId, setSelectedHourId }) {
    const { id, time, temp, code, wind, is_day, apparent_temperature, relative_humidity_2m, precipitation_probability, pressure_msl, visibility, wind_gusts_10m, soil_temperature_0cm } = data;

    const hour = useMemo(() => new Date(time).getHours(), [time]);

    const isCurrentHour = useMemo(() => {
        const now = new Date();
        const date = new Date(time);
        return (
            now.getHours() === date.getHours() &&
            now.toDateString() === date.toDateString()
        );
    }, [time]);

    const isSelected = selectedHourId === id;

    function handleClick() {
        setSelectedHourId(isSelected ? null : id);
    }

    return (
        <div className="hourCardcontainer">
            <div className={`weather-hour-card${isCurrentHour ? " current-hour" : ""}${isSelected ? " selected-hour" : ""}`} onClick={handleClick} data-hour-id={id}>
                <div className="tempHour">
                    <span>{String(hour).padStart(2, "0")}:00</span>
                    <strong>🌡️ {String(temp.toFixed(1)).padStart(4, "0")} °C</strong> 
                    <span>💨 {Number(wind).toFixed(1)} km/h</span>
                    <span>{checkWeatherCode(code)}</span>
                    <span>{is_day ? "🌤 Day" : "🌙 Night"}</span>
                </div>

                {isSelected && (
                    <div className="hour-details">
                        <p>🌡 Apparent Temp: {apparent_temperature} °C</p>
                        <p>💧 Humidity: {relative_humidity_2m} %</p>
                        <p>🌧 Precipitation Chance: {precipitation_probability} %</p>
                        <p>⏱ Pressure: {pressure_msl} hPa</p>
                        <p>👁 Visibility: {visibility} m</p>
                        <p>💨 Wind Gusts: {wind_gusts_10m} km/h</p>
                        <p>🌱 Soil Temp: {soil_temperature_0cm} °C</p>
                    </div>
                )}
            </div>

        </div>
    );
}

