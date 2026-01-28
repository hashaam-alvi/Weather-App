import "./Weather.css";
import TempHeader from "./TempHeader.jsx";
import WeatherMatrix from "./WeatherMatix.jsx";

export default function Weather() {


    return (
        <div className="container">
            <TempHeader/>
            <WeatherMatrix/>
        </div>
    );
}
