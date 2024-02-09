"use client";

import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";

interface Props {
  handleOnSearchChange: (data: any) => void;
}

const Search: React.FC<Props> = ({ handleOnSearchChange }) => {
  const [search, setSearch] = useState<any>(null);

  const url = process.env.NEXT_PUBLIC_COUNTRIES_API_URL;

  const handleChange = (opt: any) => {
    setSearch(opt);
    handleOnSearchChange(opt);
  };

  const loadOptions = async (inputValue: string) => {
    const searchValue = inputValue || "";
    try {
      const res = await fetch(`${url}/name/${searchValue}`);

      const data = await res.json();

      console.log("dhgsd", res);

      const dataValues = Array.isArray(data)
        ? data.map((country: any) => ({
            label: `${country.cca2} - ${country.name.common}`,
            value:
              country.capitalInfo && country.capitalInfo.latlng
                ? `${country.capitalInfo.latlng[0]} ${country.capitalInfo.latlng[1]}`
                : "Not Available",
          }))
        : [];

      return {
        options: dataValues,
      };
    } catch (error) {
      console.error("error fetching cities", error);
      return { options: [] };
    }
  };

  return (
    <div className="w-full md:max-w-[67.5rem] my-[0.5rem] md:my-[2rem] mx-auto px-[0.5rem]">
      <AsyncPaginate
        loadOptions={loadOptions}
        value={search}
        onChange={handleChange}
        debounceTimeout={200}
      />
    </div>
  );
};

export default Search;
