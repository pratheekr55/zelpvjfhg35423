import * as actionTypes from "./actionTypes";
import axios from "axios";


export const getBitCoinValue = () => (dispatch) => {
  axios
    .get("https://api.coindesk.com/v1/bpi/currentprice.json")
    .then((res) => {
      dispatch({
        type: actionTypes.GET_BITCOIN_VALUE,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getHistoricalPrice = (currency, startDate, endDate) => (dispatch) => {
  axios
    .get(`https://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}&start=${startDate}&end=${endDate}`)
    .then((res) => {
      dispatch({
        type: actionTypes.GET_HISTORICAL_PRICE,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

