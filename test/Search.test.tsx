import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import fetchMock from "jest-fetch-mock";
import "@testing-library/jest-dom";

import Search from "@/components/elements/Search";

fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
});

const mockHandleOnSearchChange = jest.fn();

describe("Search Component", () => {
  it("loads options and allows selection", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify([
        {
          cca2: "US",
          name: { common: "United States" },
          capitalInfo: { latlng: [38.897957, -77.03656] },
        },
      ])
    );

    const { getByText, findByText } = render(
      <Search handleOnSearchChange={mockHandleOnSearchChange} />
    );

    fireEvent.change(document.querySelector("input")!, {
      target: { value: "United" },
    });

    const option = await findByText("US - United States");
    expect(option).toBeInTheDocument();

    fireEvent.click(option);

    await waitFor(() => {
      expect(mockHandleOnSearchChange).toHaveBeenCalledWith({
        label: "US - United States",
        value: "38.897957 -77.03656",
      });
    });
  });
});
