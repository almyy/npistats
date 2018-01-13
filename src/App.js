import React, { Component } from 'react';
import logo from './logo.svg';
import OwnerList from './components/ownerlist/OwnerList';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <OwnerList />
      </div>
    );
  }
}

export default App;
