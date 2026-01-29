import { useWeather } from "./WeatherContext";

export const CurrWeatherObject = [
  {
    key: "wind_speed_10m",
    label: "Wind Speed",
    unit: "km/h",
    icon: "🌬️"
  },
  {
    key: "wind_direction_10m",
    label: "Wind Direction",
    unit: "°",
    icon: "🧭"
  },
  {
    key: "relative_humidity_2m",
    label: "Humidity",
    unit: "%",
    icon: "💧"
  },
  {
    key: "pressure_msl",
    label: "Air Pressure",
    unit: "mb",
    icon: "⏱️"
  },
  {
    key: "precipitation",
    label: "Precipitation",
    unit: "%",
    icon: "✔"
  },
  {
    key: "surface_pressure",
    label: "Surface Pressure",
    unit: "hPa",
    icon: "🌧️"
  },
  {
    key: "wind_gusts_10m",
    label: "Wind Gusts",
    unit: "km/h",
    icon: "💨"
  },
];

export async function fetchWeather(lat, lon) {
  const response =  await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,rain,precipitation,wind_speed_10m,wind_direction_10m,pressure_msl,wind_gusts_10m,surface_pressure&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,pressure_msl,rain,visibility,wind_speed_10m,wind_gusts_10m,soil_temperature_0cm,is_day&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,sunrise,sunset,daylight_duration,wind_speed_10m_max,wind_direction_10m_dominant,sunshine_duration,weather_code,&timezone=auto&forecast_days=10`
    


  )
    return response.json();
}


export async function fetchLocationName(lat, lon) {
  const res = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
  );
  const data = await res.json();

  return {
    city: data.city || data.locality,
    country: data.countryName
  };
}


export function getTenDayWindow(daily) {
  if (!daily) return null;
  const end = 10;
  return {
    days: daily.time.slice(0, end),
    max: daily.temperature_2m_max.slice(0, end),
    min: daily.temperature_2m_min.slice(0, end),
    code: daily.weather_code.slice(0, end),
    precipitation: daily.precipitation_sum.slice(0, end),
    sunrise: daily.sunrise.slice(0, end),
    sunset: daily.sunset.slice(0, end),
    dayLight: daily.daylight_duration.slice(0,end),
    sunLight: daily.sunshine_duration.slice(0,end),
    windSpeed: daily.wind_speed_10m_max.slice(0,end),
    windDir: daily.wind_direction_10m_dominant.slice(0,end),
   
  };
}
  