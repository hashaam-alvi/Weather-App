import { createContext, useContext, useEffect, useState } from "react";
import { fetchWeather, fetchLocationName } from "./WeatherObject";

const WeatherContext = createContext();

export function WeatherProvider({ children }) {
    const [currWeather, setCurrWeather] = useState(null);
    const [hourlyWeather, setHourlyWeather] = useState(null);
    const [dailyWeather, setDailyWeather] = useState(null);
    const [location, setLocation] = useState({ city: "", country: "" });

    useEffect(() => {
        if (!navigator.geolocation) return;

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;

                setWeatherByCords(latitude, longitude);

            },
            (async () => {
                const data = await fetchWeather(31.5497, 74.3436);
                setCurrWeather(data.current);
                setHourlyWeather(data.hourly);
                setDailyWeather(data.daily);
                setLocation({ city: "Lahore", country: "Pakistan" });
            })
        );
}, []);

async function setWeatherByCords(latitude, longitude) {

    try {
        const data = await fetchWeather(latitude, longitude);

        setCurrWeather(data.current);
        setHourlyWeather(data.hourly);
        setDailyWeather(data.daily);
        const loc = await fetchLocationName(latitude, longitude);
        setLocation(loc);

    } catch (err) {
        console.error("Weather fetch failed", err);
    }

}

return (
    <WeatherContext.Provider value={{ currWeather, hourlyWeather, dailyWeather, location, setWeatherByCords }}>
        {children}
    </WeatherContext.Provider>
);
}

export function useWeather() {
    return useContext(WeatherContext);
}
