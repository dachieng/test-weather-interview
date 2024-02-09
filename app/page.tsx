import React from "react";

import type { NextPage } from "next";
import WeatherModule from "@/modules/weather/elements";

interface Props {}

const WeatherPage: NextPage<Props> = () => {
  return (
    <div className='min-h-screen'>
      <WeatherModule />
    </div>
  );
};

export default WeatherPage;
