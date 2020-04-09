import React, { useCallback, useEffect, useMemo } from 'react';
import { connect } from 'react-redux'
import URI from 'urijs';
import dayjs from 'dayjs'
import { bindActionCreators } from 'redux';

import { h0 } from '../common/fp';
import Header from '../common/Header.jsx'
import Nav from '../common/Nav.jsx'
import List from './List.jsx'
import Bottom from './Bottom.jsx'
import useNav from '../common/useNav';

import {
  setFrom,
  setTo,
  setDepartDate,
  setHighSpeed,
  setSearchParsed,
  setTrainList,
  setTicketTypes,
  setTrainTypes,
  setDepartStations,
  setArriveStations,
  prevDate,
  nextDate,
  toggleOrderType,
  toggleHighSpeed,
  toggleOnlyTickets,
  toggleIsFiltersVisible,
} from './actions';

import './App.css';

function App(props) {
  const {
    trainList,
    from,
    to,
    departDate,
    highSpeed,
    searchParsed,
    dispatch,
    orderType,
    onlyTickets,
    isFiltersVisible,
    checkedTicketTypes,
    checkedTrainTypes,
    checkedDepartStations,
    checkedArriveStations,
    departTimeStart,
    departTimeEnd,
    arriveTimeStart,
    arriveTimeEnd,
  } = props;

  useEffect(() => {
    const queries = URI.parseQuery(window.location.search)
    const {
      from,
      to,
      date,
      highSpeed,
    } = queries;

    dispatch(setFrom(from))
    dispatch(setTo(to))
    dispatch(setDepartDate(h0(dayjs(date).valueOf())))
    dispatch(setHighSpeed(highSpeed === 'true'))
    dispatch(setSearchParsed(true))

  }, [])

  useEffect(() => {
    if (!searchParsed) {
      return;
    }

    const url = new URI('/rest/query')
      .setSearch('from', from)
      .setSearch('to', to)
      .setSearch('date', dayjs(departDate).format('YYYY-MM-DD'))
      .setSearch('highSpeed', highSpeed)
      .setSearch('orderType', orderType)
      .setSearch('onlyTickets', onlyTickets)
      .setSearch(
        'checkedTicketTypes',
        Object.keys(checkedTicketTypes).join()
      )
      .setSearch(
        'checkedTrainTypes',
        Object.keys(checkedTrainTypes).join()
      )
      .setSearch(
        'checkedDepartStations',
        Object.keys(checkedDepartStations).join()
      )
      .setSearch(
        'checkedArriveStations',
        Object.keys(checkedArriveStations).join()
      )
      .setSearch('departTimeStart', departTimeStart)
      .setSearch('departTimeEnd', departTimeEnd)
      .setSearch('arriveTimeStart', arriveTimeStart)
      .setSearch('arriveTimeEnd', arriveTimeEnd)
      .toString();

    fetch(url)
      .then(response => response.json())
      .then(result => {
        const {
          dateMap: {
            directTrainInfo: {
              trains,
              filetr: {
                ticketType,
                trainType,
                depStation,
                arrStation,
              }
            }
          }
        } = result;

        dispatch(setTrainList(trains));
        dispatch(setTicketTypes(ticketType));
        dispatch(setTrainTypes(trainType));
        dispatch(setDepartStations(depStation));
        dispatch(setArriveStations(arrStation));
      })
  }, [
    from,
    to,
    departDate,
    highSpeed,
    searchParsed,
    orderType,
    onlyTickets,
    checkedTicketTypes,
    checkedTrainTypes,
    checkedDepartStations,
    checkedArriveStations,
    departTimeStart,
    departTimeEnd,
    arriveTimeStart,
    arriveTimeEnd,
  ])

  const onBack = useCallback(() => {
    window.history.back()
  }, []);

  if (!searchParsed) {
    return null;
  }

  const {
    isPrevDisabled,
    isNextDisabled,
    prev,
    next,
  } = useNav(departDate, dispatch, prevDate, nextDate)

  const bottomCbs = useMemo(() => bingActionCreators({
    toggleOrderType,
    toggleHighSpeed,
    toggleOnlyTickets,
    toggleIsFiltersVisible,
  }, dispatch), [])

  if (!searchParsed) {
    return null;
  }

  return (
    <div className="App">
      <div className="header-wrapper">
        <Header title={`${from} → ${to}`} onBack={onBack} />
        <Nav
          date={departDate}
          isPrevDisabled={isPrevDisabled}
          isNextDisabled={isNextDisabled}
          prev={prev}
          next={next}
        />
        <List list={trainList} />
        <Bottom
          highSpeed={highSpeed}
          orderType={orderType}
          onlyTickets={onlyTickets}
          isFiltersVisible={isFiltersVisible}
          {...bottomCbs}
        />
      </div>
    </div>
  );
}

export default connect(
  function mapStateToProps(state) {
    return state
  },
  function mapDispatchtoProps(dispatch) {
    return { dispatch }
  }
)(App);
