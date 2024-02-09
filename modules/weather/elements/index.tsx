"use client";

import React, { Suspense, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Search from "@/components/elements/Search";
import CurrentWeather from "./current-weather";
import TodaysHighlight from "./todays-highlight";
import { fetchWeather } from "@/redux/weather/actionCreators";
import WeatherForecast from "./forecast";
import Home from "@/components/elements/Home";

interface Props {}

const WeatherModule: React.FC<Props> = () => {
  const weatherData = useSelector((state: any) => state.weather);
  const dispatch = useDispatch();

  const { weather, forecast } = weatherData.weather;

  const handleOnSearchChange = (data: any) => {
    const [latitude, longitude] = data.value.split(" ");

    //@ts-expect-error Argument of type '(dispatch: any) => Promise<void>' is not assignable to parameter of type 'AnyAction'.
    dispatch(fetchWeather(latitude, longitude));
  };

  return (
    <Suspense fallback={<Home />}>
      <div className="min-h-screen">
        <Search handleOnSearchChange={handleOnSearchChange} />
        {weather && forecast ? (
          <div className="w-full md:max-w-[67.5rem] my-[0.5rem] md:my-[2rem] mx-auto px-[0.5rem]">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:max-w-[20rem] rounded-2xl shadow bg-gradient-to-br from-cyan-400 via-cyan-600 to-cyan-900 mr-0 md:mr-2 p-3 mb-3 min-h-[20rem]">
                <CurrentWeather data={weather} />
              </div>
              <div className="flex-1 shadow rounded-2xl bg-cyan-900 p-3 mb-3">
                <TodaysHighlight data={weather} />
              </div>
            </div>
            <div>
              <WeatherForecast data={forecast} />
            </div>
          </div>
        ) : (
          <Home />
        )}
      </div>
    </Suspense>
  );
};

export default WeatherModule;
