import React from 'react';
import { connect } from 'react-redux'
import Detail from '../common/Detail.jsx'
import Candidate from './Candidate.jsx'
import Schedule from './Schedule.jsx'
import './App.css';

function App(props) {
  const {
    departDate,
    arriveDate,
    departTimeStr,
    arriveTimeStr,
    departStation,
    arriveStation,
    trainNumber,
    durationStr,
    tickets,
    isScheduleVisible,
    searchParsed,
    dispatch,
  } = props;
  return (
    <div className="app">
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
