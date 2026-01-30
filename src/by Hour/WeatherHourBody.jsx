import { useState, useEffect } from "react";
import { useWeather } from "../WeatherContext";
import WeatherbyHourCard from "./WeatherbyHourCard.jsx";

export default function WeatherHourBody() {
  const { hourlyWeather } = useWeather();
  const [selectedHourId, setSelectedHourId] = useState(null);
  if (!hourlyWeather) return <p>Loading hourly weather...</p>;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const endOfToday = new Date(today);
  endOfToday.setHours(23, 59, 59, 999);

  const hourly = hourlyWeather.time
    .map((time, i) => {
      const date = new Date(time);
      if (date < today || date > endOfToday) return null;
      
      
      return {
        // id: uuidv4(),
        id: time,
        time,
        temp: hourlyWeather.temperature_2m[i],
        apparent_temperature: hourlyWeather.apparent_temperature[i],
        relative_humidity_2m: hourlyWeather.relative_humidity_2m[i],
        precipitation_probability: hourlyWeather.precipitation_probability[i],
        pressure_msl: hourlyWeather.pressure_msl[i],
        visibility: hourlyWeather.visibility[i],
        wind: hourlyWeather.wind_speed_10m[i],
        wind_gusts_10m: hourlyWeather.wind_gusts_10m[i],
        soil_temperature_0cm: hourlyWeather.soil_temperature_0cm[i],
        code: hourlyWeather.weather_code[i],
        is_day: hourlyWeather.is_day?.[i] ?? true
      };
    })
    .filter(Boolean);
    
    useEffect(() => {
      if (!hourly.length) return;

      const now = new Date();

      const currentHour = hourly.find(hour => {
        const date = new Date(hour.time);
        return (
          date.getHours() === now.getHours() &&
          date.toDateString() === now.toDateString()
        );
      });

      if (currentHour) {
        setSelectedHourId(currentHour.id);
      }
    }, [hourly]);
  return (

    <div className="weatherbyHourBody">
      {hourly.map(hour => (
        <WeatherbyHourCard
          key={hour.id}
          data={hour}
          selectedHourId={selectedHourId}
          setSelectedHourId={setSelectedHourId}
        />
      ))}
    </div>

  );
}
