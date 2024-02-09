import {
  FETCH_COUNTRIES_FAILURE,
  FETCH_COUNTRIES_REQUEST,
  FETCH_COUNTRIES_SUCCESS,
} from "./actionTypes";

const initialState = {
  loading: false,
  countries: [],
  error: "",
};

export const countriesReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_COUNTRIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_COUNTRIES_SUCCESS:
      return {
        loading: false,
        countries: action.payload,
        error: "",
      };
    case FETCH_COUNTRIES_FAILURE:
      return {
        loading: false,
        countries: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
