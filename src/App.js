import React, { Component } from 'react';
import logo from './logo.svg';
import RootContainer from './components/rootcontainer/RootContainer';

import style from './App.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className={style.app}>
        <RootContainer />
      </div>
    )
  }
}

export default App;
