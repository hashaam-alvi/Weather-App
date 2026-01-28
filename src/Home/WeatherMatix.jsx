import MatrixCard from "./MatrixCard";
import "./Matrix.css"
import { CurrWeatherObject } from "../WeatherObject";
import { useWeather } from "../WeatherContext";

export default function WeatherMatrix() {
  const { currWeather } = useWeather();
  if (!currWeather) return null;  

    return (
        <>
            <div className="matrix">
                {CurrWeatherObject.map(metric => (
                    <MatrixCard
                        key={metric.key}
                        label={metric.label}
                        value={currWeather[metric.key]}
                        unit={metric.unit}
                        icon={metric.icon}
                    />
                ))}
            </div>
        </>
    );
}