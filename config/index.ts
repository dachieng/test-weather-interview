import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";

import { reducer } from "@/redux/weather/reducer";

const logger = createLogger();

const middlewares = [logger, thunk];

const rootReducer = combineReducers({
  weather: reducer,
});

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
