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
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,rain,precipitation,wind_speed_10m,wind_direction_10m,pressure_msl,wind_gusts_10m,surface_pressure&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,pressure_msl,rain,visibility,wind_speed_10m,wind_gusts_10m,soil_temperature_0cm&timezone=auto`
    
  )
    return response.json();
    // .then((data) =>  setCurrWeather(data.current))
    // .catch((err) => console.error(err));
}

// export function fetchHourlyWeather(lat, lon, setHourlyWeather) {
//   fetch(
    // 'https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,pressure_msl,rain,visibility,wind_speed_10m,wind_gusts_10m,soil_temperature_0cm&timezone=auto'
//   )
//     .then((res) => res.json())
//     .then((data) => setHourlyWeather(data.hourly) )
//     .catch((err) => console.error(err));
// }

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


// export async function handleSearch() {
//         if (!cityInput) return;

//         const res = await fetch(
//             `https://geocoding-api.open-meteo.com/v1/search?name=${cityInput}&count=1`
//         );
//         const data = await res.json();

//         if (!data.results) return alert("City not found");

//         const { latitude, longitude } = data.results[0];
//         setWeatherByCoords(latitude, longitude);
//     }
  