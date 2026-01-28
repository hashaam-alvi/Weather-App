import { useEffect, useState } from "react";

export default function Dummy() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=31.558&longitude=74.3507&current_weather=true"
    )
      .then((res) => res.json())
      .then((data) => {
        setWeather(data.current_weather);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <h2>Loading weather...</h2>;

  return (
    <div style={styles.container}>
      <h1>🌤️ Weather App</h1>

      {weather && (
        <div style={styles.card}>
          <p><strong>Temperature:</strong> {weather.temperature}°C</p>
          <p><strong>Wind Speed:</strong> {weather.windspeed} km/h</p>
          <p><strong>Wind Direction:</strong> {weather.winddirection}°</p>
          <p><strong>Time:</strong> {weather.time}</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#121212",
    color: "#ffffff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    background: "#1e1e1e",
    padding: "20px",
    borderRadius: "10px",
    width: "300px",
    textAlign: "left",
  },
};

