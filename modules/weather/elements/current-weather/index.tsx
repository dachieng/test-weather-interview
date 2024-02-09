import React from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import locationIcon from "@iconify/icons-bytesize/location";
import calenderIcon from "@iconify/icons-simple-line-icons/calender";

import { capitalize, formatDate } from "@/helpers";

interface Props {
  data: any;
}

const CurrentWeather: React.FC<Props> = ({ data }) => {
  const date = new Date();

  const { day, month, year, hours: hour, minutes } = formatDate(date);

  const hours = date.getHours();

  let period;

  if (hours >= 12) {
    period = "PM";
  } else {
    period = "AM";
  }

  return (
    <div className='p-3'>
      <div className='mb-2'>
        <Image
          src={`/icons/${data.weather[0].icon}.png`}
          alt='weather'
          width={90}
          height={80}
        />
      </div>
      <div className='relative flex text-white font-semibold'>
        <p className='text-5xl'>{data.main.temp}</p>
        <p className='text-xl'>o</p>
        <p className='text-3xl'>c</p>
      </div>
      <div className='flex items-center border-b pb-[1rem] mb-[1rem]'>
        <Image
          src={`/icons/${data.weather[0].icon}.png`}
          alt='weather'
          width={30}
          height={20}
        />
        <p className='text-white px-2 my-3'>
          {capitalize(data.weather[0].description)}
        </p>
      </div>
      <div className=''>
        <div className='flex items-center pt-4'>
          <Icon icon={locationIcon} className='text-[#fff] text-2xl' />
          <p className='text-slate-200 text-sm font-medium mx-1 mb-1'>
            {data.name}, {data.sys.country}
          </p>
        </div>
        <div className='flex items-center my-3'>
          <Icon icon={calenderIcon} className='text-[#fff] text-xl' />
          <p className='text-slate-200 text-sm font-medium mx-2'>
            {`${day} ${month}`}, {year}
          </p>
          <p className='text-white'>
            {hour}.{minutes} {period}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
