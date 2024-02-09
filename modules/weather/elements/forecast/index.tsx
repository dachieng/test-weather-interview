import React from "react";
import Image from "next/image";
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import { Icon } from "@iconify/react";
import downIcon from "@iconify/icons-formkit/down";

import { capitalize } from "@/helpers";

interface Props {
  data: any;
}

const WeatherForecast: React.FC<Props> = ({ data }) => {
  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const day = new Date().getDay();

  const forecastDays = weekdays
    .slice(day, weekdays.length)
    .concat(weekdays.slice(0, day));

  return (
    <div className="shadow rounded-lg bg-gradient-to-br from-sky-900 via-sky-600 to-sky-400 mr-0 py-3 px-6 mb-3 min-h-[22rem]">
      <h3 className="text-white my-3">Daily Forecast</h3>
      <Accordion allowZeroExpanded>
        {data.list.splice(0, 7).map((item: any, index: number) => (
          <AccordionItem key={index}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="w-full m-2 pt-2 bg-white rounded flex">
                  <div className="flex-1 grid grid-cols-4 p-2">
                    <div>
                      <Image
                        src={`/icons/${item.weather[0].icon}.png`}
                        alt="weather"
                        width={40}
                        height={40}
                      />
                    </div>
                    <div>
                      <p className="text-yellow-600 text-base font-semibold">
                        {forecastDays[index]}
                      </p>
                    </div>
                    <div className="">
                      <p className="px-5 text-slate-600 text-base font-semibold">
                        {capitalize(item.weather[0].description)}
                      </p>
                    </div>
                    <div className="">
                      <div className="flex items-center">
                        <div className="flex">
                          <p className="text-lg">
                            {Math.round(item.main.temp_min)}
                          </p>
                          <p className="text-sm">o</p>
                          <p className="text-lg pr-2">c </p> {`/`}
                        </div>
                        <div className="flex">
                          <p className="text-lg pl-2">
                            {Math.round(item.main.temp_max)}
                          </p>
                          <p className="text-sm">o</p>
                          <p className="text-lg">c</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-[1rem] sm:w-[4rem]">
                    <div className="p-2 text-base border-l-2 border-slate-200	">
                      <Icon icon={downIcon} className="text-[#d6d3d1] pt-2" />
                    </div>
                  </div>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="w-full m-2 p-2 bg-slate-100 rounded flex">
                <div className="flex-1 grid grid-cols-4 p-2">
                  <div className="flex justify-start items-center flex-col">
                    <h3 className="text-yellow-600 text-base">Humidity</h3>
                    <div className="text-neutral-500 text-base">
                      <div className="flex items-center">
                        <h3>{item.main.humidity}</h3>
                        <p className="text-xs text-slate-400 px-1 pt-1">
                          %
                        </p>{" "}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-start items-center flex-col">
                    <h3 className="text-yellow-600 text-base">Wind</h3>
                    <div className="text-neutral-500 text-base">
                      <div className="flex items-center">
                        <h3>{item.wind.speed}</h3>
                        <p className="text-xs text-slate-400 px-1 pt-1">
                          km/h
                        </p>{" "}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-start items-center flex-col">
                    <h3 className="text-yellow-600 text-base">Clouds</h3>
                    <div className="text-neutral-500 text-base">
                      <div className="flex items-center">
                        <h3>{item.clouds.all}</h3>
                        <p className="text-xs text-slate-400 px-1 pt-1">
                          m/s
                        </p>{" "}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-start items-center flex-col">
                    <h3 className="text-yellow-600 text-base">Pressure</h3>
                    <div className="text-neutral-500 text-base">
                      <div className="flex items-center">
                        <h3>{item.main.pressure}</h3>
                        <p className="text-xs text-slate-400 px-1 pt-1">
                          pa
                        </p>{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default WeatherForecast;
