// import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Dummy from './Dummy.jsx'
import SideNav from './SideNav.jsx'
import Weather from './Home/Weather.jsx'
import CityLocation from './CityLocation.jsx'
import { WeatherProvider } from "./WeatherContext";
import WeatherbyHour from './by Hour/WeatherbyHour.jsx';
import TenDay from './Upto 10 days/TenDay.jsx'

function App() {
  return (
    <WeatherProvider>
      <BrowserRouter>
        <div style={{ display: "flex", height: "100vh" }}>
          <SideNav />
          <main style={{ flex: 1, display: "flex" }}>
            <Routes>
              <Route path="/" element={<Weather />} />
              <Route path="/city" element={<CityLocation />} />                            
              <Route path="/hourly" element={<WeatherbyHour />} />
              <Route path="/forecast" element={<TenDay/>} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </WeatherProvider>
  );
}

export default App;
