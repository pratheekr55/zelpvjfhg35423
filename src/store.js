import { createStore, applyMiddleware } from "redux";
import bitcoinReducer from "./reducers/BitcoinReducer";
import thunk from "redux-thunk";
import { logger } from "redux-logger";

const store = createStore(
  bitcoinReducer,
  applyMiddleware(thunk, logger)
);

export default store;
