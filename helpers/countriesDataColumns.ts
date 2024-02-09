import type { ICountry } from "@/interfaces";
import type { Column } from "react-table";

export const countryTableColumns: Column<ICountry>[] = [
  {
    Header: "No",
    accessor: "no",
    //@ts-expect-error
    disableGlobalFilter: true,
  },
  {
    Header: "Flag",
    accessor: "flag",
    //@ts-expect-error
    disableGlobalFilter: true,
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Population",
    accessor: "population",
    //@ts-expect-error
    disableGlobalFilter: true,
  },
  {
    Header: "Area",
    accessor: "area",
    //@ts-expect-error
    disableGlobalFilter: true,
  },
];
