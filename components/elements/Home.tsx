/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGlobalFilter, usePagination, useTable } from "react-table";
import { Icon } from "@iconify/react";

import { fetchCountries } from "@/redux/countries/actionCreators";
import { countryTableColumns } from "@/helpers/countriesDataColumns";

import type { ICountry } from "@/interfaces";
import { CountryTableEnums } from "@/enums";

interface Props {}

const Home: React.FC<Props> = () => {
  const countries = useSelector((state: any) => state.countries);
  const dispatch = useDispatch();

  const countriesData: ICountry[] = countries.countries.map(
    (country: any, index: number) => ({
      no: index + 1,
      id: index + 1,
      name: country.name.common,
      flag: country.flags.png,
      population: country.population,
      area: country.area,
    })
  );

  const handleOnSearchChange = (data: any) => {
    const [latitude, longitude] = data.value.split(" ");

    //@ts-expect-error Argument of type '(dispatch: any) => Promise<void>' is not assignable to parameter of type 'AnyAction'.
    dispatch(fetchWeather(latitude, longitude));
  };

  console.log("countries:", countries.countries);
  console.log("jhgfd", countriesData);

  const data = useMemo(() => countriesData, [countriesData]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    //@ts-ignore
    page,
    //@ts-ignore
    nextPage,
    //@ts-ignore
    previousPage,
    //@ts-ignore
    canNextPage,
    //@ts-ignore
    canPreviousPage,
    //@ts-ignore
    pageOptions,
    //@ts-ignore
    state,
    //@ts-ignore
    gotoPage,
    //@ts-ignore
    pageCount,
    prepareRow,
    allColumns,
    //@ts-ignore
    setGlobalFilter,
  } = useTable(
    {
      columns: countryTableColumns,
      data,
      autoResetGlobalFilter: false,
      //@ts-ignore
      autoResetPage: false,
      //@ts-ignore
      initialState: { pageSize: 15 },
    },
    useGlobalFilter,
    usePagination
  );

  // @ts-ignore
  const { pageIndex, globalFilter } = state;

  useEffect(() => {
    //@ts-expect-error
    dispatch(fetchCountries());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="w-full md:max-w-[67.5rem] my-[0.5rem] md:my-[2rem] mx-auto px-[0.5rem]">
      <div className="min-h-[30rem] rounded w-full">
        <div className="bg-white py-4 px-4 my-4 rounded-md">
          <div className="overflow-x-auto w-full">
            <table
              {...getTableProps()}
              className="border-collapse my-4 mx-0 text-sm w-full"
              role="table"
              aria-label="Clients table"
            >
              <thead className="w-full">
                {headerGroups.map((headerGroup, headerGroupIndex) => (
                  <tr
                    {...headerGroup.getHeaderGroupProps()}
                    key={headerGroupIndex}
                    className="text-left"
                  >
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps()}
                        key={column.id}
                        className="px-2 pb-3 whitespace-nowrap"
                      >
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps} className="w-full">
                {page.length ? (
                  page.map((row: any, rowIndex: number) => {
                    prepareRow(row);
                    return (
                      <tr
                        {...row.getRowProps()}
                        key={row.id}
                        className={`${
                          rowIndex % 2 === 0 ? "bg-gray-100" : "bg-white"
                        }`}
                      >
                        {row.cells.map((cell: any) => (
                          <td
                            {...cell.getCellProps()}
                            key={cell.column.id}
                            className="text-left px-2 py-2 border-t border-secondary-200"
                          >
                            {cell.column.Header === CountryTableEnums.FLAG ? (
                              <div className="flex items-center justify-center">
                                <img
                                  src={cell.value}
                                  alt="Flag"
                                  className="w-10 h-6"
                                />{" "}
                              </div>
                            ) : (
                              <p className="py-3 whitespace-nowrap">
                                {cell.render("Cell")}
                              </p>
                            )}
                          </td>
                        ))}
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={allColumns.length}>
                      <div className="min-h-25 flex justify-center items-center">
                        No available countries to display.
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="flex justify-between border-t w-full border-gray-200">
              <div className="py-2">
                <button
                  className="my-1 bg-transparent border-0 text-center text-gray-500 pr-3 py-1 transition-all duration-300 text-xs"
                  title="Page Info"
                >
                  <span>
                    {"Showing page "}
                    {pageIndex + 1}
                    {" of "}
                    {pageOptions.length}
                  </span>
                </button>
              </div>
              <div className="flex items-center py-4 transition-all duration-300">
                {canPreviousPage && (
                  <>
                    <button
                      className="bg-transparent text-gray-500 border-0 mx-1 px-0 pt-1 pb-1 text-xs"
                      onClick={() => gotoPage(0)}
                    >
                      <Icon icon="material-symbols:keyboard-double-arrow-left" />{" "}
                    </button>
                    <button
                      className="bg-transparent text-gray-500 border-0 mx-1 px-0 py-1 text-xs"
                      onClick={() => previousPage()}
                    >
                      <Icon icon="material-symbols:chevron-left-rounded" />
                    </button>
                  </>
                )}

                {/* Pagination buttons */}

                {pageCount > 1 && ( // Check if there are more than one page
                  <>
                    {/* Always show first page */}
                    <button
                      className={`mx-1 w-7 h-7 text-xs ${
                        pageIndex === 0
                          ? "bg-purple-700 text-white"
                          : "bg-transparent text-gray-500"
                      } rounded-full`}
                      onClick={() => gotoPage(0)}
                    >
                      1
                    </button>

                    {/* Show second page if it exists */}
                    {pageCount > 1 && (
                      <button
                        className={`mx-1 w-7 h-7 text-xs ${
                          pageIndex === 1
                            ? "bg-purple-700 text-white"
                            : "bg-transparent text-gray-500"
                        } rounded-full`}
                        onClick={() => gotoPage(1)}
                      >
                        2
                      </button>
                    )}

                    {/* Ellipsis if there's a gap */}
                    {pageIndex > 3 && <span className="mx-1">...</span>}

                    {/* Current page, if it's not the first or second page */}
                    {pageIndex > 1 && pageIndex < pageCount - 2 && (
                      <>
                        {/* Page before current, if it's not the first or second */}
                        {pageIndex > 2 && (
                          <button
                            className="mx-1 w-7 h-7 text-xs bg-transparent text-gray-500 rounded-full"
                            onClick={() => gotoPage(pageIndex - 1)}
                          >
                            {pageIndex}
                          </button>
                        )}

                        {/* Current page */}
                        <button
                          className="mx-1 w-7 h-7 text-xs bg-purple-700 text-white rounded-full"
                          onClick={() => gotoPage(pageIndex)}
                        >
                          {pageIndex + 1}
                        </button>

                        {/* Page after current, if it's not the last or second to last */}
                        {pageIndex < pageCount - 3 && (
                          <button
                            className="mx-1 w-7 h-7 text-xs bg-transparent text-gray-500 rounded-full"
                            onClick={() => gotoPage(pageIndex + 1)}
                          >
                            {pageIndex + 2}
                          </button>
                        )}
                      </>
                    )}

                    {/* Ellipsis if there's a gap to the last two */}
                    {pageIndex < pageCount - 4 && (
                      <span className="mx-1">...</span>
                    )}

                    {/* Second to last page, if there are at least 3 pages */}
                    {pageCount > 2 && (
                      <button
                        className={`mx-1 w-7 h-7 text-xs ${
                          pageIndex === pageCount - 2
                            ? "bg-purple-700 text-white"
                            : "bg-transparent text-gray-500"
                        } rounded-full`}
                        onClick={() => gotoPage(pageCount - 2)}
                      >
                        {pageCount - 1}
                      </button>
                    )}

                    {/* Last page */}
                    <button
                      className={`mx-1 w-7 h-7 text-xs ${
                        pageIndex === pageCount - 1
                          ? "bg-purple-700 text-white"
                          : "bg-transparent text-gray-500"
                      } rounded-full`}
                      onClick={() => gotoPage(pageCount - 1)}
                    >
                      {pageCount}
                    </button>
                  </>
                )}

                {canNextPage && (
                  <>
                    <button
                      className="bg-transparent text-gray-500 border-0 mx-1 px-0 py-1 text-xs"
                      onClick={() => nextPage()}
                    >
                      <Icon icon="material-symbols:chevron-right" />
                    </button>
                    <button
                      className="bg-transparent text-gray-500 border-0 mx-1 px-0 py-1 text-xs flex"
                      onClick={() => gotoPage(pageCount - 1)}
                    >
                      <Icon icon="material-symbols:keyboard-double-arrow-right" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
