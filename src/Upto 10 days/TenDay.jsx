import { useWeather } from "../WeatherContext";
import { useMemo, useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { getTenDayWindow } from "../WeatherObject";
import WheelGesturesPlugin from "embla-carousel-wheel-gestures";
import "./TenDay.css";

export default function TenDayForecast() {
  const { location, dailyWeather } = useWeather();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const tenDays = useMemo(() => {
    if (!dailyWeather) return null;
    return getTenDayWindow(dailyWeather);
  }, [dailyWeather]);

const customAlign = (viewSize, snapSize) =>
  (viewSize - snapSize) * 0.15;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    // align: "center",
    align: customAlign,
    loop: true,
    dragFree: true,
    speed: 12,
  },
    [WheelGesturesPlugin({forceWheelAxis: "x",}),]
  );

  /* ---- SNAP TO ACTIVE DAY ---- */
  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.scrollTo(selectedIndex);
  }, [selectedIndex, emblaApi]);


  if (!tenDays) return null;

  return (
    <div className="forecast-page">
      <h2>
        {location.city
          ? `${location.city}, ${location.country}`
          : "Detecting location..."}
      </h2>

      {/* -------- EMBLA -------- */}
      <div className="embla">

        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {tenDays.days.map((day, index) => {
              const isActive = index === selectedIndex;

              return (
                <div
                  className={`embla__slide ${isActive ? "is-active" : ""}`}
                  key={day}
                  onClick={() => setSelectedIndex(index)}
                >
                  {/* <div className={`forecast-card ${isActive ? "active" : ""}`}> */}
                  <div className={"forecast-card"}>
                    <p className="day">
                      {new Date(day).toLocaleDateString("en", {
                        weekday: "long",
                      })}
                      <br />
                      {new Date(day).toLocaleDateString("en", {
                        day: "numeric",
                        month: "short",
                      })}
                    </p>

                    <p className="temp">
                      {tenDays.max[index]}° / {tenDays.min[index]}°
                    </p>

                    {isActive && (
                      <div className="details">
                        <p>High: {tenDays.max[index]}°</p>
                        <p>Low: {tenDays.min[index]}°</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
}
