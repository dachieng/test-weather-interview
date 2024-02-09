import {
  FETCH_COUNTRIES_FAILURE,
  FETCH_COUNTRIES_REQUEST,
  FETCH_COUNTRIES_SUCCESS,
} from "./actionTypes";

const url = process.env.NEXT_PUBLIC_COUNTRIES_API_URL as string;

const fetchCountriesRequest = () => {
  return {
    type: FETCH_COUNTRIES_REQUEST,
  };
};

const fetchCountriesSuccess = (data: any) => {
  return {
    type: FETCH_COUNTRIES_SUCCESS,
    payload: data,
  };
};

const fetchCountriesFailure = (error: any) => {
  return { type: FETCH_COUNTRIES_FAILURE, payload: error };
};

export const fetchCountries = () => {
  return async (dispatch: any) => {
    dispatch(fetchCountriesRequest());

    try {
      const res = await fetch(`${url}/all`);
      const data = await res.json();

      dispatch(fetchCountriesSuccess(data));
    } catch (error) {
      console.error(error);
      dispatch(fetchCountriesFailure(error));
    }
  };
};
