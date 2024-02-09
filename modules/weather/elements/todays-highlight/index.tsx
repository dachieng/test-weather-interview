/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Icon } from "@iconify/react";
import sunIcon from "@iconify/icons-ph/sun";
import sunsetIcon from "@iconify/icons-game-icons/sunset";
import humidityLow from "@iconify/icons-material-symbols/humidity-low";
import roundVisibility from "@iconify/icons-ic/round-visibility";
import tempHigh from "@iconify/icons-circum/temp-high";
import moment from "moment";

import { formatDate } from "@/helpers";

interface Props {
  data: any;
}

const TodaysHighlight: React.FC<Props> = ({ data }) => {
  const date = new Date();

  const { hours: hour, minutes } = formatDate(date);

  const hours = date.getHours();

  let period;

  if (hours >= 12) {
    period = "PM";
  } else {
    period = "AM";
  }

  const sunrise = moment
    .utc(data.sys.sunrise, "X")
    .add(data.timezone, "seconds")
    .format("HH:mm a");

  const sunset = moment
    .utc(data.sys.sunset, "X")
    .add(data.timezone, "seconds")
    .format("HH:mm a");

  return (
    <div className="p-3">
      <h1 className="text-white text-medium mb-1">Today{"'"} Highlight</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <div className="shadow rounded-lg bg-gradient-to-br from-sky-400 via-sky-600 to-sky-900 mr-0 md:mr-2 p-3 mb-3 min-h-[10rem]">
          <h1 className="text-white text-base mb-1 font-semibold">Wind</h1>
          <div className="">
            <img src="/images/wind2.png" className="h-[170px] w-full" />
          </div>
          <div className="flex justify-between text-white items-center">
            <div className="flex items-center">
              <h3 className="text-3xl">{data.wind.speed}</h3>
              <p className="text-xs text-slate-200 px-1 pt-1">km/h</p>
            </div>
            <p className="text-slate-200">
              {hour}.{minutes} {period}
            </p>
          </div>
        </div>
        <div className="shadow rounded-lg bg-gradient-to-br from-sky-900 via-sky-600 to-sky-400 mr-0 md:mr-2 p-3 mb-3 min-h-[10rem]">
          <h1 className="text-white text-base mb-1 font-semibold">Pressure</h1>
          <div className="">
            <img src="/images/pressure.png" className="h-[170px] w-full" />
          </div>
          <div className="flex justify-between text-white items-center">
            <div className="flex items-center">
              <h3 className="text-3xl">{data.main.pressure}</h3>
              <p className="text-xs text-slate-200 px-1 pt-1">pa</p>
            </div>
            <p className="text-slate-200">
              {" "}
              {hour}.{minutes} {period}
            </p>
          </div>
        </div>
        <div className="shadow rounded-lg bg-gradient-to-br from-sky-400 via-sky-600 to-sky-900 mr-0 md:mr-2 p-3 mb-3 min-h-[10rem]">
          <h1 className="text-white text-base mb-1 font-semibold">
            Sunrise & Sunset
          </h1>
          <div className="">
            <img src="/images/weather.png" className="h-[170px] w-full" />
          </div>
          <div className="flex justify-between text-white items-center">
            <div className="flex items-center flex-col">
              <div className="text-3xl">
                <Icon icon={sunIcon} className="text-[#fcd34d]" />
              </div>
              <p className="text-xs text-slate-200 px-1 pt-2">{sunrise}</p>
            </div>
            <div className="flex items-center flex-col">
              <div className="text-3xl">
                <Icon icon={sunsetIcon} className="text-[#ea580c]" />
              </div>
              <p className="text-xs text-slate-200 px-1 pt-2">{sunset}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <div className="shadow rounded-lg bg-gradient-to-br from-sky-400 via-sky-600 to-sky-900 mr-0 md:mr-2 p-3 mb-3 min-h-[4rem]">
          <h1 className="text-white text-base mb-1 font-semibold">Humidity</h1>

          <div className="flex justify-between text-white items-center pt-4">
            <div className="flex items-center">
              <h3 className="text-2xl">{data.main.humidity}</h3>
              <p className="pt-1">%</p>
            </div>
            <p className="text-slate-200 text-2xl">
              <Icon icon={humidityLow} />
            </p>
          </div>
        </div>
        <div className="shadow rounded-lg bg-gradient-to-br from-sky-400 via-sky-600 to-sky-900 mr-0 md:mr-2 p-3 mb-3 min-h-[4rem]">
          <h1 className="text-white text-base mb-1 font-semibold">
            Visibility
          </h1>

          <div className="flex justify-between text-white items-center pt-4">
            <div className="flex items-center">
              <h3 className="text-2xl">{data.visibility}</h3>
              <p className="text-xs text-slate-200 px-1 pt-1">km</p>
            </div>
            <p className="text-slate-200 text-2xl">
              <Icon icon={roundVisibility} />
            </p>
          </div>
        </div>
        <div className="shadow rounded-lg bg-gradient-to-br from-sky-400 via-sky-600 to-sky-900 mr-0 md:mr-2 p-3 mb-3 min-h-[4rem]">
          <h1 className="text-white text-base mb-1 font-semibold">
            Feels Like
          </h1>

          <div className="flex justify-between text-white items-center pt-4">
            <div className="flex items-center">
              <h3 className="text-2xl">{data.main.feels_like}</h3>
              <p className="pb-3">o</p>
            </div>
            <p className="text-slate-200 text-2xl">
              <Icon icon={tempHigh} />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodaysHighlight;
