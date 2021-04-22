import * as actionTypes from "../actions/actionTypes";

const initialState = {
  bitCoinValues: {},
  historicalPrices: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_BITCOIN_VALUE:
      return {
        ...state,
        bitCoinValues: action.payload,
      };
    case actionTypes.GET_HISTORICAL_PRICE:
      return {
        ...state,
        historicalPrices: action.payload,
      };  
    default:
      return state;
  }
};

export default reducer;
