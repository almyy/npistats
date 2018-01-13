import React, { Component } from 'react';
import logo from './logo.svg';
import OwnerList from './components/ownerlist/OwnerList';

import style from './App.css';

class App extends Component {
  render() {
    return (
      <div className={style.app}>
        <OwnerList />
      </div>
    );
  }
}

export default App;
