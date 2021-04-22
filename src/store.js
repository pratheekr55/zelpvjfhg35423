import { createStore, applyMiddleware, compose } from "redux";
import bitcoinReducer from "./reducers/BitcoinReducer";
import thunk from "redux-thunk";
import { logger } from "redux-logger";

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const store = createStore(
  bitcoinReducer,
  composeEnhancers(applyMiddleware(thunk, logger))
);

export default store;
