import React from 'react';
import {connect} from 'react-redux'
import './App.css';

function App() {
  return (
    <div className="App">
    </div>
  );
}

export default connect(
  function mapStateToProps(state) {},
  function mapDispatchtoProps(dispatch) {}
)(App);
