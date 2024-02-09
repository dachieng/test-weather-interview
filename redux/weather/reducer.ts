import {
  FETCH_WEATHER_ERROR,
  FETCH_WEATHER_REQUEST,
  FETCH_WEATHER_SUCCESS,
} from "./actionTypes";

const initialState = {
  loading: false,
  weather: {},
  error: "",
};

export const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_WEATHER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_WEATHER_SUCCESS:
      return {
        loading: false,
        weather: action.payload,
        error: "",
      };
    case FETCH_WEATHER_ERROR:
      return {
        loading: false,
        weather: {},
        error: action.payload,
      };
    default:
      return state;
  }
};
