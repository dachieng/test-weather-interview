import React from "react";

interface Props {}

const Home: React.FC<Props> = () => {
  return (
    <div className='w-full md:max-w-[67.5rem] my-[0.5rem] md:my-[2rem] mx-auto px-[0.5rem]'>
      <div className='h-[30rem] rounded w-full bg-[url("/images/background.jpg")] bg-center bg-cover bg-no-repeat'>
        <div className='h-[30rem] w-full bg-black opacity-50 '>
          <div className='text-white flex justify-center items-center text-center flex-col px-3'>
            <div className='my-10 py-10'>
              <h3 className='text-white text-4xl  font-semibold opacity-100 '>
                Welcome to our weather app!!
              </h3>
            </div>
            <div className='py-10'>
              <h3 className='text-white text-2xl font-semibold opacity-100 '>
                Search for city to get results
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
