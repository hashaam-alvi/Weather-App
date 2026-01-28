import "./Home/Weather.css"; 
import "./CityLocation.css";
import TempHeader from "./Home/TempHeader.jsx";
import { useWeather } from "./WeatherContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CityLocation() {
    // const { currWeather, location } = useWeather();
    const { currWeather, location, setWeatherByCords } = useWeather();
    const [cityInput, setCityInput] = useState("");
    const navigate = useNavigate();

    async function handleSearch() {
        if (!cityInput) return;

        const res = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${cityInput}&count=1`
        );
        const data = await res.json();

        if (!data.results) return alert("City not found");

        const { latitude, longitude } = data.results[0];
        setWeatherByCords(latitude, longitude);
    }
    return (
        
        <div className="container">
            <div className="searchBar">
                <input type="text" placeholder="Enter City / Country" className="citySearch" autoFocus value={cityInput} onChange={(e) => setCityInput(e.target.value)}/>
                <button type="button" className="enterB" onClick={handleSearch}>Search</button>
            </div>
            <div className="body"  style={{ cursor: "pointer", padding: "20px" }} onClick={() => navigate("/")}>
                <TempHeader currWeather={currWeather} city={location.city} country={location.country}  />
            </div>
        </div>
    );
}