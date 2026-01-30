
import { useMemo, useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { getTenDayWindow, checkWeatherCode, formattedTime } from "../WeatherObject";
import WheelGesturesPlugin from "embla-carousel-wheel-gestures";

import "./TenDay.css";

export default function TenDayBody({ dailyWeather }) {


    const [selectedIndex, setSelectedIndex] = useState(0);

    const tenDays = useMemo(() => {
        if (!dailyWeather) return null;
        return getTenDayWindow(dailyWeather);
    }, [dailyWeather]);

    const customAlign = (viewSize, snapSize) =>
        (viewSize - snapSize) * 0.15;

    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: customAlign,
        loop: true,
        dragFree: true,
        speed: 12,
    },
        [WheelGesturesPlugin({ forceWheelAxis: "x", }),]
    );

    useEffect(() => {
        if (!emblaApi) return;
        emblaApi.scrollTo(selectedIndex);
        emblaApi.reInit();
    }, [selectedIndex, emblaApi]);



    if (!tenDays) return null;

    return (

        <div className="embla">

            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    {tenDays.days.map((day, index) => {
                        const isActive = index === selectedIndex;

                        return (
                            <div className={`embla__slide ${isActive ? "is-active" : ""}`} key={day} onClick={() => setSelectedIndex(index)}>
                                <div className={"forecast-card"}>
                                    <p className="day">
                                        {new Date(day).toLocaleDateString("en", { weekday: "long", })}
                                        <br />
                                        {new Date(day).toLocaleDateString("en", { day: "numeric", month: "short", })}
                                    </p>

                                    <p className="temp">🌡️ {tenDays.max[index]}° / {tenDays.min[index]}° </p>
                                    <p className="temp"> {checkWeatherCode(tenDays.code[index])} </p>

                                    {isActive && (
                                        <div className="details">
                                            <p>Sun Rise/Set: <br /> {new Date(tenDays.sunrise[index]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })} / {new Date(tenDays.sunset[index]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</p>
                                            <p>Sun Light Duration: {formattedTime(tenDays.sunLight[index] )}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}