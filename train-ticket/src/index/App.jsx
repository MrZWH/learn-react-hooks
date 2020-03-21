import React, { useCallback, useMemo } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import './App.css';

import Header from '../common/Header.jsx';
import DepartDate from './DepartDate.jsx';
import HighSpeed from './HighSpeed.jsx';
import Journey from './Journey.jsx';
import Submit from './Submit.jsx';

import CitySelector from '../common/CitySelector.jsx';

import {
  exchangeFromTo,
  showCitySelector,
  hideCitySelector,
  fetchCityData,
  setSelectedCity,
} from './actions';

function App(props) {
  const {
    from,
    to,
    dispatch,
    isCitySelectorVisible,
    isLoadingCityData,
    cityData,
  } = props;

  const onBack = useCallback(() => {
    window.history.back()
  }, [])

  // const doExchangeFromTo = useCallback(() => {
  //   dispatch(exchangeFromTo()
  // }, [])

  // const doShowCitySelector = useCallback((m) => dispatch(showCitySelector(m)), [])

  const cbs = useMemo(() => {
    return bindActionCreators({
      exchangeFromTo,
      showCitySelector
    }, dispatch)
  }, []);

  const citySelectionCbs = useMemo(() => {
    return bindActionCreators({
      onBack: hideCitySelector,
      fetchCityData,
      onSelect: setSelectedCity,
    }, dispatch)
  }, [])

  return (
    <div className="App">
      <div className="header-wrapper">
        <Header title="火车票" onBack={onBack} />
      </div>
      <from>
        <Journey from={from} to={to}
          {...cbs}
        />
        <DepartDate />
        <HighSpeed />
        <Submit />
      </from>
      <CitySelector
        show={isCitySelectorVisible}
        isLoading={isLoadingCityData}
        cityData={cityData}
        {...citySelectionCbs}
      />
    </div>
  );
}

export default connect(
  function mapStateToProps(state) {
    return state
  },
  function mapDispatchtoProps(dispatch) {
    return {dispatch}
  }
)(App);
