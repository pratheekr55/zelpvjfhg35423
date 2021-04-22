import React, { Component } from "react";
import { Container, Form, Col, Row, Button } from "react-bootstrap";
import styles from "./Main.module.css";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { getBitCoinValue, getHistoricalPrice } from '../../actions/BitcoinAction';
import PriceChart from '../Chart/Chart';

class Main extends Component {
   state = {
     currency: '',
     coinValue: '',
     startDate: '',
     endDate: '',
     currencyErrorMsg: '',
     dateErrorMsg: '',
     chartLabel: [],
     chartData: [],
   }

   //Select Currency and fetch Bitcoin Values
   handleCurrencySelection = e => {
     e.preventDefault();
     const { getBitCoinValue } = this.props;
     this.setState({
       currency: e.target.value,
       currencyErrorMsg: ''
     });
      getBitCoinValue();
      setTimeout(() => {
        this.handleCoinValue();
      }, 1000);
   }

   // Assign BitCoin values to Currencies
   handleCoinValue = () => {  
    const { currency } = this.state;
    const { bitCoinValues } = this.props;
    let value = '';
    if (currency === 'USD') {
      value = bitCoinValues.bpi.USD.rate_float;
    } 
    if (currency === 'GBP') {
      value = bitCoinValues.bpi.GBP.rate_float;
    } 
    if (currency === 'EUR') {
      value = bitCoinValues.bpi.EUR.rate_float;
    }
    this.setState({
     coinValue: value,
    });
   }

   handleDateChange = e => {
     e.preventDefault();
     this.setState({
       [e.target.name]: e.target.value,
     });
   }

   //Assign historical bitcoin prices
   handleHistoricalCoinValues = async () => {
     const { currency, startDate, endDate } = this.state;
     const { getHistoricalPrice } = this.props;
     if (currency === '') {
       await this.setState({
         currencyErrorMsg: 'Please Select Currency'
       })
     } else {
       await this.setState({
        currencyErrorMsg: '',
       })
     }
     if (startDate === '' || endDate === '') {
       await this.setState({
         dateErrorMsg: "Please Select Start & Date",
       })
     } else {
       await this.setState({
         dateErrorMsg: '',
       })
     }
     const { currencyErrorMsg, dateErrorMsg} = this.state;
     if (currencyErrorMsg === '' && dateErrorMsg === '') {
      await getHistoricalPrice(currency, startDate, endDate);
      setTimeout(() => {
        this.handleChartData();
      }, 1000);
     }
   }

   // Assign Chart Data
   handleChartData = () => {
    const { historicalPrices } = this.props;
    let chartData = historicalPrices.bpi;
    let labels = Object.keys(chartData).map(key => { return new Date(key).toDateString().substring(4,10) })
    let data = Object.values(chartData).map(val => { return val });
    this.setState({
      chartLabel: labels,
      chartData: data,
    }); 
   }


  render() {
    const { currency, coinValue, chartLabel, chartData, currencyErrorMsg, dateErrorMsg } = this.state;
    return (
      <Container className={styles.mainSection}>
        <Row>
          <Col className="py-4">
            <Row>
              <Col xs={7}>
                <p className="text-center pb-1">1 Bitcoin Equals</p>
                <Form className="pb-2">
                  <Form.Control as="select" onChange={this.handleCurrencySelection}>
                    <option>Choose currency</option>
                    <option>USD</option>
                    <option>GBP</option>
                    <option>EUR</option>
                  </Form.Control>
                  {currencyErrorMsg ? <Form.Text className="text-danger">{currencyErrorMsg}</Form.Text> : ''}
                </Form>
                <p className={styles.coinValue}>
                  {coinValue} {currency}
                </p>
              </Col>
              <Col xs={5}>
                <Form>
                  <Form.Group>
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control name="startDate" onChange={this.handleDateChange} type="text" placeholder="Format: YYYY-MM-DD" />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>End Date</Form.Label>
                    <Form.Control name="endDate" onChange={this.handleDateChange} type="text" placeholder="Format: YYYY-MM-DD" />
                    {dateErrorMsg ? <Form.Text className="text-danger">{dateErrorMsg}</Form.Text> : ''}
                  </Form.Group>

                  <Button variant="primary" onClick={this.handleHistoricalCoinValues}>
                    View Trend
                  </Button>
                </Form>
              </Col>
            </Row>
          </Col>
          <Col className="py-4">
            <Row className="justify-content-center">
              {/* PriceChart Component */}
              <PriceChart 
                chartLabel={chartLabel}
                chartData={chartData}
              />
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  bitCoinValues: state.bitCoinValues,
  historicalPrices: state.historicalPrices,
});

Main.propTypes = {
  bitCoinValues: PropTypes.object,
  historicalPrices: PropTypes.object,
  getBitCoinValue: PropTypes.func,
  getHistoricalPrice: PropTypes.func
}

export default connect(mapStateToProps, { getBitCoinValue, getHistoricalPrice })(Main);
